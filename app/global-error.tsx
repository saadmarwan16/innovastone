"use client";

import { useTranslations } from "next-intl";
import { FunctionComponent } from "react";
import NextError from "next/error";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const GlobalError: FunctionComponent<ErrorProps> = ({ error, reset }) => {
  const t = useTranslations("ErrorPage");

  return (
    <html lang="en">
      <body>
        <div className="mx-auto flex h-screen max-w-[1280px] flex-col items-center justify-center gap-4">
          <NextError statusCode={500} />
          <button
            className="group mt-10 flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-medium text-indigo-600 shadow-lg transition-all hover:bg-indigo-50 hover:shadow-xl"
            onClick={reset}
          >
            {error.message}
          </button>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
