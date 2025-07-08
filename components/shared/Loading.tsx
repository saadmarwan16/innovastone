import { FunctionComponent } from "react";
import { Loader2 } from "lucide-react";
import { getTranslations } from "next-intl/server";

const Loading: FunctionComponent = async () => {
  const t = await getTranslations("Shared");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white flex-col gap-6">
      <Loader2 className="w-24 h-24 text-stone-gold animate-spin" />
      <p className="text-base font-medium text-gray-500 sm:text-lg md:text-xl mt-12">
        {t("loading.message")}
      </p>
      <div className="flex justify-center">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-stone-gold rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-stone-gold rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-stone-gold rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
