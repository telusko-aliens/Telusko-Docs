"use client"

import Link from 'next/link';
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
   return (
    <section className="relative font-DM-Sans dark:text-white overflow-hidden min-h-[80vh] flex items-center justify-center">
      <motion.div
      className="max-w-6xl mx-auto px-6 py-20 text-center relative z-10 flex flex-col gap-4 items-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Title */}
      <motion.h1
        className="text-[3.875rem] font-bold text-green-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <span className="font-UX font-[700] text-[#051A1E] dark:text-[#F4F4F4]">Telusko</span> <span 
        className="font-Playfair font-medium max-[418px]:block max-[418px]:-mt-7"><i>Docs</i></span>
      </motion.h1>

      <motion.p
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#2C2D2D] dark:text-[#EFEFEF] text-center max-w-3xl px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Friendly documentation for tech stacks - from backend frameworks to frontend libraries, AI, cloud platforms, and beyond.
        </motion.p>



      <Link href="/docs" className="w-fit">
        <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
          whileHover="hover"
          
          className="cursor-pointer flex gap-2 justify-center items-center w-fit py-4 px-8 
                     dark:bg-white dark:text-black bg-[#051A1E] text-[#FAFFFC] rounded-2xl"
        >
          Get Started
          <motion.span
            variants={{
              hover: { x: [0, 4, 0], y: [0, -4, 0] }, 
            }}
            transition={{
              repeat: Infinity,
              duration: 0.6,
              ease: "easeInOut",
            }}
          >
            <ArrowUpRight size={20} />
          </motion.span>
        </motion.button>
      </Link>

    </motion.div>

      

    </section>
  );
}