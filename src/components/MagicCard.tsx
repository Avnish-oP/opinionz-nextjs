"use client";
import React from "react";
import Image from "next/image";

import img1 from "../../public/assets/img/anonymous-posting.svg";

import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

export interface MagicCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function MagicCard({ icon, title, description }: MagicCardProps) {
  return (
    <>
      <div className="py-5 flex flex-col lg:flex-row items-center justify-center  w-full gap-4 mx-auto mx- px-2">
        <div className="border bg-purple-800 border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2]  max-w-sm w-full mx-auto p-4 relative md:h-[28rem] ">
          <Icon className="absolute h-6 w-6 -top-3 -left-3  text-white" />
          <Icon className="absolute h-6 w-6 -bottom-3 -left-3  text-white" />
          <Icon className="absolute h-6 w-6 -top-3 -right-3  text-white" />
          <Icon className="absolute h-6 w-6 -bottom-3 -right-3  text-white" />
          <AnimatePresence>
            <div className="h-full w-full absolute inset-0">
              <CanvasRevealEffect
                animationSpeed={3}
                containerClassName="bg-black"
                colors={[
                  //   [236, 72, 153],
                  //   [232, 121, 249],
                  [59, 130, 246],
                  [139, 92, 246],
                ]}
                dotSize={2}
              />
            </div>
          </AnimatePresence>
          <div className="relative py-10 z-20 items-center flex flex-col">
            <div className=" flex-col text-center md:group-hover/canvas-card:-translate-y-4 -translate-y-4 md:translate-y-12 group-hover/canvas-card:opacity- transition duration-200 w-full  mx-auto flex items-center justify-center">
              <h2 className="md:text-4xl text-3xl font-bold">{title}</h2>
              <div className=" h-[30%]">
                <Image className="md:w-32 w-20" src={icon as string} alt="{feature.title}" />
              </div>
            </div>
            <h2 className="dark:text-white text-lg md:text-xl opacity-100 md:opacity-0 group-hover/canvas-card:opacity-100 relative z-10 mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
              {description}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}



export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};



