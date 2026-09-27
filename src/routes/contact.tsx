import { useRef, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { PageIntro } from "@/components/page-intro";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact the JBCC Secretariat" },
    { name: "description", content: "Reach the JBCC Secretariat at Blue Violets Plaza, Kamburu Drive, Nairobi — mail@jbcc.or.ke, +254 20 2420 806." },
    { property: "og:title", content: "Contact JBCC" },
    { property: "og:description", content: "Secretariat address, phone, email and enquiry form." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "/contact" },
    { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/contact" }], scripts: [{
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org", "@type": "Organization",
      name: "Joint Building & Construction Council", alternateName: "JBCC", url: "https://jbcc.or.ke",
      email: "mail@jbcc.or.ke", telephone: "+254202420806",
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

function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<{ kind: "idle" | "success" | "error"; message: string }>({ kind: "idle", message: "" });
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
    try {
      setStatus({ kind: "success", message: "Your email app is opening with the enquiry ready to send." });
      window.location.assign(`mailto:mail@jbcc.or.ke?subject=${encodeURIComponent(r.data.subject)}&body=${encodeURIComponent(body)}`);
    } catch {
      setStatus({ kind: "error", message: "Your email app could not be opened. Please email mail@jbcc.or.ke directly." });
    }
  };
  const F = ({ name, label, area }: { name: FieldName; label: string; area?: boolean }) => {
    const errorId = `${name}-error`;
    const common = { id: name, name, required: true, "aria-invalid": Boolean(errors[name]), "aria-describedby": errors[name] ? errorId : undefined, className: `${field} ${errors[name] ? "border-signal" : ""}` };
    return <div><label htmlFor={name} className="block text-sm font-medium">{label} <span className="text-signal" aria-hidden="true">*</span><span className="sr-only"> (required)</span></label>{area ? <textarea {...common} rows={6} maxLength={2000} /> : <input {...common} type={name === "email" ? "email" : "text"} maxLength={name === "email" ? 255 : name === "subject" ? 150 : 100} />}{errors[name] ? <p id={errorId} className="mt-2 text-sm font-medium text-signal">{errors[name]}</p> : null}</div>;
  };
  return <main>
    <PageIntro index="05" eyebrow="Contact" title="The JBCC Secretariat." description="Enquiries about documents, price indices, seminars and Council business." />
    <section className="px-5 py-16 md:px-8 md:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
      <address className="space-y-8 not-italic">
        <div><p className="technical-label text-signal">Office</p><p className="mt-3 leading-7">Suite 605, Blue Violets Plaza<br />Kamburu Drive, off Ngong Road<br />P.O. Box 44258, Nairobi 00100</p><a href="https://www.google.com/maps/search/?api=1&query=Blue+Violets+Plaza+Kamburu+Drive+Nairobi" target="_blank" rel="noreferrer" className="mt-3 inline-block border-b border-signal text-sm font-medium uppercase">Open map →</a></div>
        <div><p className="technical-label text-signal">Email</p><a href="mailto:mail@jbcc.or.ke" className="mt-3 block hover:text-signal">mail@jbcc.or.ke</a></div>
        <div><p className="technical-label text-signal">Phone</p><a href="tel:+254202420806" className="mt-3 block hover:text-signal">+254 20 2420 806</a></div>
      </address>
       <form onSubmit={submit} noValidate className="grid gap-6 border-t border-border pt-8" aria-describedby="form-guidance">
         <p id="form-guidance" className="text-sm text-muted-foreground">All fields marked with an asterisk are required.</p>
         <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
        <div className="grid gap-6 md:grid-cols-2">{F({ name: "name", label: "Name" })}{F({ name: "email", label: "Email" })}</div>
        {F({ name: "subject", label: "Subject" })}{F({ name: "message", label: "Message", area: true })}
         <div role="status" aria-live="polite" aria-atomic="true">{status.message ? <p className={`border-l-2 px-4 py-3 text-sm ${status.kind === "success" ? "border-foreground bg-muted text-foreground" : "border-signal bg-muted text-foreground"}`}>{status.message}</p> : null}</div>
         <Button type="submit" className="min-h-12 w-full justify-self-start rounded-none bg-navy px-8 text-sm uppercase text-navy-foreground hover:bg-signal sm:w-auto">Send enquiry</Button>
        <p className="text-xs text-muted-foreground">Opens your email app with the message ready to send.</p>
      </form>
    </div></section>
  </main>;
}
