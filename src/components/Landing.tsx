"use client";
import React from "react";
import MagicButton from "./Magicbutton";

import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

export default function Home() {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(true)}
      className="h-screen  flex flex-col lg:flex-row overflow-hidden items-center justify-center bg-black w-full gap-4 mx-auto px-8 relativ"
    >
      <div className="lg:text-7xl md:text-6xl text-4xl justify-center flex flex-col  font-medium text-center text-white relative z-20 lg:w-[80%] w-full mx-auto">
        <h2>Share your opinions anonymously</h2>

        <div className="whyus text-2xl md:text-5xl mt-3 md:mt-8">
          {/* <h2>Why Choose opinionZ.com?</h2> */}
          <p className="text-lg md:text-2xl ">
            Express yourself freely while staying anonymous. Join our community
            today!
          </p>
        </div>

        <div className=" m-auto flex flex-col md:flex-row items-center mt-4 md:mt-10 lg:w-[55%] md:w-[65%] w-[80%] text-lg justify-between  md:justify-end ">
          <input
            type="email"
            className="w-full rounded-full h-12 bg-violet-500/15 px-5"
            placeholder="Enter your email"
          />
          <div className=" md:absolute m-4  flex md:justify-center md:mr-1">
            <MagicButton name="Get started" />
          </div>
          <div className="mb-4 md:hidden">or</div>
          <div className=" md:hidden">
            <MagicButton name="Sign in" />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {
          // hovered &&
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full absolute inset-0"
          >
            <CanvasRevealEffect
              animationSpeed={5}
              containerClassName="bg-transparent"
              colors={[
                [59, 130, 246],
                [139, 92, 246],
              ]}
              opacities={[0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 1]}
              dotSize={2}
            />
          </motion.div>
        }
      </AnimatePresence>
      {/* Radial gradient for the cute fade */}
      <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
    </div>
  );
}
