"use client";

import { useTranslations } from "next-intl";
import { FunctionComponent } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error: FunctionComponent<ErrorProps> = ({ error, reset }) => {
  const t = useTranslations("ErrorPage");

  return (
    <div className="mx-auto flex h-screen max-w-[1280px] flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl">
        {t("title")}
      </h1>
      <p className="text-xl font-medium text-gray-500 sm:text-2xl md:text-3xl">
        {error.message}
      </p>
      <button
        className="group mt-10 flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-medium text-indigo-600 shadow-lg transition-all hover:bg-indigo-50 hover:shadow-xl"
        onClick={reset}
      >
        {t("button")}
      </button>
    </div>
  );
};

export default Error;
