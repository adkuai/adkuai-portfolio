"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { portfolio } from "~/portfolio.config";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandMenu } from "@/components/command-menu";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
}

export function TopNavbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>("about");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Automatically determine enabled sections based on portfolio config
  const navItems: NavItem[] = useMemo(() => {
    return [
      { name: "About", href: "#about" },
      { name: "Experience", href: "#experience" },
      { name: "Projects", href: "#projects" },
      { name: "Hackathons", href: "#hackathons" },
      { name: "DSA / CP", href: "#dsa" },
      { name: "Skills", href: "#skills" },
      { name: "Education", href: "#education" },
      ...(portfolio.sections.blog ? [{ name: "Blog", href: "#blogs" }] : []),
      ...(portfolio.sections.anime ? [{ name: "Anime & Music", href: "#anime" }] : []),
      { name: "Highlights", href: "#highlights" },
      ...(portfolio.sections.guestbook ? [{ name: "Guestbook", href: "#guestbook" }] : []),
      { name: "Contact", href: "#contact" },
    ];
  }, []);

  // Track active section and scroll state
  useEffect(() => {
    if (pathname !== "/") return;

    const ids = navItems.map((item) => item.href.slice(1));

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 10);

      // Top of page
      if (scrollY < 160 && ids.includes("about")) {
        setActiveSection("about");
        return;
      }

      // Bottom of page: activate last section (Contact)
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 70
      ) {
        setActiveSection(ids[ids.length - 1]);
        return;
      }

      let currentSection = "about";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          // Offset for navbar height + trigger threshold
          if (top <= 150) {
            currentSection = id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [navItems, pathname]);

  // Handle smooth scrolling
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);

    if (pathname !== "/") {
      window.location.href = `/${href}`;
      return;
    }

    const id = href.slice(1);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 76; // height of fixed navbar + buffer
      const targetPosition =
        element.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: "smooth",
      });
      setActiveSection(id);
      window.history.pushState(null, "", href);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 w-full transition-[background-color,border-color,box-shadow] duration-200",
        "border-b border-black/10 dark:border-white/10",
        isScrolled
          ? "bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-sm shadow-black/5 dark:shadow-black/70"
          : "bg-white/85 dark:bg-black/85 backdrop-blur-md"
      )}
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-4">
        {/* Brand / Name & Mini Avatar */}
        <a
          href="#about"
          onClick={(e) => scrollTo(e, "#about")}
          className="flex items-center gap-2.5 shrink-0 group focus:outline-none"
        >
          <div className="relative size-7 sm:size-8 rounded-full overflow-hidden border border-black/20 dark:border-white/20 bg-zinc-100 dark:bg-zinc-800 transition-transform group-hover:scale-105">
            <Image
              src="/social2.jpg"
              alt={portfolio.name}
              width={64}
              height={64}
              priority
              className="size-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[13px] sm:text-[14px] text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
              {portfolio.name}
            </span>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono tracking-wider uppercase leading-none hidden sm:inline">
              Portfolio
            </span>
          </div>
        </a>

        {/* Desktop & Tablet Navigation Links */}
        <nav
          className="hidden lg:flex items-center gap-1 xl:gap-2.5"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => scrollTo(e, item.href)}
                className={cn(
                  "relative py-1.5 px-2 xl:px-2.5 text-[12px] xl:text-[13px] font-medium tracking-tight transition-colors duration-150 inline-flex flex-col items-center",
                  isActive
                    ? "text-black dark:text-white font-bold"
                    : "text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                )}
              >
                <span className="relative">
                  {item.name}
                  {isActive && (
                    <span className="absolute -bottom-1 inset-x-0 h-[2px] bg-black dark:bg-white rounded-full transition-all duration-200" />
                  )}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Right Actions: CommandMenu, ThemeToggle, Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <CommandMenu />
          <ThemeToggle className="dark:text-zinc-400 hover:dark:text-zinc-200" />

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex lg:hidden size-8 items-center justify-center rounded-md border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="lg:hidden w-full border-t border-black/10 dark:border-white/10 bg-white/95 dark:bg-black/95 backdrop-blur-xl px-4 py-3 shadow-lg transition-all animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-[65vh] overflow-y-auto p-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollTo(e, item.href)}
                  className={cn(
                    "flex items-center justify-between min-h-[38px] px-3 py-1.5 rounded-md text-[12px] font-medium transition-colors border",
                    isActive
                      ? "bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white font-bold border-black/20 dark:border-white/20"
                      : "bg-zinc-50 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 border-black/5 dark:border-white/5 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  )}
                >
                  <span className={cn(isActive && "underline decoration-black dark:decoration-white decoration-2 underline-offset-4")}>
                    {item.name}
                  </span>
                  {isActive && (
                    <span className="size-1.5 rounded-full bg-black dark:bg-white" />
                  )}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

export default TopNavbar;
