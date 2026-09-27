import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/jbcc-logo.png.asset.json";
import { siteLinks } from "@/lib/jbcc-data";
import { SearchOverlay } from "@/components/search-overlay";

export function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setSearchOpen(true); }
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${scrolled || menuOpen ? "border-border bg-background text-foreground" : "border-navy-foreground/20 bg-navy/80 text-navy-foreground"}`}>
        <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center px-5 md:px-8 lg:flex">
          <Link to="/" className="mr-auto flex items-center gap-3" aria-label="JBCC home">
            <span className="grid h-12 w-20 place-items-center bg-background"><img src={logo.url} alt="Joint Building and Construction Council" className="h-10 w-auto" /></span>
          </Link>
          <nav className="hidden h-full items-center lg:flex" aria-label="Primary navigation">
            {siteLinks.map((item) => <Link key={item.to} to={item.to} activeOptions={{ exact: item.to === "/" }} className="flex h-full items-center border-l border-current/15 px-4 text-xs font-medium uppercase data-[status=active]:text-signal">{item.label}</Link>)}
          </nav>
          <Button variant="ghost" className="ml-2 hidden rounded-none border-l border-current/15 px-4 hover:bg-current/10 lg:flex" onClick={() => setSearchOpen(true)}><Search /> Search <kbd className="ml-2 text-[10px] opacity-60">⌘K</kbd></Button>
          <Button variant="ghost" size="icon" className="min-h-11 min-w-11 rounded-none lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation">{menuOpen ? <X /> : <Menu />}</Button>
        </div>
        {menuOpen ? <nav id="mobile-navigation" className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-border bg-background px-5 pb-6 text-foreground lg:hidden" aria-label="Mobile navigation">{siteLinks.map((item) => <Link key={item.to} to={item.to} onClick={() => setMenuOpen(false)} activeOptions={{ exact: item.to === "/" }} className="flex min-h-14 items-center border-b border-border text-sm font-medium uppercase data-[status=active]:text-signal">{item.label}</Link>)}<Button variant="outline" className="mt-5 min-h-11 w-full rounded-none" onClick={() => { setMenuOpen(false); setSearchOpen(true); }}><Search /> Search JBCC</Button></nav> : null}
      </header>
      <SearchOverlay open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}