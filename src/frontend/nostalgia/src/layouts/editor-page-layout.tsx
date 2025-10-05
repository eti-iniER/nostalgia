import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

interface EditorPageLayoutProps {
  children: ReactNode;
  frameKey: string | number;
  className?: string;
  blurAmount?: number;
  transitionDuration?: number;
  onTransitionComplete?: () => void;
}

export const EditorPageLayout = ({
  children,
  frameKey,
  className = "",
  blurAmount = 8,
  transitionDuration = 0.4,
  onTransitionComplete,
}: EditorPageLayoutProps) => {
  return (
    <AnimatePresence mode="wait" onExitComplete={onTransitionComplete}>
      <motion.div
        key={frameKey}
        className={className}
        initial={{
          opacity: 0,
          filter: `blur(${blurAmount}px)`,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
        }}
        exit={{
          opacity: 0,
          filter: `blur(${blurAmount}px)`,
          scale: 0.98,
        }}
        transition={{
          duration: transitionDuration,
          ease: [0.4, 0, 0.2, 1], // Custom easing for smooth motion
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
