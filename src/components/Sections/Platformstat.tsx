"use client";

import React from "react";
import { motion } from "framer-motion";
import { Home, Users, ShieldCheck, MapPin } from "lucide-react";

interface Stat {
  id: number;
  icon: React.ElementType;
  value: string;
  title: string;
  description: string;
}

const stats: Stat[] = [
  {
    id: 1,
    icon: Home,
    value: "10,000+",
    title: "Rooms Listed",
    description: "Comfortable places available",
  },
  {
    id: 2,
    icon: Users,
    value: "8,500+",
    title: "Happy Users",
    description: "People found their homes",
  },
  {
    id: 3,
    icon: ShieldCheck,
    value: "5,000+",
    title: "Verified Owners",
    description: "Trusted property providers",
  },
  {
    id: 4,
    icon: MapPin,
    value: "64+",
    title: "Locations",
    description: "Cities and areas covered",
  },
];


const PlatformStats = () => {
  return (
    <section className="py-16 bg-white">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {stats.map((stat, index) => {

            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-6 border border-blue-100 hover:shadow-xl transition"
              >

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-400 flex items-center justify-center text-white mb-5 shadow-lg">
                  <Icon size={28}/>
                </div>


                <h3 className="text-3xl font-black text-gray-900">
                  {stat.value}
                </h3>


                <h4 className="text-lg font-bold text-gray-800 mt-2">
                  {stat.title}
                </h4>


                <p className="text-gray-500 text-sm mt-2">
                  {stat.description}
                </p>


              </motion.div>
            );

          })}

        </div>

      </div>

    </section>
  );
};

export default PlatformStats;