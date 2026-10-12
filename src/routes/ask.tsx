import { useEffect, useRef, useState, type FormEvent, type ReactNode, type RefObject } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { z } from "zod";
import { PageIntro } from "@/components/page-intro";
import { Button } from "@/components/ui/button";
import { getRequestOrigin } from "@/lib/origin.functions";
import { askJbcc } from "@/lib/ask/ask.functions";
import { QUESTION_MAX_LENGTH, type AskResult, type AskSource } from "@/lib/ask/answer";

const searchSchema = z.object({ q: z.string().max(QUESTION_MAX_LENGTH).optional().catch(undefined) });

export const Route = createFileRoute("/ask")({
  validateSearch: searchSchema,
  loader: () => getRequestOrigin(),
  head: ({ loaderData }) => ({
    meta: [
      { title: "Ask JBCC — Questions About Documents, Seminars and the Council" },
      { name: "description", content: "Ask a question about JBCC’s published documents, price indices, seminars and Council, and get an answer with links to the source pages." },
      { property: "og:title", content: "Ask JBCC" },
      { property: "og:description", content: "Answers about JBCC’s documents, seminars and Council, with links to the source material." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${loaderData}/ask` },
      { property: "og:image", content: `${loaderData}/media/jbcc-hero-group.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Ask JBCC" },
      { name: "twitter:description", content: "Answers about JBCC’s documents, seminars and Council, with links to the source material." },
      { name: "twitter:image", content: `${loaderData}/media/jbcc-hero-group.jpg` },
    ],
    links: [{ rel: "canonical", href: `${loaderData}/ask` }],
  }),
  component: AskPage,
});

const suggestions = [
  "What is the newest price index?",
  "Which bodies sit on the Council?",
  "How do I register for a seminar?",
  "What are Advisory Notes?",
] as const;

type Exchange = { question: string; result: AskResult };

function AskPage() {
  const { q } = Route.useSearch();
  const [question, setQuestion] = useState(q ?? "");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [exchange, setExchange] = useState<Exchange | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const answerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => { if (q) inputRef.current?.focus(); }, [q]);
  useEffect(() => { if (exchange) answerRef.current?.focus(); }, [exchange]);

  const ask = async (value: string) => {
    const trimmed = value.trim();
    if (trimmed.length < 3) {
      setError("Type a question of at least 3 characters.");
      inputRef.current?.focus();
      return;
    }
    setError("");
    setPending(true);
    try {
      const result = await askJbcc({ data: { question: trimmed } });
      setExchange({ question: trimmed, result });
    } catch {
      setExchange({ question: trimmed, result: { status: "error", message: "Something went wrong while answering. You can email the Secretariat at mail@jbcc.co.ke.", related: [] } });
    } finally {
      setPending(false);
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); void ask(question); };

  return <main>
    <PageIntro
      eyebrow="Ask JBCC"
      title="Ask about JBCC’s published work."
      description="Ask about documents, price indices, seminars, Advisory Notes or the Council. Answers come only from this website and link to the pages they use."
      image={{ src: "/media/jbcc-hero-group.jpg", alt: "JBCC members and industry stakeholders gathered for a group photograph", width: 1920, height: 900 }}
      recordLabel="Answers from"
      recordValue="This website"
      recordNote="AI-written answers can be wrong. Check the linked sources or contact the Secretariat."
    />
    <section className="px-5 py-14 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
        <div>
          <form onSubmit={submit} noValidate aria-describedby="ask-guidance">
            <label htmlFor="ask-question" className="block text-lg font-semibold">Your question</label>
            <p id="ask-guidance" className="mt-1 text-sm text-muted-foreground">Up to {QUESTION_MAX_LENGTH} characters. Please don’t include personal or confidential details.</p>
            <textarea
              ref={inputRef}
              id="ask-question"
              name="question"
              value={question}
              onChange={(event) => { setQuestion(event.target.value); if (error) setError(""); }}
              onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }}
              rows={4}
              maxLength={QUESTION_MAX_LENGTH}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "ask-error ask-guidance" : "ask-guidance"}
              className={`mt-3 w-full border bg-background px-4 py-3 text-base outline-none focus:border-signal ${error ? "border-signal" : "border-border"}`}
            />
            <div className="mt-1 flex justify-between gap-4 text-xs text-muted-foreground"><span id="ask-error" className="font-medium text-signal">{error}</span><span aria-hidden="true">{question.length}/{QUESTION_MAX_LENGTH}</span></div>
            <Button type="submit" disabled={pending} className="mt-5 min-h-12 rounded-none bg-navy px-8 text-sm uppercase text-navy-foreground hover:bg-signal">
              {pending ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Sparkles aria-hidden="true" />} {pending ? "Answering" : "Ask"}
            </Button>
          </form>
          <div className="mt-10 border-t border-border pt-5">
            <p className="text-sm font-semibold">Try asking</p>
            <ul className="mt-2">
              {suggestions.map((item) => <li key={item}><button type="button" disabled={pending} onClick={() => { setQuestion(item); void ask(item); }} className="flex min-h-11 w-full items-center justify-between gap-3 border-b border-border text-left text-sm hover:text-signal disabled:opacity-60">{item}<ArrowRight className="size-4 shrink-0" aria-hidden="true" /></button></li>)}
            </ul>
          </div>
        </div>

        <div aria-live="polite" aria-busy={pending} className="min-w-0">
          {pending ? <p className="border-l-2 border-signal bg-muted px-5 py-4 text-sm">Searching JBCC’s published content…</p> : null}
          {!pending && exchange ? <AnswerView exchange={exchange} headingRef={answerRef} /> : null}
          {!pending && !exchange ? <p className="border-t border-border pt-5 text-sm leading-6 text-muted-foreground">Your answer will appear here, with numbered links to the pages and documents it draws on.</p> : null}
        </div>
      </div>
    </section>
  </main>;
}

