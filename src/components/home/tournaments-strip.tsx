import { loadUpcomingTournaments } from "@/lib/content/tournaments";

export async function TournamentsStrip() {
  const all = await loadUpcomingTournaments();
  const tournaments = all.slice(0, 3);
  if (tournaments.length === 0) return null;
  return (
    <section id="tournaments" className="py-14 md:py-20 px-4 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Upcoming tournaments</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tournaments.map((t) => (
            <div key={t.slug} className="border rounded-xl md:rounded-2xl p-6 bg-card">
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                {new Date(t.date).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <h3 className="text-xl font-bold mb-1">{t.name}</h3>
              <p className="text-sm text-muted-foreground mb-1">{t.location}</p>
              {t.format && (
                <p className="text-sm text-muted-foreground mb-4">{t.format}</p>
              )}
              {t.registrationUrl && (
                <a
                  href={t.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm underline underline-offset-4"
                >
                  Register
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
