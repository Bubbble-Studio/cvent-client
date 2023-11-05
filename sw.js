self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-cache").then((cache) => {
      let videoResource = [
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
        // "https://res.cloudinary.com/dmfizkn8b/video/upload/v1699190889/cvent/video/Webinare.mp4",
        "https://res.cloudinary.com/dmfizkn8b/video/upload/v1699190101/cvent/video/Webinare.mp4",
      ];
      //make a regex of the url to replace space with _
      videoResource = videoResource
        .map((url) => url.replace(/\s/g, "_"))
        .map((url) => url.replace(/_&_/g, "_"));
      console.log(videoResource);
      return cache
        .addAll([
          "index.html",
          "/src/main.jsx",
          "/public/assets/images/bg.png",
          "/public/assets/images/controllerbg.png",
          // "/public/assets/video/Attendee Hub.mp4",
          // "/public/assets/video/Berichte & Analyse.mp4",
          // "/public/assets/video/Check-in & Badging.mp4",
          // "/public/assets/video/Cvent Lead Capture.mp4",
          // "/public/assets/video/Event Marketing & Webseite.mp4",
          // "/public/assets/video/Event Professional.mp4",
          // "/public/assets/video/Event Registrierung.mp4",
          // "/public/assets/video/Mobile Event Apps.mp4",
          // "/public/assets/video/Umfragen & Feedback.mp4",
          // "/public/assets/video/Venue Sourcing.mp4",
          // "/public/assets/video/Virtuelle Events.mp4",
          // "/public/assets/video/Webinare.mp4",
          ...videoResource,
          // Add other assets you want to cache
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
