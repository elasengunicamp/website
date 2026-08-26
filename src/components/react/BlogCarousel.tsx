import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

export interface BlogCarouselPost {
  slug: string;
  titulo: string;
  resumo: string;
  cover: string;
  dataFormatada: string;
}

export interface BlogCarouselProps {
  posts: BlogCarouselPost[];
}

// Carrossel de posts recentes do blog — ilha React (client:visible),
// hidrata só quando a seção entra na viewport (NOTES.md: "Inserir
// carróseis com postagens do blog").
export default function BlogCarousel({ posts }: BlogCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start', dragFree: true });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  if (posts.length === 0) return null;

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 md:gap-6">
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="min-w-[260px] max-w-[260px] flex-shrink-0 overflow-hidden rounded-2xl border border-brand/10 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-brand-lilac/10 dark:bg-brand-dark-surface md:min-w-[300px] md:max-w-[300px]"
            >
              <img src={post.cover} alt="" className="h-36 w-full object-cover" loading="lazy" />
              <div className="flex flex-col gap-2 p-4">
                <span className="font-mono text-[11px] text-ink/60 dark:text-ink-dark/60">{post.dataFormatada}</span>
                <h3 className="font-heading text-base font-bold text-ink-heading dark:text-ink-dark-heading">
                  {post.titulo}
                </h3>
                <p className="line-clamp-2 font-body text-sm text-ink dark:text-ink-dark">{post.resumo}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canScrollPrev}
          aria-label="Post anterior"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand/20 font-body text-brand transition-colors hover:bg-brand-lilac disabled:opacity-30 dark:border-brand-lilac/20 dark:text-brand-lilac dark:hover:bg-brand-dark-surface"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canScrollNext}
          aria-label="Próximo post"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand/20 font-body text-brand transition-colors hover:bg-brand-lilac disabled:opacity-30 dark:border-brand-lilac/20 dark:text-brand-lilac dark:hover:bg-brand-dark-surface"
        >
          ›
        </button>
      </div>
    </div>
  );
}
