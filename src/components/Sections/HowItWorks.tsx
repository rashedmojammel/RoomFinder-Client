"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, MessageCircle, KeyRound } from "lucide-react";

interface Step {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    id: 1,
    icon: Search,
    title: "Search Your Room",
    description: "Explore thousands of rooms based on location, budget, and preferences.",
  },
  {
    id: 2,
    icon: MessageCircle,
    title: "Contact Owner",
    description: "Connect directly with verified owners and discuss your requirements.",
  },
  {
    id: 3,
    icon: KeyRound,
    title: "Move In Easily",
    description: "Finalize your choice and move into your new comfortable home.",
  },
];


const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">


        <div className="text-center max-w-3xl mx-auto mb-14">

          <p className="text-blue-500 font-semibold mb-3">
            Simple Process
          </p>

          <h2 className="text-4xl lg:text-5xl font-black text-gray-900">
            Find Your Room In 3 Easy Steps
          </h2>

          <p className="text-gray-500 mt-4">
            We make finding your perfect living space faster, easier, and safer.
          </p>

        </div>



        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">


          {steps.map((step, index) => {

            const Icon = step.icon;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition"
              >


                <div className="absolute -top-5 left-8 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 text-white flex items-center justify-center font-bold shadow-lg">
                  {step.id}
                </div>


                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 mt-3">
                  <Icon className="text-blue-500" size={32}/>
                </div>


                <h3 className="text-xl font-bold text-gray-900">
                  {step.title}
                </h3>


                <p className="text-gray-500 mt-3 leading-relaxed">
                  {step.description}
                </p>


              </motion.div>
            );

          })}


        </div>


      </div>

    </section>
  );
};

export default HowItWorks;