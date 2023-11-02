self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-cache").then((cache) => {
      return cache
        .addAll([
          "index.html",
          "/src/main.jsx",
          "/public/assets/images/bg.png",
          "/public/assets/images/controllerbg.png",
          "/public/assets/video/Attendee Hub.mp4",
          "/public/assets/video/Berichte & Analyse.mp4",
          "/public/assets/video/Check-in & Badging.mp4",
          "/public/assets/video/Cvent Lead Capture.mp4",
          "/public/assets/video/Event Marketing & Webseite.mp4",
          "/public/assets/video/Event Professional.mp4",
          "/public/assets/video/Event Registrierung.mp4",
          "/public/assets/video/Mobile Event Apps.mp4",
          "/public/assets/video/Umfragen & Feedback.mp4",
          "/public/assets/video/Venue Sourcing.mp4",
          "/public/assets/video/Virtuelle Events.mp4",
          "/public/assets/video/Webinare.mp4",
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
