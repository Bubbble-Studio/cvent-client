import { useEffect, useState } from "react";
import styles from "./Layout3.module.css";

const Layout3 = ({ mediaType, mediaLink, description, points = [] }) => {
  const [odds, setOdds] = useState([]);
  const [evens, setEvens] = useState([]);

  useEffect(() => {
    const odds = [];
    const evens = [];
    for (let i = 0; i < points.length; i++) {
      if (i % 2 === 0) {
        evens.push(points[i]);
      } else {
        odds.push(points[i]);
      }
    }
    setOdds(odds);
    setEvens(evens);
  }, [points]);
  let url = window.location.origin;
  mediaLink = mediaLink?.replace(/\s/g, "_")?.replace(/_&_/g, "_");
  if (mediaType === "video") {
    url =
      "https://res.cloudinary.com/dmfizkn8b/video/upload/v1699190889/cvent/video/";
  } else {
    url =
      "https://res.cloudinary.com/dmfizkn8b/image/upload/v1699200419/cvent/images/";
  }
  url += mediaLink;
  console.log(mediaLink);
  return (
    <section>
      <div className={styles.mediaContainer}>
        {mediaType === "image" ? (
          <img src={url} alt="media" />
        ) : (
          <video src={url} autoPlay muted loop />
        )}
      </div>
      <div className={styles.descContainer}>
        <p>{description}</p>
        <div className={styles.points}>
          <div className={styles.odds}>
            {odds.map((point, i) => (
              <div key={i}>
                <span>{i === 0 ? 1 : i + 2}</span>
                <p>{point}</p>
              </div>
            ))}
          </div>
          <div className={styles.evens}>
            {evens.map((point, i) => (
              <div key={i}>
                <span>{i + 2}</span>
                <p>{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Layout3;
