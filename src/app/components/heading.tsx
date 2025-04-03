"use client";
import { motion } from "framer-motion";

export default function Heading() {
  return (
    <motion.h1
      className="text-[3.125rem] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#C7C7C7] to-[#6A6A6A] bg-[length:200%_200%]"
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{ duration: 3, ease: "linear", repeat: Infinity }}
    >
      Verkefni 3
    </motion.h1>
  );
}
