"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Building2,
  MapPin,
  CheckCircle2,
  TrendingUp,
  Users,
  Zap,
  Star,
  Award,
  Home,
  DollarSign,
  Shield,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { motion, easeOut } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

const slideInVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: easeOut,
    },
  },
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

const cardHoverVariants = {
  rest: { y: 0 },
  hover: { y: -10, transition: { duration: 0.3 } },
};

export default function HomePage() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#001f5c] to-transparent z-10 opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000')] bg-cover bg-center" />
        <div className="container relative z-20 text-white px-4">
          <motion.div className="max-w-2xl space-y-6" initial="hidden" animate="visible" variants={containerVariants}>
            <motion.h1 className="text-5xl md:text-6xl font-bold leading-tight" variants={slideInVariants}>
              আপনার স্বপ্নের ঠিকানা, <br />
              <span className="text-[#e63946]">সাশ্রয়ী মূল্যে</span> আমাদের সাথে
            </motion.h1>
            <motion.p className="text-xl text-blue-50 opacity-90" variants={itemVariants}>
              মাতুয়াইল, ঢাকা কেন্দ্রিক আধুনিক এবং মানসম্মত ফ্ল্যাট ও শেয়ার প্রজেক্ট নিয়ে আমরা আছি আপনার পাশে।
            </motion.p>
            <motion.div className="flex flex-wrap gap-4 pt-4" variants={containerVariants}>
              <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/projects">
                  <Button size="lg" className="bg-[#e63946] hover:bg-[#d62828] text-white gap-2">
                    প্রজেক্ট দেখুন <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur hover:bg-white/20 border-white/30 text-white">
                    বুকিং করুন
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="container px-4">
        <motion.div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
          <motion.div className="space-y-4" variants={itemVariants}>
            <h2 className="text-3xl font-bold" style={{ color: "#001f5c" }}>আমাদের প্রজেক্টসমূহ</h2>
            <p className="text-muted-foreground max-w-xl">
              আধুনিক স্থাপত্য ও উন্নত জীবনযাত্রার নিশ্চয়তায় আমাদের চলমান কিছু উল্লেখযোগ্য প্রজেক্ট।
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link href="/projects">
              <Button variant="ghost" className="gap-2 group" style={{ color: "#001f5c" }}>
                সব প্রজেক্ট দেখুন <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div className="grid md:grid-cols-3 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
          {[
            { title: "Golden Tower", location: "মাতুয়াইল, ঢাকা", status: "চলমান" },
            { title: "Golden View Tower", location: "মাতুয়াইল, ঢাকা", status: "চলমান" },
            { title: "Golden Plaza", location: "মাতুয়াইল, ঢাকা", status: "আসন্ন" },
          ].map((project, i) => (
            <motion.div key={i} variants={itemVariants} initial="rest" whileHover="hover" className="group border rounded-2xl overflow-hidden hover:shadow-xl transition-shadow bg-card">
              <motion.div className="h-48 bg-muted relative overflow-hidden" variants={cardHoverVariants}>
                <div className="absolute top-4 right-4 text-white text-xs font-bold px-3 py-1 rounded-full z-10" style={{ backgroundColor: "#e63946" }}>
                  {project.status}
                </div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590725121839-892b458a74ec?q=80&w=800')] bg-cover bg-center transition-transform group-hover:scale-110 duration-500" />
              </motion.div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold group-hover:transition-colors" style={{ color: "#001f5c" }}>
                  {project.title}
                </h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" /> {project.location}
                </div>
                <div className="pt-2">
                  <Button className="w-full text-white" style={{ backgroundColor: "#001f5c" }}>
                    বিস্তারিত দেখুন
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Investment Benefits Section */}
      <section className="py-20" style={{ backgroundColor: "#f8f4f0" }}>
        <div className="container px-4">
          <motion.div className="text-center space-y-4 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
            <motion.h2 className="text-3xl font-bold" style={{ color: "#001f5c" }} variants={itemVariants}>
              বিনিয়োগের সুবিধা
            </motion.h2>
            <motion.p className="text-muted-foreground" variants={itemVariants}>
              আপনার ভবিষ্যৎ সুরক্ষিত করুন আমাদের সাথে
            </motion.p>
          </motion.div>
          <motion.div className="grid md:grid-cols-4 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
            {[
              { icon: TrendingUp, title: "মূল্য বৃদ্ধি", desc: "সময়ের সাথে সম্পত্তির মূল্য ক্রমাগত বৃদ্ধি পায়।" },
              { icon: DollarSign, title: "আয়ের উৎস", desc: "ভাড়া থেকে নিয়মিত আয় পান।" },
              { icon: Shield, title: "আইনি সুরক্ষা", desc: "সম্পূর্ণ আইনি কাগজপত্র ও নথি সংরক্ষিত।" },
              { icon: Clock, title: "দীর্ঘমেয়াদী লাভ", desc: "বছরের পর বছর স্থিতিশীল রিটার্ন।" },
            ].map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div key={i} variants={itemVariants} whileHover={{ y: -5 }} className="text-center space-y-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <motion.div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: "#e63946" }} animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                    <Icon className="h-6 w-6" />
                  </motion.div>
                  <h4 className="font-bold" style={{ color: "#001f5c" }}>
                    {benefit.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="container px-4">
        <motion.div className="text-center space-y-4 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
          <motion.h2 className="text-3xl font-bold" style={{ color: "#001f5c" }} variants={itemVariants}>
            কেন আমাদেরকে বেছে নেবেন?
          </motion.h2>
          <motion.p className="text-muted-foreground" variants={itemVariants}>
            বিশ্বস্ততা এবং গ্রাহক সন্তুষ্টিই আমাদের মূল লক্ষ্য।
          </motion.p>
        </motion.div>
        <motion.div className="grid md:grid-cols-4 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
          {[
            { title: "নিরাপদ বিনিয়োগ", desc: "আপনার পরিশ্রমের টাকা আমাদের কাছে নিরাপদ।" },
            { title: "আধুনিক ডিজাইন", desc: "অভিজ্ঞ স্থপতি দ্বারা নিখুঁত ডিজাইন।" },
            { title: "সময়মতো হস্থান্তর", desc: "আমরা প্রতিশ্রুতি রক্ষার ব্যাপারে বদ্ধপরিকর।" },
            { title: "দক্ষ ব্যবস্হাপনা", desc: "অভিজ্ঞ প্রজেক্ট ম্যানেজার দ্বারা পরিচালিত।" },
          ].map((feature, i) => (
            <motion.div key={i} variants={scaleInVariants} whileHover={{ y: -8 }} className="text-center space-y-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border-t-4" style={{ borderColor: "#e63946" }}>
              <motion.div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: "#001f5c" }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <CheckCircle2 className="h-6 w-6" />
              </motion.div>
              <h4 className="font-bold" style={{ color: "#001f5c" }}>
                {feature.title}
              </h4>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="py-20" style={{ backgroundColor: "#001f5c" }}>
        <div className="container px-4">
          <motion.div className="text-center space-y-4 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
            <motion.h2 className="text-3xl font-bold text-white" variants={itemVariants}>
              কীভাবে কাজ করে?
            </motion.h2>
            <motion.p className="text-blue-100" variants={itemVariants}>
              সহজ ৪টি ধাপে আপনার স্বপ্ন বাস্তবায়নের যাত্রা শুরু করুন।
            </motion.p>
          </motion.div>
          <motion.div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "১", title: "প্রজেক্ট নির্বাচন", desc: "আমাদের প্রজেক্ট থেকে আপনার পছন্দের ইউনিট খুঁজে নিন।" },
              { step: "২", title: "বুকিং প্রক্রিয়া", desc: "সহজ ডকুমেন্টেশন ও সাশ্রয়ী বুকিং এমাউন্ট।" },
              { step: "৩", title: "কিস্তি পরিকল্পনা", desc: "নমনীয় পেমেন্ট প্ল্যান আপনার সুবিধা অনুযায়ী।" },
              { step: "৪", title: "হ্যান্ডওভার", desc: "গুণমান নিশ্চিত করে সময়মতো ডেলিভারি।" },
            ].map((item, i) => (
              <motion.div key={i} variants={itemVariants} className="relative">
                <motion.div className="bg-white rounded-2xl p-6 text-center space-y-4" whileHover={{ y: -5 }}>
                  <motion.div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl" style={{ backgroundColor: "#e63946" }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    {item.step}
                  </motion.div>
                  <h4 className="font-bold text-lg" style={{ color: "#001f5c" }}>
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
                {i < 3 && (
                  <motion.div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5" style={{ backgroundColor: "#e63946" }} animate={{ scaleX: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container px-4">
        <motion.div className="text-center space-y-4 mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
          <motion.h2 className="text-3xl font-bold" style={{ color: "#001f5c" }} variants={itemVariants}>
            সন্তুষ্ট গ্রাহকদের মতামত
          </motion.h2>
          <motion.p className="text-muted-foreground" variants={itemVariants}>
            হাজারো সন্তুষ্ট ক্রেতারা আমাদের বিশ্বাস করেন
          </motion.p>
        </motion.div>
        <motion.div className="grid md:grid-cols-3 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
          {[
            {
              name: "করিম সাহেব",
              title: "ব্যবসায়ী",
              feedback: "Golden Mark Properties এর সাথে আমার বিনিয়োগ অত্যন্ত সফল হয়েছে। তারা সব সময় আমাকে সঠিক পরামর্শ দিয়েছে।",
              rating: 5,
            },
            {
              name: "ফাতিমা বেগম",
              title: "গৃহিণী",
              feedback: "অত্যন্ত সুন্দর এবং আধুনিক ফ্ল্যাট পেয়েছি। টিমের সেবা ছিল অসাধারণ এবং সময়মতো ডেলিভারি পেয়েছি।",
              rating: 5,
            },
            {
              name: "রহিম আহমেদ",
              title: "ইঞ্জিনিয়ার",
              feedback: "স্বচ্ছতা এবং পেশাদারিত্বের জন্য এই কোম্পানি সত্যিই প্রশংসার যোগ্য। আমি সবাইকে সুপারিশ করি।",
              rating: 5,
            },
          ].map((testimonial, i) => (
            <motion.div key={i} variants={itemVariants} whileHover={{ y: -5 }} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border-l-4" style={{ borderColor: "#e63946" }}>
              <motion.div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <motion.div key={j} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: j * 0.1 }}>
                    <Star className="h-5 w-5 fill-[#e63946]" style={{ color: "#e63946" }} />
                  </motion.div>
                ))}
              </motion.div>
              <motion.p className="text-muted-foreground mb-6 italic" variants={itemVariants}>
                "{testimonial.feedback}"
              </motion.p>
              <div>
                <h4 className="font-bold" style={{ color: "#001f5c" }}>
                  {testimonial.name}
                </h4>
                <p className="text-sm text-muted-foreground">{testimonial.title}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 rounded-3xl mx-4" style={{ backgroundColor: "#e63946" }}>
        <div className="container px-4">
          <motion.div className="text-center space-y-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
            <motion.h2 className="text-3xl md:text-4xl font-bold text-white" variants={slideInVariants}>
              আপনার স্বপ্ন বাস্তবায়নের সময় এসেছে
            </motion.h2>
            <motion.p className="text-white/90 max-w-2xl mx-auto text-lg" variants={itemVariants}>
              আজই যোগাযোগ করুন এবং আমাদের বিশেষজ্ঞ টিমের সাথে আপনার প্রকল্প সম্পর্কে আলোচনা করুন।
            </motion.p>
            <motion.div className="flex flex-wrap justify-center gap-4 pt-4" variants={containerVariants}>
              <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/contact">
                  <Button size="lg" className="bg-white text-[#e63946] hover:bg-gray-100 gap-2 font-semibold">
                    এখনই যোগাযোগ করুন <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/projects">
                  <Button size="lg" variant="outline" className="border-blue-950 bg-blue-950 text-white hover:bg-white/20 hover:border-white gap-2">
                    আমাদের প্রজেক্ট দেখুন
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
