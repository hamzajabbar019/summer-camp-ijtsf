/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import EntryPass from "./EntryPass";
import {
  Calendar,
  MapPin,
  Clock,
  BookOpen,
  Gamepad2,
  Heart,
  Phone,
  Mail,
  Menu,
  X,
  Star,
  Users,
  ShieldCheck,
  Zap,
  ArrowRight,
  Facebook,
  Instagram,
  Twitter,
  Sparkles,
  Rocket,
  Mountain,
  Sun,
  Trees,
  Tent,
  ChevronUp
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- Types ---
interface Activity {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface ActivityCategory {
  category: string;
  items: Activity[];
  accentColor: string;
}

interface ScheduleDay {
  day: string;
  date: string;
  venue: string;
  time: string;
  details: string;
  color: string;
}

// --- Data ---
const SCHEDULE: ScheduleDay[] = [
  {
    day: "Day 1",
    date: "June 20th, 2026",
    venue: "Rose Garden & Fahad Lawn",
    time: "8:00 AM - 3:00 PM",
    details: "Sunnah Sports, Skill Workshops, and Interactive Sessions.",
    color: "bg-sky-400"
  },
  {
    day: "Day 2",
    date: "June 21st, 2026",
    venue: "Farm House",
    time: "8:00 AM - 4:00 PM",
    details: "Grand Finale, Farm House Day, and Award Ceremony.",
    color: "bg-orange-500"
  }
];

const ACTIVITIES: ActivityCategory[] = [
  {
    category: "Sunnah Sports",
    accentColor: "text-sky-500",
    items: [
      { title: "Horse Riding", description: "Experience the noble art of equestrianism.", icon: <Zap className="w-5 h-5" />, color: "bg-sky-100 text-sky-600" },
      { title: "Archery", description: "Focus, aim, and release with precision.", icon: <Zap className="w-5 h-5" />, color: "bg-sky-100 text-sky-600" }
    ]
  },
  {
    category: "Physical & Skills",
    accentColor: "text-lime-500",
    items: [
      { title: "Karate", description: "Self-defense and discipline training.", icon: <ShieldCheck className="w-5 h-5" />, color: "bg-lime-100 text-lime-600" },
      { title: "Public Speaking", description: "Find your voice and lead with confidence.", icon: <Users className="w-5 h-5" />, color: "bg-lime-100 text-lime-600" }
    ]
  },
  {
    category: "Academic Excellence",
    accentColor: "text-purple-500",
    items: [
      { title: "Science Exhibition", description: "Innovative projects and experiments.", icon: <Rocket className="w-5 h-5" />, color: "bg-purple-100 text-purple-600" },
      { title: "Quiz Competition", description: "Test your knowledge across subjects.", icon: <BookOpen className="w-5 h-5" />, color: "bg-purple-100 text-purple-600" }
    ]
  },
  {
    category: "Fun & Games",
    accentColor: "text-orange-500",
    items: [
      { title: "Inaam Ghar", description: "Exciting prizes and interactive fun.", icon: <Gamepad2 className="w-5 h-5" />, color: "bg-orange-100 text-orange-600" },
      { title: "Tug of War", description: "The ultimate test of team strength.", icon: <Gamepad2 className="w-5 h-5" />, color: "bg-orange-100 text-orange-600" }
    ]
  },

];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Schedule", href: "#schedule" },
    { name: "Activities", href: "#activities" },
    { name: "Memories", href: "#memories" },
    { name: "Sponsorship", href: "#sponsorship" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
        ? "bg-white/90 backdrop-blur-xl py-3 sm:py-4 shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
        : "bg-transparent py-4 sm:py-6 md:py-8"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <motion.a
          href="#home"
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 sm:gap-3 group"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg rotate-6 group-hover:rotate-12 transition-transform overflow-hidden">
            <img
              src="https://live.staticflickr.com/7156/6674386563_04f4f4a9ae_b.jpg"
              alt="Bazm-e-Sathi Logo"
              className="w-full h-full object-contain p-1"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className={`text-lg sm:text-xl md:text-2xl font-playful font-black tracking-tighter uppercase leading-none ${scrolled ? "text-sky-900" : "text-white"}`}>
              Summer <span className="text-orange-500">Camp</span>
            </span>
            <span className={`text-[8px] sm:text-[10px] font-playful font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] ${scrolled ? "text-sky-400" : "text-white/60"}`}>
              Shah Faisal 2k26
            </span>
          </div>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-xs lg:text-sm font-playful font-black uppercase tracking-widest transition-all hover:text-orange-500 ${scrolled ? "text-sky-900" : "text-white"
                }`}
            >
              {link.name}
            </a>
          ))}
          <motion.a
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            href="#register"
            className="bg-orange-500 text-white px-4 lg:px-8 py-2 lg:py-3 rounded-xl lg:rounded-2xl font-playful font-black uppercase tracking-widest shadow-lg hover:bg-yellow-400 transition-colors text-xs lg:text-sm"
          >
            Register Now
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-colors ${scrolled ? "bg-sky-50 text-sky-900" : "bg-white/10 text-white"
            }`}
        >
          {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-2xl p-6 sm:p-8 flex flex-col gap-4 sm:gap-6 md:hidden border-t border-sky-50"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-xl sm:text-2xl font-playful font-black text-sky-900 uppercase tracking-widest hover:text-orange-500 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#register"
              onClick={() => setIsOpen(false)}
              className="bg-orange-500 text-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl text-center text-xl sm:text-2xl font-playful font-black uppercase tracking-widest shadow-xl"
            >
              Register Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const images = [
    "/images/1.jpeg", "/images/4.jpeg", "/images/5.jpeg", "/images/7.jpeg", "/images/19.jpeg",
    "/images/20.jpeg", "/images/21.jpeg", "/images/22.jpeg", "/images/24.jpeg", "/images/35.jpeg",
    "/images/37.jpeg", "/images/39.jpeg", "/images/41.jpeg", "/images/42.jpeg", "/images/43.jpeg",
    "/images/44.jpeg", "/images/47.jpeg", "/images/48.jpeg", "/images/50.jpeg", "/images/57.jpeg",
    "/images/59.jpeg", "/images/62.jpeg"
  ];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section id="home" className="relative min-h-[70vh] sm:min-h-[90vh] pt-24 sm:pt-32 bg-sky-600 overflow-hidden flex items-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10" />
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={images[currentImage]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5 }}
            alt="Camp Background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
      </div>


      {/* Playful Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.5 + 0.5,
              rotate: Math.random() * 360
            }}
            animate={{
              y: [null, Math.random() * -100 - 50],
              rotate: [null, Math.random() * 360 + 360]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute text-white/20"
          >
            {i % 3 === 0 ? <Star className="w-12 h-12 fill-current" /> : i % 3 === 1 ? <Sparkles className="w-8 h-8" /> : <Heart className="w-10 h-10 fill-current" />}
          </motion.div>
        ))}
      </div>

      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 w-full text-center md:text-left">
        <div className="absolute top-10 right-10 opacity-20 pointer-events-none hidden md:block">
          <Trees className="w-24 h-24 sm:w-32 sm:h-32 text-white" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-2 sm:py-3 bg-white/20 backdrop-blur-md border-2 border-white/40 text-white rounded-full text-xs sm:text-sm font-playful font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-6 sm:mb-8 md:mb-12 shadow-2xl"
          >
            <span className="animate-bounce">🚀</span> 25 Years of Adventure
          </motion.div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] font-playful font-black text-white tracking-tighter uppercase leading-[0.85] mb-6 sm:mb-8 drop-shadow-2xl px-2">
            Summer<br />
            <span className="text-yellow-400 drop-shadow-[0_12px_0_rgba(234,179,8,0.2)]">Camp</span>
          </h1>

          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12">
            <motion.a
              whileHover={{ scale: 1.1, rotate: -2 }}
              whileTap={{ scale: 0.9 }}
              href="#register"
              className="group relative bg-orange-500 text-white px-8 sm:px-12 md:px-16 py-5 sm:py-6 md:py-8 rounded-[2rem] sm:rounded-[3rem] text-xl sm:text-2xl md:text-3xl font-playful font-black uppercase tracking-widest hover:bg-orange-400 transition-all shadow-[0_10px_0_rgb(194,65,12)] sm:shadow-[0_15px_0_rgb(194,65,12)] active:translate-y-3 active:shadow-none flex items-center gap-3 sm:gap-4 md:gap-6"
            >
              Register Now!
              <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 group-hover:translate-x-3 transition-transform" />
            </motion.a>
            <div className="max-w-sm text-center md:text-left px-4 sm:px-0">
              <p className="text-white text-lg sm:text-xl md:text-2xl font-playful font-bold leading-tight drop-shadow-md">
                "Level Up Your Summer & Spark Your Imagination!"
              </p>
              <div className="flex items-center justify-center md:justify-start gap-3 mt-4 text-sky-100 font-black uppercase tracking-widest text-xs">
                <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse" />
                Early Bird & Sibling Discounts!
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const AboutUs = () => {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 md:gap-20 items-center mb-16 sm:mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -top-12 -right-12 opacity-10 pointer-events-none hidden lg:block">
              <Tent className="w-32 h-32 sm:w-40 sm:h-40 text-sky-500" />
            </div>
            <div className="relative z-10 rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border-[6px] sm:border-[8px] md:border-[12px] border-sky-100 shadow-2xl rotate-3">
              <img
                src="/images/7.jpeg"
                alt="Group Moment"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Best Moment Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 md:-top-8 md:-left-8 z-20"
            >
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-[1.5rem] sm:rounded-[1.75rem] md:rounded-[2rem] overflow-hidden border-4 sm:border-6 md:border-8 border-white shadow-2xl rotate-6">
                <img src="/images/5.jpeg" alt="Best Moment" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-orange-500/70 flex items-center justify-center">
                  <span className="text-white font-playful font-black text-[10px] sm:text-xs md:text-sm uppercase tracking-tight text-center leading-tight">⭐ Best<br />Moment</span>
                </div>
              </div>
            </motion.div>
            <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 md:-bottom-10 md:-right-10 w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl z-20 -rotate-12">
              <span className="text-white font-playful font-black text-base sm:text-lg md:text-2xl text-center leading-tight">25 YEARS<br />LEGACY</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.span className="text-orange-500 font-playful font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] mb-4 sm:mb-6 block text-xs sm:text-sm">
              Who We Are
            </motion.span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-playful font-black tracking-tighter uppercase leading-none text-sky-900 mb-6 sm:mb-8">
              Sparking <span className="text-sky-500">Imagination</span> Since 2001
            </h2>
            <div className="space-y-4 sm:space-y-6 md:space-y-8 text-sky-800/80 text-base sm:text-lg md:text-xl font-bold leading-relaxed">
              <p>
                Summer Camp 2k26 by Bazm-e-Sathi (Shah Faisal Chapter) is more than just a camp—it's a journey of discovery, creativity, and growth. Powered by the Islamic Society of Children Hobbies, we've been building memories for 25 years.
              </p>
              <p>
                Our mission is to provide a safe, energetic, and spiritually enriching environment where children can "Level Up" their skills while staying connected to their roots.
              </p>
              <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 pt-6 sm:pt-8">
                <div className="bg-sky-50 p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl border-2 border-sky-100">
                  <div className="text-3xl sm:text-4xl font-playful font-black text-sky-500 mb-1 sm:mb-2">500+</div>
                  <div className="text-xs sm:text-sm font-playful font-black uppercase tracking-wide sm:tracking-widest text-sky-300">Happy Campers</div>
                </div>
                <div className="bg-orange-50 p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl border-2 border-orange-100">
                  <div className="text-3xl sm:text-4xl font-playful font-black text-orange-500 mb-1 sm:mb-2">20+</div>
                  <div className="text-xs sm:text-sm font-playful font-black uppercase tracking-wide sm:tracking-widest text-orange-300">Activities</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

const Schedule = () => {
  return (
    <section id="schedule" className="py-12 sm:py-16 md:py-20 bg-sky-50 relative overflow-hidden">
      {/* Decorative Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          x: [0, 50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -right-20 w-96 h-96 bg-yellow-200/40 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [0, -90, 0],
          x: [0, -50, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-20 -left-20 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 100, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/4 w-64 h-64 bg-lime-200/30 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-sky-600 font-playful font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] mb-4 sm:mb-6 block text-xs sm:text-sm"
          >
            The Adventure Map
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-playful font-black text-sky-900 tracking-tighter uppercase leading-none">
            Your <span className="text-orange-500 inline-block hover:rotate-3 transition-transform">Timeline</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 max-w-5xl mx-auto">
          {SCHEDULE.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white p-6 sm:p-8 md:p-12 rounded-[2.5rem] sm:rounded-[3rem] md:rounded-[4rem] shadow-[0_20px_40px_rgba(0,0,0,0.08)] sm:shadow-[0_30px_60px_rgba(0,0,0,0.08)] border-b-[8px] sm:border-b-[12px] border-sky-100 hover:border-sky-500 transition-all group"
            >
              <div className="flex items-center justify-between mb-6 sm:mb-8 md:mb-10">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 ${item.color} rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-lg border-2 sm:border-4 border-white`}
                >
                  <Calendar className="text-white w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                </motion.div>
                <div className="text-right">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-playful font-black text-sky-900 uppercase">{item.day}</h3>
                  <p className="text-sky-500 font-playful font-black text-sm sm:text-base md:text-lg uppercase tracking-wide sm:tracking-widest">{item.date}</p>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 sm:gap-4 md:gap-6 bg-sky-50 p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl border-2 border-transparent group-hover:border-sky-200 transition-all">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-orange-100 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-[8px] sm:text-[9px] md:text-[10px] font-playful font-black text-sky-300 uppercase tracking-widest mb-1">Location</p>
                    <p className="text-sky-900 font-black text-sm sm:text-base md:text-xl leading-tight">{item.venue}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 md:gap-6 bg-sky-50 p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl border-2 border-transparent group-hover:border-sky-200 transition-all">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-sky-100 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-sky-500" />
                  </div>
                  <div>
                    <p className="text-[8px] sm:text-[9px] md:text-[10px] font-playful font-black text-sky-300 uppercase tracking-widest mb-1">Time</p>
                    <p className="text-sky-900 font-black text-sm sm:text-base md:text-xl leading-tight">{item.time}</p>
                  </div>
                </div>
              </div>


              <div className="mt-6 sm:mt-8 md:mt-10 pt-6 sm:pt-8 md:pt-10 border-t-2 border-sky-50">
                <p className="text-sky-700/60 font-bold italic leading-relaxed text-sm sm:text-base md:text-lg">
                  "{item.details}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Activities = () => {
  return (
    <section id="activities" className="py-12 sm:py-16 md:py-20 bg-white text-sky-900 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">

        <div className="absolute bottom-20 right-10 w-60 h-60 border-8 border-orange-500 rounded-[3rem] rotate-45" />

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, rotate: -10 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            className="inline-flex items-center gap-2 bg-yellow-400 text-yellow-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-playful font-black text-[10px] sm:text-xs uppercase tracking-wide sm:tracking-widest mb-4 sm:mb-6 shadow-lg"
          >
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
            The Fun Zone
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-playful font-black tracking-tighter uppercase leading-none">
            Awesome <span className="text-yellow-400 drop-shadow-[0_8px_0_rgba(234,179,8,0.2)]">Skills</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {ACTIVITIES.flatMap((cat, catIdx) =>
            cat.items.map((item, itemIdx) => (
              <motion.div
                key={`${catIdx}-${itemIdx}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: (catIdx + itemIdx) * 0.02 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="group bg-sky-50 p-3 sm:p-4 md:p-6 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] border-2 border-transparent hover:border-sky-200 transition-all text-center flex flex-col items-center"
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 ${item.color} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md mb-2 sm:mb-3 md:mb-4 group-hover:rotate-12 transition-transform`}>
                  {React.cloneElement(item.icon as React.ReactElement, { className: "w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" })}
                </div>
                <h4 className="text-[10px] sm:text-xs md:text-sm font-playful font-black uppercase tracking-tight text-sky-900 group-hover:text-sky-600 transition-colors leading-tight">
                  {item.title}
                </h4>
                <div className="mt-1 sm:mt-2 px-2 sm:px-3 py-0.5 rounded-full bg-white text-[7px] sm:text-[8px] font-playful font-black text-sky-500 uppercase tracking-wide sm:tracking-widest shadow-sm">
                  {cat.category}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};



const Contact = () => {
  return (
    <footer id="contact" className="bg-sky-900 text-white pt-12 sm:pt-16 md:pt-24 pb-8 sm:pb-10 md:pb-12 rounded-t-[3rem] sm:rounded-t-[4rem] md:rounded-t-[5rem] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
        <div className="absolute top-20 right-10 w-32 h-32 sm:w-40 sm:h-40 border-4 sm:border-8 border-yellow-400 rounded-full" />
        <div className="absolute bottom-20 left-10 w-48 h-48 sm:w-60 sm:h-60 border-4 sm:border-8 border-orange-500 rounded-[2rem] sm:rounded-[3rem] -rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16 md:gap-20">
          <div className="col-span-full lg:col-span-1">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl rotate-6 overflow-hidden">
                <img
                  src="https://live.staticflickr.com/7156/6674386563_04f4f4a9ae_b.jpg"
                  alt="Bazm-e-Sathi Logo"
                  className="w-full h-full object-contain p-1"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl md:text-3xl font-playful font-black tracking-tight uppercase leading-none">Summer <span className="text-orange-500">Camp</span></span>
                <span className="text-[8px] sm:text-[10px] font-playful font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/40">Shah Faisal 2k26</span>
              </div>
            </div>
            <p className="text-sky-100 font-bold leading-relaxed mb-6 sm:mb-8 md:mb-10 text-sm sm:text-base md:text-lg">
              Bazm-e-Sathi (Shah Faisal Chapter) powered by Islamic Society of Children Hobbies.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <motion.a
                whileHover={{ scale: 1.2, rotate: 12 }}
                href="https://www.facebook.com/bazmsathishafaisal/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-white/80 hover:text-white hover:bg-sky-600 transition-all shadow-lg"
              >
                <Facebook className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, rotate: -12 }}
                href="#"
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-white/80 hover:text-white hover:bg-orange-500 transition-all shadow-lg"
              >
                <Instagram className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, rotate: 12 }}
                href="#"
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-white/80 hover:text-white hover:bg-sky-400 transition-all shadow-lg"
              >
                <Twitter className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
              </motion.a>
            </div>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-playful font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-yellow-400 mb-6 sm:mb-8 md:mb-10">Quick Links</h4>
            <ul className="space-y-3 sm:space-y-4 md:space-y-6 text-sky-100 font-playful font-black text-xs sm:text-sm uppercase tracking-wide sm:tracking-widest">
              <li><a href="#home" className="hover:text-white hover:translate-x-2 transition-all inline-block">Home</a></li>
              <li><a href="#about" className="hover:text-white hover:translate-x-2 transition-all inline-block">About</a></li>
              <li><a href="#schedule" className="hover:text-white hover:translate-x-2 transition-all inline-block">Schedule</a></li>
              <li><a href="#activities" className="hover:text-white hover:translate-x-2 transition-all inline-block">Activities</a></li>
              <li><a href="#memories" className="hover:text-white hover:translate-x-2 transition-all inline-block">Memories</a></li>
              <li><a href="#sponsorship" className="hover:text-white hover:translate-x-2 transition-all inline-block">Sponsorship</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-playful font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-yellow-400 mb-6 sm:mb-8 md:mb-10">Get in Touch</h4>
            <div className="space-y-6 sm:space-y-8 md:space-y-10">
              <div className="flex items-center gap-4 sm:gap-5 md:gap-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-inner">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
                </div>
                <div>
                  <p className="text-[8px] sm:text-[9px] md:text-[10px] font-playful font-black uppercase tracking-widest text-sky-100/40 mb-1">Call Us</p>
                  <p className="text-base sm:text-lg md:text-xl font-playful font-black">+92 332 6999982</p>
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-5 md:gap-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-inner">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400" />
                </div>
                <div>
                  <p className="text-[8px] sm:text-[9px] md:text-[10px] font-playful font-black uppercase tracking-widest text-sky-100/40 mb-1">Email Us</p>
                  <a href="mailto:ijtshahfaisalchapter@gmail.com" className="text-sm sm:text-base md:text-xl font-playful font-black truncate max-w-[200px] hover:text-sky-400 transition-colors break-all">ijtshahfaisalchapter@gmail.com</a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-playful font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-yellow-400 mb-6 sm:mb-8 md:mb-10">Location</h4>
            <div className="flex items-start gap-4 sm:gap-5 md:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-inner shrink-0">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-lime-400" />
              </div>
              <div>
                <p className="text-[8px] sm:text-[9px] md:text-[10px] font-playful font-black uppercase tracking-widest text-sky-100/40 mb-1">Our Base</p>
                <p className="text-base sm:text-lg md:text-xl font-playful font-black leading-tight">Shah Faisal, Karachi, Pakistan</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

const Gallery = () => {
  const memories = [
    { id: 1, title: "Inspiring Talks", img: "/images/19.jpeg", rotate: "-rotate-3" },
    { id: 2, title: "Fun Games", img: "/images/20.jpeg", rotate: "rotate-2" },
    { id: 3, title: "Camp Activities", img: "/images/21.jpeg", rotate: "-rotate-1" },
    { id: 4, title: "Swimming Pool", img: "/images/22.jpeg", rotate: "rotate-3" },
    { id: 5, title: "Gift Distribution", img: "/images/24.jpeg", rotate: "-rotate-2" },
    { id: 8, title: "Group Moment", img: "/images/7.jpeg", rotate: "rotate-3" },
  ];

  return (
    <section id="memories" className="py-12 sm:py-16 md:py-20 bg-sky-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <Sparkles className="absolute top-20 left-[10%] w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-sky-400" />
        <Heart className="absolute bottom-20 right-[15%] w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-orange-400" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-orange-500 font-playful font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] mb-4 sm:mb-6 block text-xs sm:text-sm"
          >
            Flashback
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-playful font-black tracking-tighter uppercase leading-none text-sky-900">
            Camp <span className="text-sky-500 drop-shadow-[0_6px_0_rgba(14,165,233,0.15)]">Memories</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          {memories.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, zIndex: 20 }}
              className={`bg-white p-4 sm:p-5 md:p-6 pb-10 sm:pb-12 md:pb-16 shadow-2xl rounded-sm ${photo.rotate} hover:rotate-0 transition-all duration-500 border-4 sm:border-6 md:border-8 border-white`}
            >
              <div className="aspect-[4/3] overflow-hidden rounded-sm mb-4 sm:mb-5 md:mb-6 bg-sky-100">
                <img
                  src={photo.img}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-center font-playful font-black text-lg sm:text-xl md:text-2xl text-sky-900 uppercase tracking-tight">
                {photo.title}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 md:mt-24 text-center">
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="https://www.facebook.com/bazmsathishafaisal/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 sm:gap-4 bg-sky-600 text-white px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] text-base sm:text-lg md:text-xl font-playful font-black uppercase tracking-widest shadow-xl hover:bg-sky-500 transition-all"
          >
            View Full Gallery
            <Facebook className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

const Partners = () => {
  const sponsors = [
    { name: "Al Khidmat Foundation", img: "/sponsor/11.png" },
    { name: "The Learning Space", img: "/sponsor/12.jpeg" },
    { name: "Helping Hand", img: "/sponsor/16.png" },
    { name: "Dar-e-Arqam Schools", img: "/sponsor/15.png" },
    { name: "Al Ghaffar Travel", img: "/sponsor/17.jpeg" },
    { name: "Quice Fruit Drinks", img: "/sponsor/14.jpeg" },
  ];

  return (
    <section id="sponsorship" className="py-12 sm:py-16 md:py-20 bg-sky-600 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 md:gap-20 items-center mb-12 sm:mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs sm:text-sm font-playful font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-white/60 mb-4 sm:mb-6 block">Partnership</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-playful font-black text-white tracking-tighter uppercase leading-[0.9] mb-6 sm:mb-8">
              Be a <span className="text-yellow-300">Super</span> Sponsor
            </h2>
            <p className="text-sky-50 text-base sm:text-lg md:text-xl font-bold leading-relaxed mb-6 sm:mb-8 md:mb-10 max-w-xl">
              Help us create magic for 350+ students! Your brand will be seen across 4 premium venues and our massive digital network.
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:ijtshahfaisalchapter@gmail.com"
              className="inline-flex items-center gap-3 sm:gap-4 bg-white text-sky-600 px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg font-playful font-black uppercase tracking-widest hover:bg-yellow-300 hover:text-sky-900 transition-all"
            >
              Request Deck
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.a>
          </motion.div>

          <div className="space-y-6 sm:space-y-8">
            <h3 className="text-xl sm:text-2xl font-playful font-black text-white uppercase tracking-widest text-center md:text-left mb-4 sm:mb-6">Our Exclusive Sponsors</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {sponsors.map((sponsor, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center gap-2 sm:gap-3"
                >
                  <div className="bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/20 shadow-lg w-full h-20 sm:h-24 flex items-center justify-center overflow-hidden group hover:bg-white transition-all">
                    <img
                      src={sponsor.img}
                      alt={sponsor.name}
                      className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <p className="text-white font-playful font-black text-center uppercase tracking-tight text-[9px] sm:text-[10px]">{sponsor.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface FormData {
  childName: string;
  age: string;
  parentName: string;
  phone: string;
  area: string;
}

const RegistrationForm = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  // ─── GOOGLE SHEETS SETUP ───────────────────────────────────────────────────
  // 1. Go to https://sheets.google.com and create a new sheet in ijtshahfaisalchapter@gmail.com
  // 2. Name columns: Timestamp | Child Name | Age | Parent Name | Phone | Area
  // 3. Click Extensions > Apps Script, paste the code below, then deploy as Web App
  //    (Execute as: Me, Who has access: Anyone) and copy the Web App URL here.
  //
  // Apps Script code:
  // function doPost(e) {
  //   try {
  //     var ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById("1icIAwJu-Qu4aM9LA9Zb_g4zLLntsRQqgduNnzUlaBso");
  //     var sheet = ss.getSheets()[0];
  //     var data = (e.postData && e.postData.contents) ? JSON.parse(e.postData.contents) : e.parameter;
  //     
  //     var screenshotUrl = "No Screenshot";
  //     if (data.screenshot && data.screenshot.includes("base64")) {
  //       try {
  //         var parts = data.screenshot.split(",");
  //         var contentType = parts[0].split(":")[1].split(";")[0];
  //         var base64Data = parts[1];
  //         var blob = Utilities.newBlob(Utilities.base64Decode(base64Data), contentType, "screenshot_" + (data.childName || "child") + "_" + new Date().getTime());
  //         var file = DriveApp.createFile(blob);
  //         file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  //         screenshotUrl = file.getUrl();
  //       } catch(err) { screenshotUrl = "Error saving: " + err.toString(); }
  //     }
  //     
  //     if (sheet.getLastRow() === 0) {
  //       sheet.appendRow(["Timestamp", "Child Name", "Age", "Parent Name", "Phone", "Area", "Screenshot Link"]);
  //     }
  //     
  //     sheet.appendRow([
  //       new Date(), 
  //       data.childName || e.parameter.childName || "", 
  //       data.age || e.parameter.age || "", 
  //       data.parentName || e.parameter.parentName || "", 
  //       data.phone || e.parameter.phone || "", 
  //       data.area || e.parameter.area || "",
  //       screenshotUrl
  //     ]);
  //     return ContentService.createTextOutput("OK").setMimeType(ContentService.MimeType.TEXT);
  //   } catch (error) {
  //     return ContentService.createTextOutput("Error: " + error.toString()).setMimeType(ContentService.MimeType.TEXT);
  //   }
  // }
  // ──────────────────────────────────────────────────────────────────────────
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzrsfI3PwvZW4zuYrbLSRSKU4jj5Qd7Xy0UtKGmMTvbXx6HA2ZFmMFG3xicd7a-sdxV9Q/exec';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    // Extract text fields
    formData.forEach((value, key) => {
      if (typeof value === 'string') {
        data[key] = value;
      }
    });

    // Handle File (Screenshot)
    const file = formData.get('screenshot') as File;
    if (file && file.size > 0) {
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
      data['screenshot'] = await base64Promise;
    }

    try {
      // Use JSON instead of URL-encoded for handling large base64 data more reliably
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Capture form data for the entry pass
      setFormData({
        childName: data.childName || '',
        age: data.age || '',
        parentName: data.parentName || '',
        phone: data.phone || '',
        area: data.area || '',
      });
      setStatus('success');
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  if (status === 'success' && formData) {
    return (
      <EntryPass
        childName={formData.childName}
        age={formData.age}
        parentName={formData.parentName}
        phone={formData.phone}
        area={formData.area}
        onRegisterAnother={() => {
          setStatus('idle');
          setPreview(null);
          setFormData(null);
        }}
      />
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 md:p-10 lg:p-16 rounded-[2.5rem] sm:rounded-[3rem] md:rounded-[4rem] shadow-2xl border-2 sm:border-4 border-sky-50 relative z-10 text-left">
      <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-10">
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-playful font-black uppercase tracking-wide sm:tracking-widest text-sky-400 ml-2 sm:ml-4">Child Name</label>
          <input
            required
            name="childName"
            type="text"
            placeholder="Enter name"
            className="w-full px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 bg-sky-50/50 border-2 border-transparent focus:border-sky-200 rounded-2xl sm:rounded-3xl outline-none transition-all font-bold text-sky-900 text-sm sm:text-base"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-playful font-black uppercase tracking-wide sm:tracking-widest text-sky-400 ml-2 sm:ml-4">Age</label>
          <input
            required
            name="age"
            type="number"
            placeholder="Enter age"
            className="w-full px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 bg-sky-50/50 border-2 border-transparent focus:border-sky-200 rounded-2xl sm:rounded-3xl outline-none transition-all font-bold text-sky-900 text-sm sm:text-base"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-playful font-black uppercase tracking-wide sm:tracking-widest text-sky-400 ml-2 sm:ml-4">Parent's Name</label>
          <input
            required
            name="parentName"
            type="text"
            placeholder="Enter name"
            className="w-full px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 bg-sky-50/50 border-2 border-transparent focus:border-sky-200 rounded-2xl sm:rounded-3xl outline-none transition-all font-bold text-sky-900 text-sm sm:text-base"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-playful font-black uppercase tracking-wide sm:tracking-widest text-sky-400 ml-2 sm:ml-4">Phone Number</label>
          <input
            required
            name="phone"
            type="tel"
            placeholder="Enter number"
            className="w-full px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 bg-sky-50/50 border-2 border-transparent focus:border-sky-200 rounded-2xl sm:rounded-3xl outline-none transition-all font-bold text-sky-900 text-sm sm:text-base"
          />
        </div>
      </div>

      <div className="space-y-2 mb-6 sm:mb-8 md:mb-10">
        <label className="text-xs sm:text-sm font-playful font-black uppercase tracking-wide sm:tracking-widest text-sky-400 ml-2 sm:ml-4">Area / Location</label>
        <input
          required
          name="area"
          type="text"
          placeholder="Enter your area (e.g. Block 1, Shah Faisal)"
          className="w-full px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 bg-sky-50/50 border-2 border-transparent focus:border-sky-200 rounded-2xl sm:rounded-3xl outline-none transition-all font-bold text-sky-900 text-sm sm:text-base"
        />
      </div>

      <div className="bg-sky-50 p-4 sm:p-6 md:p-8 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] border-2 sm:border-4 border-sky-100 mb-6 sm:mb-8 md:mb-10">
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-center">
          <div className="flex-1 w-full space-y-3">
            <h4 className="text-xs sm:text-sm font-playful font-black text-sky-900 uppercase ml-2">Payment Info</h4>
            <div className="bg-sky-600 text-white p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl shadow-lg">
              <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-sky-200 mb-2">Easypaisa - Hamza Jabbar</p>
              <p className="text-2xl sm:text-3xl font-black tracking-tighter border-t border-white/10 pt-3">03184867019</p>
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="space-y-2">
              <label className="text-[9px] sm:text-[10px] font-playful font-black uppercase tracking-widest text-sky-300 ml-2 sm:ml-4">Payment Screenshot</label>
              <div className="relative group">
                <input
                  required
                  name="screenshot"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full h-[50px] sm:h-[60px] opacity-0 absolute inset-0 z-20 cursor-pointer"
                />
                <div className="w-full h-[50px] sm:h-[60px] bg-white border-2 border-dashed border-sky-200 group-hover:border-sky-400 rounded-xl sm:rounded-2xl flex items-center justify-center text-sky-300 font-bold group-hover:text-sky-500 transition-all text-xs overflow-hidden">
                  {preview ? (
                    <div className="flex items-center gap-2 sm:gap-3 w-full h-full px-3 sm:px-4">
                      <img src={preview} alt="Preview" className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-lg shadow-sm" />
                      <span className="text-sky-600 truncate text-xs sm:text-sm">Screenshot Ready!</span>
                    </div>
                  ) : (
                    'Click to upload screenshot'
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        disabled={status === 'submitting'}
        type="submit"
        className="w-full bg-orange-500 text-white py-5 sm:py-6 md:py-8 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] text-lg sm:text-xl md:text-2xl font-playful font-black uppercase tracking-widest shadow-[0_8px_0_rgb(194,65,12)] sm:shadow-[0_12px_0_rgb(194,65,12)] hover:bg-orange-400 active:translate-y-2 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Saving...' : 'Register Now!'}
      </button>

      {status === 'error' && (
        <p className="text-red-500 text-center mt-4 sm:mt-6 font-bold text-sm sm:text-base">Something went wrong. Please try again or contact us via WhatsApp.</p>
      )}
    </form>
  );
};

const RegistrationSection = () => {
  return (
    <section className="bg-white relative overflow-hidden">
      {/* Orange CTA — anchor here so Contact button lands on this */}
      <div id="register" className="bg-gradient-to-br from-orange-500 to-orange-600 py-12 sm:py-16 md:py-20 px-4 sm:px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 opacity-10 pointer-events-none hidden lg:block"><Mountain className="w-48 h-48 md:w-64 md:h-64 text-white" /></div><div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 opacity-10 pointer-events-none hidden lg:block"><Sun className="w-48 h-48 md:w-64 md:h-64 text-white animate-pulse" /></div><motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block text-[10px] sm:text-xs font-playful font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-white/60 mb-4 sm:mb-6 md:mb-8"
          >
            Don't Miss Out!
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-playful font-black text-white tracking-tighter uppercase leading-none mb-6 sm:mb-8 drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)]">
            Let's Go<br />
            <span className="text-yellow-300">Camping!</span>
          </h2>
          <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-playful font-bold max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed px-4">
            Secure your spot for only{" "}
            <span className="bg-white text-orange-600 px-3 sm:px-4 py-1 rounded-lg sm:rounded-xl shadow-lg inline-block">1,200 PKR</span>.
            <span className="text-white/80 text-sm sm:text-base md:text-lg mt-2 sm:mt-3 block">Early bird & sibling discounts available!</span>
          </p>



          <div className="flex items-center justify-center gap-3 sm:gap-4 text-white/70 font-playful font-black text-base sm:text-lg uppercase tracking-widest">
            <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
            +92 332 6999982
          </div>
        </div>
      </div>

      {/* Registration Form below the CTA */}
      <div className="bg-sky-600 py-12 sm:py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, 20, 0], rotate: [0, 45, 0] }}
            transition={{ duration: 3 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
            className="absolute w-4 h-4 rounded-sm opacity-20"
            style={{
              backgroundColor: ['#38bdf8', '#fbbf24', '#f97316', '#a3e635'][i % 4],
              top: (i * 8) % 100 + "%",
              left: (i * 7 + 5) % 100 + "%"
            }}
          />
        ))}
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-yellow-300 font-playful font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] mb-3 sm:mb-4 block text-xs sm:text-sm"
            >
              Join the Adventure
            </motion.span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-playful font-black text-white tracking-tighter uppercase leading-none mb-4 sm:mb-6">
              Online <span className="text-yellow-300">Registration</span>
            </h2>
            <p className="text-white/80 text-base sm:text-lg md:text-xl font-bold max-w-xl mx-auto px-4">
              Fill out the form below to secure your spot.
            </p>
          </div>
          <RegistrationForm />
        </div>
      </div>
    </section>
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-10 md:right-10 z-50 bg-orange-500 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-2xl hover:bg-orange-400 transition-colors"
        >
          <ChevronUp className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-white selection:bg-sky-500 selection:text-white font-sans">
      <Navbar />
      <Hero />
      <AboutUs />
      <Schedule />
      <Activities />
      <Gallery />
      <Partners />
      <RegistrationSection />
      <Contact />
      <ScrollToTop />
    </div>
  );
}
