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

interface ContactClientProps {
  data: TContactPageData;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const ContactClient: FunctionComponent<ContactClientProps> = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
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
                Send Us a Message
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
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} />
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
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 000-0000" {...field} />
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
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your project..."
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
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Map Section */}
            <div className="space-y-8">
              <div className="glass-effect rounded-2xl overflow-hidden h-[400px]">
                <iframe
                  src={data.iframe_link}
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
