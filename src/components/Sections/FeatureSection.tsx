"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, BedDouble, Bath, Heart } from "lucide-react";

interface Room {
  id: number;
  title: string;
  location: string;
  price: string;
  image: string;
  beds: string;
  baths: string;
  type: string;
}

const featuredRooms: Room[] = [
  {
    id: 1,
    title: "Modern Single Room",
    location: "Dhanmondi, Dhaka",
    price: "৳12,000/month",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb",
    beds: "1 Bed",
    baths: "1 Bath",
    type: "Single Room",
  },
  {
    id: 2,
    title: "Luxury Apartment",
    location: "Gulshan, Dhaka",
    price: "৳35,000/month",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    beds: "3 Beds",
    baths: "2 Baths",
    type: "Apartment",
  },
  {
    id: 3,
    title: "Affordable Shared Room",
    location: "Mirpur, Dhaka",
    price: "৳7,000/month",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    beds: "2 Beds",
    baths: "1 Bath",
    type: "Shared Room",
  },
];


const FeaturedRooms = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
          <div>
            <p className="text-blue-500 font-semibold mb-2">Featured Listings</p>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900">Explore Popular Rooms</h2>
            <p className="text-gray-500 mt-4 max-w-xl">Discover comfortable and verified rooms from trusted owners around your location.</p>
          </div>

          <button className="px-6 py-3 rounded-full border border-gray-200 hover:border-blue-400 hover:text-blue-600 transition font-semibold">
            View All Rooms
          </button>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {featuredRooms.map((room, index) => (

            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition group"
            >

              <div className="relative">

                <img src={room.image} alt={room.title} className="w-full h-64 object-cover group-hover:scale-105 transition duration-500" />

                <button className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center hover:text-red-500 transition">
                  <Heart size={20}/>
                </button>

                <span className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-full text-sm font-semibold text-blue-600 shadow">
                  {room.type}
                </span>

              </div>


              <div className="p-6">

                <h3 className="text-xl font-bold text-gray-900">{room.title}</h3>

                <div className="flex items-center gap-2 text-gray-500 mt-3">
                  <MapPin size={18} className="text-blue-500"/>
                  <span>{room.location}</span>
                </div>


                <div className="flex items-center gap-5 mt-5 text-sm text-gray-500">

                  <div className="flex items-center gap-2">
                    <BedDouble size={18} className="text-cyan-500"/>
                    {room.beds}
                  </div>

                  <div className="flex items-center gap-2">
                    <Bath size={18} className="text-teal-500"/>
                    {room.baths}
                  </div>

                </div>


                <div className="flex items-center justify-between mt-6">

                  <h4 className="text-xl font-black text-blue-600">
                    {room.price}
                  </h4>

                  <button className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 text-white text-sm font-semibold hover:scale-105 transition">
                    Details
                  </button>

                </div>


              </div>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default FeaturedRooms;