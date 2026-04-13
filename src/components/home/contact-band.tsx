import { NewsletterForm } from "@/components/layout/newsletter-form";

export function ContactBand() {
  return (
    <section id="contact" className="py-20 px-4 scroll-mt-20">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Stay in the loop</h2>
        <p className="text-muted-foreground mb-8">
          New drops, tournament updates, and athlete stories — straight to your inbox.
        </p>
        <NewsletterForm />
      </div>
    </section>
  );
}
