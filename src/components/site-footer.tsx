import { Link } from "@tanstack/react-router";
import { officeHours, siteLinks, socialLinks } from "@/lib/jbcc-data";
import { legalLinks } from "@/lib/legal";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 md:grid-cols-[1.3fr_1fr_1fr] md:gap-0 md:px-0 md:py-24">
        <div className="md:px-8"><div className="inline-grid bg-background p-3"><img src="/media/jbcc-logo.png" alt="JBCC" width="200" height="100" loading="lazy" decoding="async" className="h-14 w-auto" /></div><p className="mt-8 max-w-sm text-2xl font-medium leading-tight">Contracts, price indices and guidance for Kenya’s building industry.</p><p className="technical-label mt-10 text-signal">Established 1980</p></div>
        <div className="md:px-8"><p className="technical-label text-navy-muted">Institution</p><nav className="mt-4 grid grid-cols-2 gap-x-5 sm:mt-6 sm:grid-cols-1">{siteLinks.map((item) => <Link key={item.to} to={item.to} className="flex min-h-11 items-center border-b border-navy-foreground/10 text-sm text-navy-muted hover:text-signal">{item.label}</Link>)}</nav></div>
        <div className="md:px-8"><p className="technical-label text-navy-muted">Secretariat</p><address className="mt-6 space-y-3 text-sm not-italic leading-6 text-navy-muted"><p>Suite 605, Blue Violets Plaza<br />Kamburu Drive, off Ngong Road<br />P.O. Box 44258, Nairobi 00100</p><a href="mailto:mail@jbcc.co.ke" className="flex min-h-11 items-center hover:text-signal">mail@jbcc.co.ke</a><a href="tel:+254202420806" className="flex min-h-11 items-center hover:text-signal">+254 20 2420 806</a><a href="tel:+254202420582" className="flex min-h-11 items-center hover:text-signal">+254 20 2420 582</a><p>{officeHours}</p></address><ul className="mt-6 flex flex-wrap gap-x-5" aria-label="JBCC on social media">{socialLinks.map((item) => <li key={item.label}><a href={item.url} target="_blank" rel="noreferrer" className="flex min-h-11 items-center text-sm text-navy-muted hover:text-signal">{item.label}<span className="sr-only"> (opens in a new tab)</span></a></li>)}</ul></div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-navy-foreground/15 px-5 py-6 text-xs leading-5 text-navy-muted md:flex-row md:items-center md:justify-between md:px-8"><p>© {new Date().getFullYear()} Joint Building & Construction Council</p><nav aria-label="Site policies"><ul className="flex flex-wrap gap-x-5">{legalLinks.map((item) => <li key={item.to}><Link to={item.to} className="flex min-h-11 items-center hover:text-signal">{item.label}</Link></li>)}</ul></nav></div>
    </footer>
  );
}
