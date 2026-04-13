import { Button } from "@/components/ui/button";

export function CustomGearCTA() {
  const agencyUrl = process.env.NEXT_PUBLIC_AGENCY_SITE_URL ?? "#";
  return (
    <section className="py-20 px-4 bg-foreground text-background">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Need custom gear for your team?
        </h2>
        <p className="text-lg opacity-80 mb-8">
          We build for clubs, teams, and brands. Wild Rose Athletics is the agency behind this collective.
        </p>
        <Button asChild size="lg" variant="secondary">
          <a href={agencyUrl} target="_blank" rel="noopener noreferrer">
            Start a project
          </a>
        </Button>
      </div>
    </section>
  );
}
