"use client";

import Error from "next/error";
import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto flex h-screen max-w-[1280px] flex-col items-center justify-center gap-4">
          <Error statusCode={404} />
          <Link
            href="/"
            className="group mt-10 flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-medium text-indigo-600 shadow-lg transition-all hover:bg-indigo-50 hover:shadow-xl"
          >
            Go Home
          </Link>
        </div>
      </body>
    </html>
  );
}
