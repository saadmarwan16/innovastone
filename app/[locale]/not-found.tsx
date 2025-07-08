import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { FunctionComponent } from "react";

const NotFound: FunctionComponent = async () => {
  const t = await getTranslations("NotFoundPage");

  return (
    <html lang="en">
      <body>
        <div className="mx-auto flex h-screen max-w-[1280] flex-col items-center justify-center gap-4">
          <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl">
            {t("notFound")}
          </h2>
          <p className="text-xl font-medium text-gray-500 sm:text-2xl md:text-3xl">
            {t("noResource")}
          </p>
          <Link
            href="/"
            className="group mt-10 flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-medium text-indigo-600 shadow-lg transition-all hover:bg-indigo-50 hover:shadow-xl"
          >
            {t("home")}
          </Link>
        </div>
      </body>
    </html>
  );
};

export default NotFound;
