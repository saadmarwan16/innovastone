'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import emailjs from '@emailjs/browser';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const ContactPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsVisible(true);
    // Initialize EmailJS with your public key
    emailjs.init("RG7wIO9vN3-TnZXGS");
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      await emailjs.send(
        "service_8r4ts8l",
        "template_6iq1tz1",
        {
          from_name: values.name,
          from_email: values.email,
          from_phone: values.phone,
          message: values.message,
          to_email: "info@innovastone.co",
          reply_to: values.email,
        }
      );

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

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-stone-gold" />,
      title: 'Visit Us',
      content: 'Sümer Mahallesi 2482/2 Sokak Sky City B Blok İş Merkezi No: 1 İç Kapı No:63, Merkezefendi, Denizli, Turkey',
      link: 'https://maps.google.com',
      linkText: 'Get Directions',
    },
    {
      icon: <Phone className="h-6 w-6 text-stone-gold" />,
      title: 'Call Us',
      content: '+90 531 762 84 48',
      link: 'tel:+905317628448',
      linkText: 'Call Now',
    },
    {
      icon: <Mail className="h-6 w-6 text-stone-gold" />,
      title: 'Email Us',
      content: 'info@innovastone.co',
      link: 'mailto:info@innovastone.co',
      linkText: 'Send Email',
    },
  ];

  const socialLinks = [
    {
      icon: <Facebook className="h-5 w-5" />,
      href: 'https://facebook.com',
      label: 'Facebook',
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      href: 'https://instagram.com',
      label: 'Instagram',
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: 'https://linkedin.com',
      label: 'LinkedIn',
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:h-[70vh] flex items-center justify-center py-20 sm:py-24 md:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-stone-charcoal/70 via-stone-charcoal/60 to-transparent" />
        </div>
        <div
          className={`relative container mx-auto px-4 text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-stone-marble mb-6 hero-text-shadow">
            Contact Us
          </h1>
          <p className="text-lg sm:text-xl text-stone-marble/90 max-w-3xl mx-auto">
            Let&apos;s discuss your vision and create something extraordinary
            together.
          </p>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 marble-pattern" />
        <div className="container relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="glass-effect rounded-xl p-8 text-center hover-lift"
              >
                <div className="mb-6 flex justify-center">
                  <div className="w-14 h-14 rounded-full bg-stone-gold/10 flex items-center justify-center">
                    {info.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-stone-charcoal mb-3">
                  {info.title}
                </h3>
                <p className="text-stone-charcoal/70 mb-4">{info.content}</p>
                <Link
                  href={info.link}
                  className="text-stone-gold hover:text-stone-gold/80 font-medium transition-colors duration-300"
                  target={info.link.startsWith('http') ? '_blank' : undefined}
                >
                  {info.linkText}
                </Link>
              </div>
            ))}
          </div>

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
                      'Send Message'
                    )}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Map Section */}
            <div className="space-y-8">
              <div className="glass-effect rounded-2xl overflow-hidden h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100940.14245968236!2d29.029873600000002!3d37.783390700000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c73fb1d3a6a187%3A0x7c29c6941d4a5ad7!2sDenizli%2C%20Turkey!5e0!3m2!1sen!2sus!4v1709004000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Social Links */}
              <div className="glass-effect rounded-2xl p-8">
                <h3 className="text-xl font-bold text-stone-charcoal mb-6">
                  Connect With Us
                </h3>
                <div className="flex items-center gap-4">
                  {socialLinks.map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      target="_blank"
                      className="w-12 h-12 rounded-full bg-stone-gold/10 flex items-center justify-center text-stone-gold hover:bg-stone-gold hover:text-white transition-all duration-300"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;