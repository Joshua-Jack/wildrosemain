// src/components/athlete/athlete-gallery.tsx
import Image from 'next/image';
import type { Athlete } from '@/lib/content/types';

export function AthleteGallery({ athlete }: { athlete: Athlete }) {
  const gallery = athlete.gallery ?? [];
  if (gallery.length === 0) return null;

  return (
    <section className="container px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Gallery</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {gallery.map((img, i) => (
          <div key={i} className="aspect-square overflow-hidden rounded-lg bg-muted">
            <Image
              src={img.src}
              alt={img.alt}
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
