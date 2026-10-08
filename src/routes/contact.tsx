import { useRef, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Clipboard, Mail, RotateCcw } from "lucide-react";
import { z } from "zod";
import { PageIntro } from "@/components/page-intro";
import { Button } from "@/components/ui/button";
import titleShareImage from "@/assets/jbcc-title-share.jpg.asset.json";
import { getRequestOrigin } from "@/lib/origin.functions";
import { EditorialReveal } from "@/components/editorial-reveal";

export const Route = createFileRoute("/contact")({
  loader: () => getRequestOrigin(),
  head: ({ loaderData }) => ({ meta: [
    { title: "Contact the JBCC Secretariat" },
    { name: "description", content: "Reach the JBCC Secretariat at Blue Violets Plaza, Kamburu Drive, Nairobi — mail@jbcc.or.ke, +254 20 2420 806 or 582." },
    { property: "og:title", content: "Contact JBCC" },
    { property: "og:description", content: "Secretariat address, phone, email and enquiry form." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "/contact" },
    { property: "og:image", content: `${loaderData}${titleShareImage.url}` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Contact JBCC" },
    { name: "twitter:description", content: "Secretariat address, phone, email and enquiry form." },
    { name: "twitter:image", content: `${loaderData}${titleShareImage.url}` },
  ], links: [{ rel: "canonical", href: "/contact" }], scripts: [{
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org", "@type": "Organization",
      name: "Joint Building & Construction Council", alternateName: "JBCC", url: "https://jbcc.or.ke",
      email: "mail@jbcc.or.ke", telephone: ["+254202420806", "+254202420582"],
      address: { "@type": "PostalAddress", streetAddress: "Suite 605, Blue Violets Plaza, Kamburu Drive, off Ngong Road", addressLocality: "Nairobi", postalCode: "00100", addressCountry: "KE" },
    }),
  }] }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  subject: z.string().trim().min(2, "Enter a subject").max(150),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

const field = "mt-2 w-full border border-border bg-background px-4 py-3 outline-none focus:border-signal";
type FieldName = "name" | "email" | "subject" | "message";
type PreparedEnquiry = { mailto: string; name: string };

function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<{ kind: "idle" | "success" | "error"; message: string }>({ kind: "idle", message: "" });
  const [preparedEnquiry, setPreparedEnquiry] = useState<PreparedEnquiry | null>(null);
  const [copied, setCopied] = useState(false);
  const startedAt = useRef(Date.now());
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (String(data["website"] ?? "").trim() || Date.now() - startedAt.current < 1500) {
      setStatus({ kind: "error", message: "We could not prepare this enquiry. Please wait a moment and try again." });
      return;
    }
    const r = schema.safeParse(data);
    if (!r.success) {
      const nextErrors = Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), i.message]));
      setErrors(nextErrors);
      setStatus({ kind: "error", message: `Please correct ${r.error.issues.length} ${r.error.issues.length === 1 ? "field" : "fields"} before continuing.` });
      const firstName = String(r.error.issues[0]?.path[0] ?? "");
      form.querySelector<HTMLElement>(`[name="${firstName}"]`)?.focus();
      return;
    }
    setErrors({});
    const body = `${r.data.message}\n\n— ${r.data.name} (${r.data.email})`;
    const mailto = `mailto:mail@jbcc.or.ke?subject=${encodeURIComponent(r.data.subject)}&body=${encodeURIComponent(body)}`;
    try {
      setPreparedEnquiry({ mailto, name: r.data.name });
      setStatus({ kind: "success", message: "Your enquiry is prepared. Send it from your email app to complete the process." });
      window.location.assign(mailto);
    } catch {
      setStatus({ kind: "error", message: "Your email app could not be opened. Please email mail@jbcc.or.ke directly." });
    }
  };
  const resetForm = () => {
    setPreparedEnquiry(null);
    setCopied(false);
    setErrors({});
    setStatus({ kind: "idle", message: "" });
    startedAt.current = Date.now();
    window.requestAnimationFrame(() => document.querySelector<HTMLInputElement>('#name')?.focus());
  };
  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText("mail@jbcc.or.ke");
      setCopied(true);
      setStatus({ kind: "success", message: "The JBCC email address was copied. Paste it into your email app to send your enquiry." });
    } catch {
      setStatus({ kind: "error", message: "Copying was not available. Use mail@jbcc.or.ke in your email app." });
    }
  };
  const F = ({ name, label, area }: { name: FieldName; label: string; area?: boolean }) => {
    const errorId = `${name}-error`;
    const common = { id: name, name, required: true, "aria-invalid": Boolean(errors[name]), "aria-describedby": errors[name] ? errorId : undefined, className: `${field} ${errors[name] ? "border-signal" : ""}` };
    return <div><label htmlFor={name} className="block text-sm font-medium">{label} <span className="text-signal" aria-hidden="true">*</span><span className="sr-only"> (required)</span></label>{area ? <textarea {...common} rows={6} maxLength={2000} /> : <input {...common} type={name === "email" ? "email" : "text"} maxLength={name === "email" ? 255 : name === "subject" ? 150 : 100} />}{errors[name] ? <p id={errorId} className="mt-2 text-sm font-medium text-signal">{errors[name]}</p> : null}</div>;
  };
  return <main>
    <PageIntro index="05" eyebrow="Contact" title="The JBCC Secretariat." description="Enquiries about documents, price indices, seminars and Council business." />
    <section className="px-5 py-16 md:px-8 md:py-28"><div className="mx-auto grid max-w-7xl gap-12 border-t border-border pt-8 lg:grid-cols-[1fr_1.6fr] lg:gap-0">
      <EditorialReveal className="lg:pr-12"><address className="space-y-8 not-italic">
        <div><p className="technical-label text-signal">Office</p><p className="mt-3 leading-7">Suite 605, Blue Violets Plaza<br />Kamburu Drive, off Ngong Road<br />P.O. Box 44258, Nairobi 00100</p><a href="https://www.google.com/maps/search/?api=1&query=Blue+Violets+Plaza+Kamburu+Drive+Nairobi" target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-11 items-center border-b border-signal text-sm font-medium uppercase">Open map →</a></div>
        <div><p className="technical-label text-signal">Email</p><a href="mailto:mail@jbcc.or.ke" className="mt-3 flex min-h-11 items-center hover:text-signal">mail@jbcc.or.ke</a></div>
        <div><p className="technical-label text-signal">Phone</p><a href="tel:+254202420806" className="mt-3 block min-h-11 py-2 hover:text-signal">+254 20 2420 806</a><a href="tel:+254202420582" className="block min-h-11 py-2 hover:text-signal">+254 20 2420 582</a></div>
      </address></EditorialReveal>
       {preparedEnquiry ? <section className="border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-12" aria-labelledby="enquiry-ready-title">
         <div className="border-l-2 border-signal bg-muted p-5 sm:p-6" role="status" aria-live="polite" aria-atomic="true">
           <Check className="size-6 text-signal" aria-hidden="true" />
           <h2 id="enquiry-ready-title" className="mt-4 text-2xl font-semibold">Your enquiry is ready, {preparedEnquiry.name}.</h2>
           <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">Your email app should have opened with the message prepared. Review it and select Send there to complete your enquiry.</p>
         </div>
         <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
           <Button asChild className="min-h-11 rounded-none"><a href={preparedEnquiry.mailto}><Mail /> Open email again</a></Button>
           <Button type="button" variant="outline" className="min-h-11 rounded-none" onClick={copyAddress}><Clipboard /> {copied ? "Email copied" : "Copy email address"}</Button>
           <Button type="button" variant="ghost" className="min-h-11 rounded-none" onClick={resetForm}><RotateCcw /> Start another enquiry</Button>
         </div>
         <div className="mt-4" role="status" aria-live="polite" aria-atomic="true"><p className={status.kind === "error" ? "text-sm font-medium text-signal" : "text-sm text-muted-foreground"}>{status.message}</p></div>
       </section> : <form onSubmit={submit} noValidate className="grid gap-6 border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0" aria-describedby="form-guidance">
         <p id="form-guidance" className="text-sm text-muted-foreground">All fields marked with an asterisk are required.</p>
         <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
        <div className="grid gap-6 md:grid-cols-2">{F({ name: "name", label: "Name" })}{F({ name: "email", label: "Email" })}</div>
        {F({ name: "subject", label: "Subject" })}{F({ name: "message", label: "Message", area: true })}
         <div role="status" aria-live="polite" aria-atomic="true">{status.message ? <p className={`border-l-2 px-4 py-3 text-sm ${status.kind === "success" ? "border-foreground bg-muted text-foreground" : "border-signal bg-muted text-foreground"}`}>{status.message}</p> : null}</div>
         <Button type="submit" className="min-h-12 w-full justify-self-start rounded-none bg-navy px-8 text-sm uppercase text-navy-foreground hover:bg-signal sm:w-auto">Send enquiry</Button>
        <p className="text-xs text-muted-foreground">Opens your email app with the message ready to send.</p>
       </form>}
    </div></section>
  </main>;
}
