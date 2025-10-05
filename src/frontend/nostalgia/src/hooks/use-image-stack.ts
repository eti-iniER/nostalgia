import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";

interface UseImageStackOptions {
  hoverDelay?: number;
}
export const useImageStack = ({
  hoverDelay = 50,
}: UseImageStackOptions = {}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const debouncedHoveredIndex = useDebounce(hoveredIndex, hoverDelay);

  const isHovered = (index: number) => debouncedHoveredIndex === index;

  const isOtherHovered = (index: number) =>
    debouncedHoveredIndex !== null && debouncedHoveredIndex !== index;

  const handleHoverStart = (index: number) => {
    setHoveredIndex(index);
  };

  const handleHoverEnd = () => {
    setHoveredIndex(null);
  };

  return {
    hoveredIndex: debouncedHoveredIndex,
    isHovered,
    isOtherHovered,
    handleHoverStart,
    handleHoverEnd,
  };
};
