import { Link } from "@tanstack/react-router";
import logo from "@/assets/jbcc-logo.png.asset.json";
import { siteLinks } from "@/lib/jbcc-data";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 md:grid-cols-[1.3fr_1fr_1fr] md:gap-12 md:px-8 md:py-24">
        <div><div className="inline-grid bg-background p-3"><img src={logo.url} alt="JBCC" className="h-14 w-auto" /></div><p className="mt-8 max-w-sm text-2xl font-medium leading-tight">The framework behind better construction.</p></div>
        <div><p className="technical-label text-navy-muted">Institution</p><nav className="mt-4 grid grid-cols-2 gap-x-5 sm:mt-6 sm:grid-cols-1">{siteLinks.map((item) => <Link key={item.to} to={item.to} className="flex min-h-11 items-center text-sm text-navy-muted hover:text-signal">{item.label}</Link>)}</nav></div>
        <div><p className="technical-label text-navy-muted">Secretariat</p><address className="mt-6 space-y-3 text-sm not-italic leading-6 text-navy-muted"><p>Suite 605, Blue Violets Plaza<br />Kamburu Drive, off Ngong Road<br />P.O. Box 44258, Nairobi 00100</p><a href="mailto:mail@jbcc.or.ke" className="flex min-h-11 items-center hover:text-signal">mail@jbcc.or.ke</a><a href="tel:+254202420806" className="flex min-h-11 items-center hover:text-signal">+254 20 2420 806</a><a href="tel:+254202420582" className="flex min-h-11 items-center hover:text-signal">+254 20 2420 582</a></address></div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-navy-foreground/15 px-5 py-6 text-[11px] leading-5 uppercase text-navy-muted md:flex-row md:justify-between md:px-8"><p>© {new Date().getFullYear()} Joint Building & Construction Council</p><p>Professional standards for Kenya’s built environment</p></div>
    </footer>
  );
}