import Link from "next/link";
import { loadAllAthletes } from "@/lib/content/athletes";
import { AthleteCard } from "@/components/athlete/athlete-card";

export async function TeamPreview() {
  const all = await loadAllAthletes();
  const athletes = all.filter((a) => a.tier === "athlete").slice(0, 4);
  if (athletes.length === 0) return null;
  return (
    <section className="py-14 md:py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">The team</h2>
          <Link href="/athletes" className="text-sm underline underline-offset-4">
            Meet everyone
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {athletes.map((a) => (
            <AthleteCard key={a.slug} athlete={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
