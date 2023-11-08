import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

let resources = [
  "https://res.cloudinary.com/dmfizkn8b/video/upload/v1699264459/cvent/video/Cvent Intro.mp4",
  "https://res.cloudinary.com/dmfizkn8b/video/upload/v1699190889/cvent/video/Attendee Hub.mp4",
  "https://res.cloudinary.com/dmfizkn8b/video/upload/v1699190889/cvent/video/Berichte & Analyse.mp4",
  "https://res.cloudinary.com/dmfizkn8b/video/upload/v1699190889/cvent/video/Check-in & Badging.mp4",
  "https://res.cloudinary.com/dmfizkn8b/video/upload/v1699190889/cvent/video/Cvent Lead Capture.mp4",
  "https://res.cloudinary.com/dmfizkn8b/video/upload/v1699190889/cvent/video/Event Marketing & Webseite.mp4",
  "https://res.cloudinary.com/dmfizkn8b/video/upload/v1699190889/cvent/video/Event Professional.mp4",
  "https://res.cloudinary.com/dmfizkn8b/video/upload/v1699190889/cvent/video/Event Registrierung.mp4",
  "https://res.cloudinary.com/dmfizkn8b/video/upload/v1699190889/cvent/video/Mobile Event Apps.mp4",
  "https://res.cloudinary.com/dmfizkn8b/video/upload/v1699190889/cvent/video/Umfragen & Feedback.mp4",
  "https://res.cloudinary.com/dmfizkn8b/video/upload/v1699190889/cvent/video/Venue Sourcing.mp4",
  "https://res.cloudinary.com/dmfizkn8b/video/upload/v1699190889/cvent/video/Virtuelle Events.mp4",
  "https://res.cloudinary.com/dmfizkn8b/video/upload/v1699190101/cvent/video/Webinare.mp4",
  "https://res.cloudinary.com/dmfizkn8b/video/upload/v1699195127/cvent/video/PASSKEY_GER_FINAL_Approved.mp4",
  "https://res.cloudinary.com/dmfizkn8b/video/upload/v1699195118/cvent/video/CSN_Advertising_German_approved.mp4",
  "https://res.cloudinary.com/dmfizkn8b/video/upload/v1699194171/cvent/video/Cvent_Event_Diagramming_-_german_caps.mp4",
  "https://res.cloudinary.com/dmfizkn8b/video/upload/v1699194160/cvent/video/Response_Automation_-_Overview_Video_German_caps.mp4",
  "https://res.cloudinary.com/dmfizkn8b/video/upload/v1699194152/cvent/video/Instant_Book_GERMAN_approved.mp4",
  "https://res.cloudinary.com/dmfizkn8b/video/upload/v1699194150/cvent/video/GER_Smart_Custom_Proposal_approved.mp4",
  "https://res.cloudinary.com/dmfizkn8b/video/upload/v1699194136/cvent/video/GER_Photo-Realistic_3D_approved.mp4",
  "https://res.cloudinary.com/dmfizkn8b/video/upload/v1699194138/cvent/video/Business_Intelligence_Actionable_Insights_-_Product_Demo_Video_40_sec__v1.0.mp4",
  "https://res.cloudinary.com/dmfizkn8b/video/upload/v1699194132/cvent/video/Planner_Navigator-Overview-German_1_1.mp4",
  "https://res.cloudinary.com/dmfizkn8b/video/upload/v1699194132/cvent/video/Interactive_Floorplans_german_caps.mp4",

  "https://res.cloudinary.com/dmfizkn8b/image/upload/v1699200419/cvent/images/HC_Customer_Value_Wheel_German.png",
  "https://res.cloudinary.com/dmfizkn8b/image/upload/v1699200419/cvent/images/Venue Sourcing.png",
  "https://res.cloudinary.com/dmfizkn8b/image/upload/v1699200419/cvent/images/Check-in & Badging.png",
  "https://res.cloudinary.com/dmfizkn8b/image/upload/v1699200419/cvent/images/Berichte & Analyse.png",
  "https://res.cloudinary.com/dmfizkn8b/image/upload/v1699200419/cvent/images/Webinare.png",
  "https://res.cloudinary.com/dmfizkn8b/image/upload/v1699200419/cvent/images/Event Marketing & Webseite.png",
  "https://res.cloudinary.com/dmfizkn8b/image/upload/v1699200419/cvent/images/Mobile Event Apps.png",
  "https://res.cloudinary.com/dmfizkn8b/image/upload/v1699200419/cvent/images/Umfragen & Feedback.png",
  "https://res.cloudinary.com/dmfizkn8b/image/upload/v1699200419/cvent/images/Virtuelle Events.png",
  "https://res.cloudinary.com/dmfizkn8b/image/upload/v1699200419/cvent/images/Event Registrierung.png",
  "https://res.cloudinary.com/dmfizkn8b/image/upload/v1699200419/cvent/images/Attendee Hub.png",
  "https://res.cloudinary.com/dmfizkn8b/image/upload/v1699200419/cvent/images/Pre-Event Plan and Promote Home Screen.png",
  "https://res.cloudinary.com/dmfizkn8b/image/upload/v1699200419/cvent/images/Cvent Lead Capture.png",
  "https://res.cloudinary.com/dmfizkn8b/image/upload/v1699200419/cvent/images/During Your Event Attendee Engagement Home Screen.jpg",
  "https://res.cloudinary.com/dmfizkn8b/image/upload/v1699200419/cvent/images/Post-Event Spend & Analysis Home Screen.jpg",
  "https://res.cloudinary.com/dmfizkn8b/image/upload/v1699200419/cvent/images/Always on Engagement Digital Touchpoints Home Screen.jpg",
];

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      includeAssets: [
        // "favicon.ico",
        // "robots.txt",
        // "apple-touch-icon.png",
        "cventlogo.png",
        "index.html",
        "/src/main.jsx",
        "/assets/images/bg.png",
        "/assets/images/controllerbg.png",
        "/assets/images/controllerbg1.png",
        "/assets/images/cventlogo.svg",
        ...Array.from(new Set(resources))
          .map((url) => url.replace(/\s/g, "_"))
          .map((url) => url.replace(/_&_/g, "_")),
      ], // make sure to list all static assets you want to cache
      manifest: {
        name: "CVENT",
        short_name: "CVENT",
        description: "CVENT Kiosk",
        start_url: ".",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "cventlogo.png",
            sizes: "192x192",
            type: "image/png",
          },
          // Include other sizes as needed
        ],
        display_override: ["standalone"],
        scope: "/",
        orientation: "landscape",
      },
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: "/index.html",
      },
    },
    output: {
      publicPath: "/",
    },
  },
  server: {
    base: "./",
  },
  // Additional configuration for your service worker
  // serviceWorker: {
  //   src: "src/sw.js",
  //   // Specify the destination of the service worker file
  //   swDest: "dist/sw.js",
  //   // Configure the files to be precached
  //   globDirectory: "dist",
  //   globPatterns: ["**/*.{js,css,html,png,jpg}"],
  // },
});
