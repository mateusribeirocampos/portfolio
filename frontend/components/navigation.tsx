"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { BiWorld } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { DecoderGlyphLetter } from "@/components/decoderLetter/DecoderGlyphLetter";
import { glyphsM, glyphsR, glyphsC } from "@/components/decoderLetter/glyphs";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation('common');

  // Language dropdown states
  const [isDesktopLangDropdownOpen, setIsDesktopLangDropdownOpen] = useState(false);
  const [isMobileLangDropdownOpen, setIsMobileLangDropdownOpen] = useState(false);

  const langDesktopDropdownRef = useRef<HTMLDivElement | null>(null);
  const langMobileDropdownRef = useRef<HTMLDivElement | null>(null);

  const currentLocale = i18n.language || 'en';

  const navItems = [
    { href: '/', label: t("navigation.home") },
    { href: '/projects', label: t("navigation.projects") },
    { href: '/about', label: t("navigation.about") },
    { href: '/blog', label: t("navigation.blog") },
    { href: '/contact', label: t("navigation.contact") },
  ];

  // Handle clicks outside dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        langDesktopDropdownRef.current &&
        event.target instanceof Node &&
        !langDesktopDropdownRef.current.contains(event.target)
      ) {
        setIsDesktopLangDropdownOpen(false);
      }
      if (
        langMobileDropdownRef.current &&
        event.target instanceof Node &&
        !langMobileDropdownRef.current.contains(event.target)
      ) {
        setIsMobileLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle language change via cookie (no URL change needed)
  const handleLanguageChange = (locale: string, isMobile: boolean) => {
    if (isMobile) {
      setIsMobileLangDropdownOpen(false);
    } else {
      setIsDesktopLangDropdownOpen(false);
    }

    // Set the cookie to persist the language selection
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`;

    // Change the language immediately in i18next
    i18n.changeLanguage(locale);

    // Refresh the page to apply the new locale
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-xl ml-4 md:ml-6 lg:ml-8">
          <DecoderGlyphLetter glyphs={glyphsM} className="decoder-m-glyph" />
          <DecoderGlyphLetter glyphs={glyphsR} className="decoder-m-glyph" />
          <DecoderGlyphLetter glyphs={glyphsC} className="decoder-m-glyph" />
          | Full Stack
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              {item.label}
            </Link>
          ))}

          {/* Language dropdown for desktop */}
          <div className="relative" ref={langDesktopDropdownRef}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                console.log("Desktop language dropdown toggle clicked"); 
                setIsDesktopLangDropdownOpen(!isDesktopLangDropdownOpen);
              }}
              title="Change Language"
              className="flex items-center justify-center"
            >
              <BiWorld className="h-5 w-5" />
              <span className="ml-1 text-xs">
                {currentLocale === "pt-BR" ? "🇧🇷" : "🇺🇸"}
              </span>
            </Button>

            {isDesktopLangDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-32 bg-background rounded-md shadow-lg border border-border z-50">
                <div className="py-1">
                  <button
                    onClick={() => handleLanguageChange('en', false)}
                    className={cn(
                      "flex items-center w-full px-4 py-2 text-sm text-left hover:bg-accent",
                      currentLocale === "en" ? "bg-accent/50" : ""
                    )}
                  >
                    <span className="mr-2 font-bold">🇺🇸</span>
                    <span>English</span>
                  </button>
                  <button
                    onClick={() => handleLanguageChange('pt-BR', false)}
                    className={cn(
                      "flex items-center w-full px-4 py-2 text-sm text-left hover:bg-accent",
                      currentLocale === "pt-BR" ? "bg-accent/50" : ""
                    )}
                  >
                    <span className="mr-2 font-bold">🇧🇷</span>
                    <span>Português</span>
                  </button>
                </div>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          {/* Language dropdown for mobile */}
          <div className="relative" ref={langMobileDropdownRef}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                console.log("Mobile language dropdown toggle clicked");
                setIsMobileLangDropdownOpen(!isMobileLangDropdownOpen);
              }}
              title="Change Language"
            >
              <BiWorld className="h-5 w-5" />
              <span className="ml-1 text-xs">
                {currentLocale === 'pt-BR' ? '🇧🇷' : '🇺🇸'}
              </span>
            </Button>

            {isMobileLangDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-32 bg-background rounded-md shadow-lg border border-border z-50">
                <div className="py-1">
                  <button
                    onClick={() => handleLanguageChange('en', true)}
                    className={cn(
                      "flex items-center w-full px-4 py-2 text-sm text-left hover:bg-accent",
                      currentLocale === "en" ? "bg-accent/50" : ""
                    )}
                  >
                    <span className="mr-2 font-bold">🇺🇸</span>
                    <span>English</span>
                  </button>
                  <button
                    onClick={() => handleLanguageChange('pt-BR', true)}
                    className={cn(
                      "flex items-center w-full px-4 py-2 text-sm text-left hover:bg-accent",
                      currentLocale === "pt-BR" ? "bg-accent/50" : ""
                    )}
                  >
                    <span className="mr-2 font-bold">🇧🇷</span>
                    <span>Português</span>
                  </button>
                </div>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="mr-2"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  pathname === item.href
                    ? "bg-primary/10 text-foreground"
                    : "text-foreground/60 hover:bg-primary/10"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}