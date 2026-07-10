"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Home,
  ShieldCheck,
  Users,
} from "lucide-react";


const HeroSection = () => {

  const features = [
    {
      icon: Home,
      title: "10K+ Rooms",
      description: "Available listings",
    },
    {
      icon: Users,
      title: "5K+ Users",
      description: "Finding homes",
    },
    {
      icon: ShieldCheck,
      title: "Verified",
      description: "Trusted owners",
    },
  ];


  return (
    <section className="
      relative
      overflow-hidden
      bg-gradient-to-br
      from-blue-50
      via-white
      to-cyan-50
    ">


      {/* Background Blur Effects */}
      <div className="
        absolute
        top-10
        left-10
        w-72
        h-72
        bg-blue-400/20
        rounded-full
        blur-3xl
      "/>


      <div className="
        absolute
        bottom-0
        right-10
        w-80
        h-80
        bg-cyan-400/20
        rounded-full
        blur-3xl
      "/>



      <div className="
        max-w-7xl
        mx-auto
        px-6
        lg:px-10
        py-20
        lg:py-28
      ">


        <div className="
          grid
          lg:grid-cols-2
          gap-12
          items-center
        ">


          {/* Left Content */}
          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >


            <div className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              bg-white
              shadow-sm
              border
              border-gray-100
              text-sm
              text-blue-600
              font-semibold
              mb-6
            ">
              🏠 Find your perfect place today
            </div>



            <h1 className="
              text-5xl
              lg:text-7xl
              font-black
              leading-tight
              text-gray-900
            ">

              Find A Place
              <span className="
                block
                bg-gradient-to-r
                from-blue-600
                via-cyan-500
                to-teal-400
                bg-clip-text
                text-transparent
              ">
                You Can Call Home
              </span>

            </h1>



            <p className="
              mt-6
              text-lg
              text-gray-600
              max-w-xl
              leading-relaxed
            ">
              Discover affordable rooms, apartments, and shared spaces
              near you. Connect with verified owners and find your next
              comfortable stay easily.
            </p>




            {/* Search Box */}

            <motion.div
              initial={{
                opacity:0,
                y:30
              }}
              animate={{
                opacity:1,
                y:0
              }}
              transition={{
                delay:0.3,
                duration:0.7
              }}
              className="
                mt-8
                bg-white
                rounded-3xl
                shadow-xl
                border
                border-gray-100
                p-4
              "
            >


              <div className="
                flex
                flex-col
                md:flex-row
                gap-3
              ">


                <div className="
                  flex
                  items-center
                  gap-3
                  flex-1
                  px-4
                  py-3
                  rounded-2xl
                  bg-gray-50
                ">
                  <MapPin className="text-blue-500"/>

                  <input
                    type="text"
                    placeholder="Search location..."
                    className="
                      bg-transparent
                      outline-none
                      w-full
                    "
                  />

                </div>



                <button
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    px-8
                    py-3
                    rounded-2xl
                    bg-gradient-to-r
                    from-blue-500
                    via-cyan-500
                    to-teal-400
                    text-white
                    font-semibold
                    hover:scale-105
                    transition
                  "
                >

                  <Search size={20}/>
                  Search

                </button>


              </div>


            </motion.div>



            {/* Stats */}

            <div className="
              mt-10
              flex
              flex-wrap
              gap-6
            ">

              {features.map((item,index)=>{

                const Icon = item.icon;

                return (
                  <motion.div
                    key={index}
                    initial={{
                      opacity:0,
                      y:20
                    }}
                    animate={{
                      opacity:1,
                      y:0
                    }}
                    transition={{
                      delay:index * 0.2
                    }}
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <div className="
                      w-12
                      h-12
                      rounded-2xl
                      bg-white
                      shadow-md
                      flex
                      items-center
                      justify-center
                    ">
                      <Icon className="text-blue-500"/>
                    </div>


                    <div>
                      <h3 className="font-bold text-gray-900">
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>


                  </motion.div>
                )

              })}

            </div>



          </motion.div>





          {/* Right Image */}
          <motion.div
            initial={{
              opacity:0,
              scale:0.8
            }}
            animate={{
              opacity:1,
              scale:1
            }}
            transition={{
              duration:0.8
            }}
            className="
              relative
            "
          >

            <div className="
              rounded-[3rem]
              overflow-hidden
              shadow-2xl
              border
              border-white
            ">

              <img
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
                alt="Modern Room"
                className="
                  w-full
                  h-[600px]
                  object-cover
                "
              />

            </div>



            {/* Floating Card */}

            <motion.div
              animate={{
                y:[0,-10,0]
              }}
              transition={{
                repeat:Infinity,
                duration:3
              }}
              className="
                absolute
                bottom-8
                left-8
                bg-white
                rounded-3xl
                shadow-xl
                px-6
                py-4
              "
            >

              <p className="text-sm text-gray-500">
                Available Rooms
              </p>

              <h3 className="
                text-2xl
                font-black
                text-blue-600
              ">
                2,500+
              </h3>


            </motion.div>


          </motion.div>


        </div>


      </div>


    </section>
  );
};

export default HeroSection;