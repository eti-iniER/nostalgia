import { AnimatePresence, motion } from "motion/react";
import { Outlet, useLocation } from "react-router";

export const RootLayout = () => {
  const location = useLocation();

  return (
    <main className="bg-background text-foreground flex min-h-screen flex-col p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          className="flex flex-1 flex-col"
          initial={{
            opacity: 0,
            filter: "blur(8px)",
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
          }}
          exit={{
            opacity: 0,
            filter: "blur(8px)",
            scale: 0.98,
          }}
          transition={{
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </main>
  );
};
