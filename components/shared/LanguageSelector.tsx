"use client";

import { useState, useRef, useEffect, FunctionComponent, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Locale } from "next-intl";

interface Language {
  code: Locale;
  name: string;
  flag: string;
}

interface LanguageSelectorProps {
  locale: Locale;
}

const languages: { [key: string]: Language } = {
  en: { code: "en", name: "English", flag: "🇺🇸" },
  fr: { code: "fr", name: "Français", flag: "🇫🇷" },
  tr: { code: "tr", name: "Türkçe", flag: "🇹🇷" },
};

export const LanguageSelector: FunctionComponent<LanguageSelectorProps> = ({
  locale,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLang = useMemo(() => languages[locale], [locale]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 px-3 py-1.5 transition-all hover:from-indigo-100 hover:to-purple-100"
      >
        <span className="text-base">{selectedLang.flag}</span>
        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-lg font-medium text-transparent">
          {selectedLang.code.toUpperCase()}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-indigo-600 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-200 ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        {Object.keys(languages).map((key) => {
          const language = languages[key];

          return (
            <Link
              key={key}
              href="/"
              locale={language.code}
              className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-gray-50 ${
                selectedLang.code === language.code ? "bg-indigo-50" : ""
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span
                className={`font-medium ${
                  selectedLang.code === language.code
                    ? "text-indigo-600"
                    : "text-gray-700"
                }`}
              >
                {language.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
