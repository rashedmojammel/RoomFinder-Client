// // import { betterAuth } from "better-auth";
// // import { mongodbAdapter } from "better-auth/adapters/mongodb";
// // import { MongoClient } from "mongodb";
// // import { admin } from "better-auth/plugins";


// // const client = new MongoClient(process.env.MONGODB_URI!);

// // const db = client.db("roomfinder");


// // export const auth = betterAuth({

// //   database: mongodbAdapter(db, {
// //     client,
// //   }),


// //   emailAndPassword: {
// //     enabled: true,
// //   },


// //   socialProviders: {

// //     google: {
// //       clientId: process.env.GOOGLE_CLIENT_ID!,
// //       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
// //     },

// //   },


// //   plugins: [
// //     admin(),
// //   ],


// // //   user: {

// // //     additionalFields: {

// // //       role: {
// // //         type: "string",
// // //         defaultValue: "tenant",
// // //         required: false,
// // //       },

// // //     },

// // //   },
// // user: {
// //     additionalFields: {
// //       userRole: {
// //         defaultValue: "tenant",
// //         type: "string",
// //         input: true,
// //       },
// //     },
// //   },


// //   trustedOrigins: [
// //     process.env.NEXT_PUBLIC_APP_URL!,
// //   ],


// // });
// import dns from "node:dns";
// dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import { admin } from "better-auth/plugins";

// const client = new MongoClient(process.env.MONGODB_URI!);
// const db = client.db(process.env.AUTH_DB_NAME);

// export const auth = betterAuth({
//   trustedOrigins: [process.env.BETTER_AUTH_URL!],
//   emailAndPassword: {
//     enabled: true,
//   },
//   account: {
//     accountLinking: {
//       enabled: true,
//       trustedProviders: ["google"],
//     },
//   },

//   // socialProviders: {
//   //   google: {
//   //     clientId: process.env.GOOGLE_CLIENT_ID,
//   //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   //   },
//   // },

//   database: mongodbAdapter(db, {
//     client,
//   }),

//   user: {
//     additionalFields: {
//       userRole: {
//         defaultValue: "tenant",
//         type: "string",
//         input: true,
//       },
//     },
//   },

//   // databaseHooks: {
//   //   user: {
//   //     before: async (user) => {
//   //       const role = user.userRole;

//   //       return {
//   //         ...user,
//   //         userRole: role || "tenant",
//   //       };
//   //     },
//   //   },
//   // },

//   // session : {
//   //   cookieCache :{
//   //     enabled : true,
//   //     strategy : "jwt",
//   //     maxAge : 60 * 60 * 24 * 7, // 7 days

//   //   }
//   // },

//   plugins: [
//     admin(),
//     // jwt()
//   ],
// });

import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin, jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
  trustedOrigins: [process.env.BETTER_AUTH_URL!],
  emailAndPassword: {
    enabled: true,
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },

  socialProviders: {
    // google: {
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // },
  },

  database: mongodbAdapter(db, {
    client,
  }),

  user: {
    additionalFields: {
      userRole: {
        defaultValue: "tenant",
        type: "string",
        input: true,
      },
    },
  },

  plugins: [
    admin(),
    jwt({
      jwt: {
        // What the Express backend will see inside the verified token
        definePayload: ({ user }) => ({
          id: user.id,
          email: user.email,
          name: user.name,
          userRole: (user as { userRole?: string }).userRole ?? "tenant",
        }),
        expirationTime: "15m",
      },
    }),
  ],
});