"use client";

import { Button } from "@/components/ui/button";
import { PitchAILogo } from "@/components/pitch-ai-logo";
import Link from "next/link";
import { motion } from "framer-motion";
import { Brain, Lightbulb, History } from "lucide-react";
import { useState, useEffect } from "react";

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-50">
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 px-4 py-6 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50"
            : "bg-transparent border-transparent"
        }`}
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto flex items-center justify-between">
          <PitchAILogo className="text-2xl" />
          <nav className="space-x-4">
            <Link
              href="/login"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Sign In
            </Link>
            <Button asChild>
              <Link href="/login">Get Started</Link>
            </Button>
          </nav>
        </div>
      </motion.header>

      <section className="relative flex-1 flex items-center justify-center py-20 md:py-32 overflow-hidden pt-20">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 dark:from-primary dark:to-purple-400"
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Craft Your Perfect Pitch with AI
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-700 dark:text-gray-300"
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            PitchAI empowers entrepreneurs and innovators to generate
            compelling, AI-powered pitches tailored to any audience and tone.
          </motion.p>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button size="lg" asChild>
              <Link href="/login">Start Generating Pitches</Link>
            </Button>
          </motion.div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 1.5,
              delay: 0.8,
              type: "spring",
              stiffness: 50,
            }}
          />
          <motion.div
            className="absolute w-72 h-72 bg-purple-500/10 rounded-full blur-3xl opacity-50"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 1.5,
              delay: 1,
              type: "spring",
              stiffness: 50,
            }}
            style={{ top: "20%", left: "10%" }}
          />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            transition={{ duration: 0.8 }}
          >
            Key Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="flex flex-col items-center p-6 rounded-lg shadow-lg bg-gray-50 dark:bg-gray-800"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Brain className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                AI-Powered Generation
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Leverage advanced AI to create unique and persuasive pitches in
                seconds.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center p-6 rounded-lg shadow-lg bg-gray-50 dark:bg-gray-800"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Lightbulb className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Customizable Tones</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Select from various tones like professional, investor-focused,
                or technical.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center p-6 rounded-lg shadow-lg bg-gray-50 dark:bg-gray-800"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <History className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Pitch History & Management
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Easily access, review, and manage all your previously generated
                pitches.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            transition={{ duration: 0.8 }}
          >
            What Our Users Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 text-left"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-lg italic mb-4 text-gray-700 dark:text-gray-300">
                &quot;PitchAI transformed how I approach investor meetings. The
                pitches are concise, impactful, and always hit the right
                tone!&quot;
              </p>
              <div className="font-semibold text-primary">
                - Jane Doe, Startup Founder
              </div>
            </motion.div>
            <motion.div
              className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 text-left"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-lg italic mb-4 text-gray-700 dark:text-gray-300">
                &quot;As a product manager, I need to articulate complex ideas
                simply. PitchAI helps me do that effortlessly.&quot;
              </p>
              <div className="font-semibold text-primary">
                - John Smith, Product Manager
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-purple-600 dark:from-primary dark:to-purple-400 text-white text-center">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            transition={{ duration: 0.8 }}
          >
            Ready to Elevate Your Pitch?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-90"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join thousands of successful innovators who trust PitchAI to make
            their ideas shine.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button size="lg" variant="secondary" asChild>
              <Link href="/login">Sign Up for Free</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 bg-gray-900 dark:bg-gray-950 text-gray-400 text-center text-sm">
        <div className="container mx-auto px-4">
          <PitchAILogo className="justify-center mb-4 text-gray-300" />
          <p>&copy; 2025 PitchAI. All rights reserved.</p>
          <nav className="mt-4 space-x-4">
            <Link href="#" className="hover:text-gray-200 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-gray-200 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-gray-200 transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