function SourceLink({ source, children, className }: { source: AskSource; children: ReactNode; className?: string }) {
  const isFile = source.url.startsWith("/documents/");
  return isFile
    ? <a href={source.url} target="_blank" rel="noreferrer" className={className}>{children}<span className="sr-only"> (PDF, opens in a new tab)</span></a>
    : <a href={source.url} className={className}>{children}</a>;
}

function AnswerView({ exchange, headingRef }: { exchange: Exchange; headingRef: RefObject<HTMLHeadingElement | null> }) {
  const { question, result } = exchange;
  return <article aria-labelledby="ask-answer-title" className="border-t border-border pt-5">
    <p className="text-sm text-muted-foreground">You asked: <span className="text-foreground">{question}</span></p>
    <h2 id="ask-answer-title" ref={headingRef} tabIndex={-1} className="mt-4 text-2xl font-semibold outline-none">{result.status === "answered" ? "Answer" : "We couldn’t answer that here"}</h2>
    {result.status === "answered" ? <>
      <div className="mt-4 text-base leading-7 sm:text-lg sm:leading-8">
        {result.segments.map((segment, i) => <span key={i} className="whitespace-pre-line">{segment.text}{segment.sources.map((n) => {
          const source = result.sources[n];
          return source ? <SourceLink key={n} source={source} className="ml-0.5 inline-flex min-h-6 min-w-6 items-center justify-center align-super text-xs font-semibold text-[#c4161c] underline underline-offset-2 hover:text-foreground"><span aria-hidden="true">[{n + 1}]</span><span className="sr-only">Source {n + 1}: {source.title}</span></SourceLink> : null;
        })}</span>)}
      </div>
      {result.sources.length ? <section aria-labelledby="ask-sources-title" className="mt-8 border-t border-border pt-5">
        <h3 id="ask-sources-title" className="text-sm font-semibold">Sources on this website</h3>
        <ol className="mt-3 space-y-1">
          {result.sources.map((source, n) => <li key={`${source.url}-${source.title}`}><SourceLink source={source} className="grid min-h-11 grid-cols-[2rem_minmax(0,1fr)] items-center gap-2 border-b border-border py-2 text-sm hover:text-signal"><span className="font-semibold text-[#c4161c]">{n + 1}</span><span><span className="block font-medium">{source.title}</span><span className="block text-xs text-muted-foreground">{source.kind}</span></span></SourceLink></li>)}
        </ol>
      </section> : null}
      <p className="mt-6 text-xs leading-5 text-muted-foreground">This answer was written by AI from this website’s published content and may contain mistakes. Many documents are historical. Confirm anything you rely on with the <Link to="/contact" className="underline underline-offset-4">Secretariat</Link>.</p>
    </> : <>
      <p className="mt-4 border-l-2 border-signal bg-muted px-5 py-4 text-sm leading-6">{result.message}</p>
      {result.related.length ? <section aria-labelledby="ask-related-title" className="mt-6">
        <h3 id="ask-related-title" className="text-sm font-semibold">Related pages</h3>
        <ul className="mt-2">
          {result.related.map((source) => <li key={`${source.url}-${source.title}`}><SourceLink source={source} className="flex min-h-11 items-center justify-between gap-3 border-b border-border text-sm hover:text-signal"><span>{source.title}</span><span className="text-xs text-muted-foreground">{source.kind}</span></SourceLink></li>)}
        </ul>
      </section> : null}
    </>}
  </article>;
}
