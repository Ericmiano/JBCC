import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { PageIntro } from "@/components/page-intro";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact the JBCC Secretariat" },
    { name: "description", content: "Reach the JBCC Secretariat at Blue Violets Plaza, Kamburu Drive, Nairobi — mail@jbcc.or.ke, +254 20 2420 806." },
    { property: "og:title", content: "Contact JBCC" },
    { property: "og:description", content: "Secretariat address, phone, email and enquiry form." },
  ] }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  subject: z.string().trim().min(2, "Enter a subject").max(150),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

const field = "mt-2 w-full border border-border bg-background px-4 py-3 outline-none focus:border-signal";

function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const r = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!r.success) { setErrors(Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), i.message]))); return; }
    setErrors({});
    const body = `${r.data.message}\n\n— ${r.data.name} (${r.data.email})`;
    window.location.href = `mailto:mail@jbcc.or.ke?subject=${encodeURIComponent(r.data.subject)}&body=${encodeURIComponent(body)}`;
  };
  const F = ({ name, label, area }: { name: string; label: string; area?: boolean }) => <label className="block text-sm font-medium">{label}{area ? <textarea name={name} rows={6} className={field} /> : <input name={name} type={name === "email" ? "email" : "text"} className={field} />}{errors[name] ? <span className="mt-1 block text-xs text-signal">{errors[name]}</span> : null}</label>;
  return <main>
    <PageIntro index="05" eyebrow="Contact" title="The JBCC Secretariat." description="Enquiries about documents, price indices, seminars and Council business." />
    <section className="px-5 py-20 md:px-8 md:py-28"><div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.4fr]">
      <address className="space-y-8 not-italic">
        <div><p className="technical-label text-signal">Office</p><p className="mt-3 leading-7">Suite 605, Blue Violets Plaza<br />Kamburu Drive, off Ngong Road<br />P.O. Box 44258, Nairobi 00100</p><a href="https://www.google.com/maps/search/?api=1&query=Blue+Violets+Plaza+Kamburu+Drive+Nairobi" target="_blank" rel="noreferrer" className="mt-3 inline-block border-b border-signal text-sm font-medium uppercase">Open map →</a></div>
        <div><p className="technical-label text-signal">Email</p><a href="mailto:mail@jbcc.or.ke" className="mt-3 block hover:text-signal">mail@jbcc.or.ke</a></div>
        <div><p className="technical-label text-signal">Phone</p><a href="tel:+254202420806" className="mt-3 block hover:text-signal">+254 20 2420 806</a></div>
      </address>
      <form onSubmit={submit} noValidate className="grid gap-6 border-t border-border pt-8">
        <div className="grid gap-6 md:grid-cols-2">{F({ name: "name", label: "Name" })}{F({ name: "email", label: "Email" })}</div>
        {F({ name: "subject", label: "Subject" })}{F({ name: "message", label: "Message", area: true })}
        <button type="submit" className="justify-self-start bg-navy px-8 py-4 text-sm font-medium uppercase text-navy-foreground hover:bg-signal">Send enquiry</button>
        <p className="text-xs text-muted-foreground">Opens your email app with the message ready to send.</p>
      </form>
    </div></section>
  </main>;
}
