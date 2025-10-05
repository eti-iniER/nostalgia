import { useImageStack } from "@/hooks/use-image-stack";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const NOISE_FILTER_DATA_URI =
  "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E";

interface ImageCardStackProps {
  images: FrameImage[];
  maxImages?: number;
  spreadDistance?: number; // Multiplier for card spread (1 = default, 2 = twice as spread out, etc.)
}

// Define spread-out positions and rotations for a tasteful arrangement
const cardLayouts = [
  { x: -40, y: -20, rotate: -8, zIndex: 1 },
  { x: 30, y: -30, rotate: 5, zIndex: 2 },
  { x: -20, y: 40, rotate: -3, zIndex: 3 },
  { x: 50, y: 20, rotate: 7, zIndex: 4 },
  { x: 0, y: -10, rotate: 2, zIndex: 5 },
  { x: -50, y: 30, rotate: -6, zIndex: 6 },
  { x: 40, y: 50, rotate: 4, zIndex: 7 },
  { x: -30, y: -40, rotate: -5, zIndex: 8 },
];

export const ImageCardStack = ({
  images,
  maxImages = 5,
  spreadDistance = 1,
}: ImageCardStackProps) => {
  const { isHovered, isOtherHovered, handleHoverStart, handleHoverEnd } =
    useImageStack({
      hoverDelay: 50,
    });

  // Select a subset of images to display
  const displayImages = images.slice(0, Math.min(images.length, maxImages));

  return (
    <div className="relative flex min-h-[600px] items-center justify-center p-20">
      {displayImages.map((image, index) => {
        const layout = cardLayouts[index % cardLayouts.length];
        const hovered = isHovered(index);
        const otherHovered = isOtherHovered(index);

        // Apply spread distance multiplier to x and y positions
        const spreadX = layout.x * spreadDistance;
        const spreadY = layout.y * spreadDistance;

        return (
          <motion.div
            key={`${image.image}-${index}`}
            className="absolute"
            initial={{
              x: spreadX,
              y: spreadY,
              rotate: layout.rotate,
              scale: 1,
            }}
            animate={{
              x: spreadX,
              y: spreadY,
              rotate: hovered ? layout.rotate * 0.7 : layout.rotate,
              scale: hovered ? 1.05 : otherHovered ? 0.98 : 1,
              opacity: otherHovered ? 0.7 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 30,
              mass: 0.8,
            }}
            whileHover={{
              transition: { duration: 0.3 },
            }}
            onHoverStart={() => handleHoverStart(index)}
            onHoverEnd={handleHoverEnd}
            style={{
              zIndex: hovered ? 100 : layout.zIndex,
            }}
          >
            <div
              className={cn(
                "group max-w-[320px] rounded-sm bg-white p-4 shadow-lg transition-shadow duration-300",
                "border border-neutral-200",
                hovered && "shadow-2xl",
              )}
            >
              <div className="relative aspect-square w-[280px] overflow-hidden rounded bg-gradient-to-br from-gray-50 to-gray-100">
                <motion.img
                  src={image.image}
                  alt={image.altText || "Memory"}
                  className="size-full object-cover contrast-[1.08] saturate-[0.92] sepia-[0.12]"
                  animate={{
                    scale: hovered ? 1.05 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                    mass: 0.5,
                  }}
                />

                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
                  style={{
                    backgroundImage: `url("${NOISE_FILTER_DATA_URI}")`,
                  }}
                />

                <div className="bg-gradient-radial pointer-events-none absolute inset-0 from-transparent to-black/5" />
              </div>

              <motion.p
                className="font-beanie my-4 text-center text-2xl leading-none font-semibold text-neutral-600"
                animate={{
                  color: hovered ? "rgb(23, 23, 23)" : "rgb(82, 82, 82)",
                }}
                transition={{ duration: 0.4 }}
              >
                {image.caption}
              </motion.p>

              <motion.div
                className="pointer-events-none absolute inset-0 rounded-sm border border-white/40"
                animate={{
                  opacity: hovered ? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
