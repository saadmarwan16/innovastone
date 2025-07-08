import { FunctionComponent } from "react";
import { TCollectionsPageCta } from "../lib/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface CTAProps {
  data: TCollectionsPageCta;
}

const CTA: FunctionComponent<CTAProps> = ({ data }) => {
  const t = useTranslations("CollectionsPage.cta");
  return (
    <div className="mt-24 relative">
      <div className="absolute inset-0 bg-stone-charcoal rounded-2xl overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070"
          alt="Luxury Stone Design"
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
      </div>
      <div className="relative glass-effect rounded-2xl p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-stone-charcoal mb-4">
          {data.title}
        </h2>
        <p className="text-stone-charcoal/70 mb-8 max-w-2xl mx-auto">
          {data.description}
        </p>
        <Button
          size="lg"
          className="bg-stone-gold hover:bg-stone-gold/90 text-white transition-all duration-500 hover:scale-105"
          asChild
        >
          <Link href="/consultation">
            {t("requestConsultation")}
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CTA;
