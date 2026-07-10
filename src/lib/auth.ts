import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { admin } from "better-auth/plugins";


const client = new MongoClient(process.env.MONGODB_URI!);

const db = client.db("roomfinder");


export const auth = betterAuth({

  database: mongodbAdapter(db, {
    client,
  }),


  emailAndPassword: {
    enabled: true,
  },


  socialProviders: {

    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },

  },


  plugins: [
    admin(),
  ],


//   user: {

//     additionalFields: {

//       role: {
//         type: "string",
//         defaultValue: "tenant",
//         required: false,
//       },

//     },

//   },
user: {
    additionalFields: {
      userRole: {
        defaultValue: "tenant",
        type: "string",
        input: true,
      },
    },
  },


  trustedOrigins: [
    process.env.NEXT_PUBLIC_APP_URL!,
  ],


});