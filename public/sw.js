self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-cache").then((cache) => {
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
      //make a regex of the url to replace space with _
      resources = Array.from(new Set(resources))
        .map((url) => url.replace(/\s/g, "_"))
        .map((url) => url.replace(/_&_/g, "_"));
      console.log(resources);
      return cache
        .addAll([
          "index.html",
          "/src/main.jsx",
          "/public/assets/images/bg.png",
          "/public/assets/images/controllerbg.png",
          "/public/assets/images/controllerbg1.png",
          "/public/assets/images/cventlogo.svg",
          ...resources,
        ])
        .then((data) => {
          console.log(data, "Assets added to cache");
        })
        .catch((err) => {
          console.log(err);
        });
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // console.log(response, event);
        return response || fetch(event.request);
      })
      .catch((err) => {
        console.log(err);
      })
  );
});
