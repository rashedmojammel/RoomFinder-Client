"use client";

import React from "react";
import { motion } from "framer-motion";
import { BedDouble, Building2, Users, House, GraduationCap, BriefcaseBusiness } from "lucide-react";

interface Category {
  id: number;
  icon: React.ElementType;
  title: string;
  rooms: string;
  description: string;
}

const categories: Category[] = [
  {
    id: 1,
    icon: BedDouble,
    title: "Single Room",
    rooms: "2,500+ Rooms",
    description: "Perfect private rooms for students and professionals.",
  },
  {
    id: 2,
    icon: Users,
    title: "Shared Room",
    rooms: "1,800+ Rooms",
    description: "Affordable shared spaces with comfortable facilities.",
  },
  {
    id: 3,
    icon: Building2,
    title: "Apartment",
    rooms: "3,200+ Listings",
    description: "Modern apartments for families and groups.",
  },
  {
    id: 4,
    icon: House,
    title: "Family House",
    rooms: "1,200+ Houses",
    description: "Spacious homes for a peaceful family lifestyle.",
  },
  {
    id: 5,
    icon: GraduationCap,
    title: "Student Room",
    rooms: "2,000+ Rooms",
    description: "Budget-friendly rooms near universities.",
  },
  {
    id: 6,
    icon: BriefcaseBusiness,
    title: "Office Space",
    rooms: "500+ Spaces",
    description: "Professional spaces for businesses and startups.",
  },
];


const RoomCategories = () => {
  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-5 mb-12">

          <div>
            <p className="text-blue-500 font-semibold mb-3">
              Explore Categories
            </p>

            <h2 className="text-4xl lg:text-5xl font-black text-gray-900">
              Find A Room That Fits Your Lifestyle
            </h2>

            <p className="text-gray-500 mt-4 max-w-xl">
              Choose from different room types designed for students,
              professionals, families, and businesses.
            </p>
          </div>


          <button className="px-6 py-3 rounded-full border border-gray-200 hover:border-blue-400 hover:text-blue-600 transition font-semibold">
            Explore More
          </button>

        </div>



        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">

          {categories.map((category, index) => {

            const Icon = category.icon;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-7 rounded-3xl border border-gray-100 bg-gradient-to-br from-white to-blue-50 hover:shadow-xl transition"
              >

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-400 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition">
                  <Icon size={30}/>
                </div>


                <h3 className="text-xl font-bold text-gray-900 mt-6">
                  {category.title}
                </h3>


                <p className="text-blue-600 font-semibold mt-2">
                  {category.rooms}
                </p>


                <p className="text-gray-500 mt-3 leading-relaxed">
                  {category.description}
                </p>


                <button className="mt-6 text-sm font-semibold text-gray-700 hover:text-blue-600 transition">
                  Browse Rooms →
                </button>


              </motion.div>
            );

          })}

        </div>


      </div>

    </section>
  );
};

export default RoomCategories;