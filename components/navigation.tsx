"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { BiWorld } from "react-icons/bi";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const { t, i18n } = useTranslation("common");
  const [currentLang, setCurrentLang] = useState('en'); // Track language state locally
  
  const langDropdownRef = useRef<HTMLDivElement | null>(null);

  // Debug on mount
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setCurrentLang(lng);
    };
  
    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  // Initialize from localStorage and sync with i18n on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('i18nextLng');
    // Aceite o idioma salvo diretamente (sem simplificação)
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'pt-BR')) {
      setCurrentLang(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const navItems = [
    { href: "/", label: t("navigation.home", "Home") },
    { href: "/projects", label: t("navigation.projects", "Projects") },
    { href: "/about", label: t("navigation.about", "About") },
    { href: "/blog", label: t("navigation.blog", "Blog") },
    { href: "/contact", label: t("navigation.contact", "Contact") },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        langDropdownRef.current && 
        event.target instanceof Node && 
        !langDropdownRef.current.contains(event.target)
      ) {
        setIsLangDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Separate click handlers for better debugging
  const handleEnglishClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    console.log("English button clicked");
    changeLanguage("en");
  };

  const handlePortugueseClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    console.log("Portuguese button clicked");
    changeLanguage("pt-BR");
  };

  const changeLanguage = (locale: string) => {
    console.log("Função changeLanguage chamada");
    console.log("Idioma atual:", i18n.language);
    console.log("Mudando para idioma:", locale);

    try {
      // Update local state first
      setCurrentLang(locale);
      console.log("Local state updated to:", locale);
      
      // Force language change with direct callback for debugging
      i18n.changeLanguage(locale, (err, t) => {
        if (err) {
          console.error("Error changing language:", err);
          return;
        }
        
        console.log("Idioma alterado com sucesso para:", locale);
        console.log("Novo idioma definido:", i18n.language);
        
        // Store in localStorage
        localStorage.setItem('i18nextLng', locale);
        console.log("Idioma salvo no localStorage");
        
        // Recarrega a página para aplicar traduções
        window.location.reload();
        
        // Force re-render by updating state
        setIsLangDropdownOpen(false);
        
        // Test translation
        console.log("Home translation:", t("navigation.home", "Home"));
        
        // Uncomment if needed
        // window.location.reload();
      });
    } catch (error) {
      console.error("Erro ao mudar idioma:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-xl ml-4 md:ml-6 lg:ml-8">
          MRC | Full Stack
        </Link>

        {/* Debug Info - remove in production */}
        <div className="fixed bottom-0 left-0 bg-black/70 text-white p-2 text-xs z-50">
          Current: {currentLang} | i18n: {i18n.language}
        </div>

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
          <div className="relative" ref={langDropdownRef}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                console.log("Language dropdown toggle clicked");
                setIsLangDropdownOpen(!isLangDropdownOpen);
              }}
              title="Change Language"
              className="flex items-center justify-center"
            >
              <BiWorld className="h-5 w-5" />
              <span className="ml-1 text-xs">
                {currentLang === 'pt-BR' ? '🇧🇷' : '🇺🇸'}
              </span>
            </Button>
            
            {isLangDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-32 bg-background rounded-md shadow-lg border border-border z-50">
                <div className="py-1">
                  <button
                    onClick={handleEnglishClick}
                    className={cn(
                      "flex items-center w-full px-4 py-2 text-sm text-left hover:bg-accent",
                      currentLang === "en" ? "bg-accent/50" : ""
                    )}
                  >
                    <span className="mr-2 font-bold">🇺🇸</span>
                    <span>English</span>
                  </button>
                  <button
                    onClick={handlePortugueseClick}
                    className={cn(
                      "flex items-center w-full px-4 py-2 text-sm text-left hover:bg-accent",
                      currentLang === "pt-BR" ? "bg-accent/50" : ""
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
          <div className="relative" ref={langDropdownRef}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                console.log("Mobile language dropdown toggle clicked");
                setIsLangDropdownOpen(!isLangDropdownOpen);
              }}
              title="Change Language"
            >
              <BiWorld className="h-5 w-5" />
              <span className="ml-1 text-xs">
                {currentLang === 'pt-BR' ? '🇧🇷' : '🇺🇸'}
              </span>
            </Button>
            
            {isLangDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-32 bg-background rounded-md shadow-lg border border-border z-50">
                <div className="py-1">
                  <button
                    onClick={handleEnglishClick}
                    className={cn(
                      "flex items-center w-full px-4 py-2 text-sm text-left hover:bg-accent",
                      currentLang === "en" ? "bg-accent/50" : ""
                    )}
                  >
                    <span className="mr-2 font-bold">🇺🇸</span>
                    <span>English</span>
                  </button>
                  <button
                    onClick={handlePortugueseClick}
                    className={cn(
                      "flex items-center w-full px-4 py-2 text-sm text-left hover:bg-accent",
                      currentLang === "pt-BR" ? "bg-accent/50" : ""
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
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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