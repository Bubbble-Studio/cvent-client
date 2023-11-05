import styles from "./Layout1.module.css";

const Layout1 = ({ mediaType, mediaLink, description }) => {
  let url = window.location.origin;
  mediaLink = mediaLink?.replace(/_&_/g, "_")?.replace(/\s/g, "_");
  if (mediaType === "video") {
    url =
      "https://res.cloudinary.com/dmfizkn8b/video/upload/v1699190889/cvent/video/";
  } else {
    url =
      "https://res.cloudinary.com/dmfizkn8b/image/upload/v1699200419/cvent/images/";
  }
  url += mediaLink;
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
      </div>
    </section>
  );
};

export default Layout1;
