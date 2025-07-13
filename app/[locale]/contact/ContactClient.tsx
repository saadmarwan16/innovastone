"use client";

import { useState, useEffect, FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast";
import Hero from "./components/Hero";
import ContactInfo from "./components/ContactInfo";
import Connect from "./components/Connect";
import { TContactPageData } from "./lib/types";
import { useTranslations } from "next-intl";

interface ContactClientProps {
  data: TContactPageData;
}

const ContactClient: FunctionComponent<ContactClientProps> = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const t = useTranslations("ContactPage.form");

  const formSchema = z.object({
    name: z.string().min(2, t("validation.nameMinLength")),
    email: z.string().email(t("validation.invalidEmail")),
    phone: z.string().min(10, t("validation.phoneMinLength")),
    message: z.string().min(10, t("validation.messageMinLength")),
  });

  useEffect(() => {
    setIsVisible(true);
    // Initialize EmailJS with your public key
    emailjs.init("op7FPgLH2r6wp6yO3");
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      await emailjs.send("service_kcxjupq", "template_itumg78", {
        from_name: values.name,
        from_email: values.email,
        from_phone: values.phone,
        message: values.message,
        to_email: "info@innovastone.co",
        reply_to: values.email,
      });

      toast({
        title: t("success.title"),
        description: t("success.description"),
      });

      form.reset();
    } catch (error) {
      toast({
        title: t("error.title"),
        description: t("error.description"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen">
      <Hero isVisible={isVisible} data={data.hero} />

      {/* Contact Information Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 marble-pattern" />
        <div className="container relative">
          <ContactInfo data={data.contact} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="decorative-frame glass-effect rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-stone-charcoal mb-6">
                {t("title")}
              </h2>
              <div className="elegant-divider w-1/3 mb-8" />

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("fullName.label")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("fullName.placeholder")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("email.label")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("email.placeholder")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("phone.label")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("phone.placeholder")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("message.label")}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t("message.placeholder")}
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-stone-gold hover:bg-stone-gold/90 text-white transition-all duration-500 hover:-translate-y-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t("sending")}
                      </>
                    ) : (
                      t("sendMessage")
                    )}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Map Section */}
            <div className="space-y-8">
              <div className="glass-effect rounded-2xl overflow-hidden h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.9566108044137!2d29.089987699999995!3d37.7910566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c73fc9183db849%3A0x6bdc6fa55fdc72b0!2zU0tZQ0lUWSBCIEJMT0sgxLDFniBNRVJLRVrEsCBERU7EsFpMxLA!5e0!3m2!1sen!2str!4v1744492542576!5m2!1sen!2str"
                  // src={data.iframe_link}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <Connect data={data.connect} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactClient;
