import { cn } from "@/lib/utils";

const NOISE_FILTER_DATA_URI =
  "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E";

export const ImageCard = ({
  src,
  alt = "Memory",
  caption,
  className,
}: ImageCardData) => {
  return (
    <div
      className={cn(
        "group max-w-[400px] rounded-sm bg-white p-4 shadow-lg transition-all duration-500",
        "hover:-translate-y-1 hover:scale-[1.02] hover:rotate-1 hover:shadow-2xl",
        "border border-neutral-200",
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden rounded bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={src}
          alt={alt}
          className="size-full object-cover contrast-[1.08] saturate-[0.92] sepia-[0.12] transition-transform duration-700 group-hover:scale-105"
        />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `url("${NOISE_FILTER_DATA_URI}")`,
          }}
        />

        <div className="bg-gradient-radial pointer-events-none absolute inset-0 from-transparent to-black/5" />
      </div>

      <p className="font-beanie my-4 text-center text-2xl leading-none font-semibold text-neutral-600 transition-colors group-hover:text-neutral-800">
        {caption}
      </p>

      <div className="pointer-events-none absolute inset-0 rounded-sm border border-white/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
};
