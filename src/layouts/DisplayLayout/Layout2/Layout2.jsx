import styles from "./Layout2.module.css";

const Layout2 = ({ mediaType, mediaLink, description, sideDescription }) => {
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
  return (
    <section>
      <div className={styles.upperContainer}>
        <div className={styles.mediaContainer}>
          {mediaType === "image" ? (
            <img src={url} alt="media" />
          ) : (
            <video src={url} autoPlay muted loop />
          )}
        </div>
        <div className={styles.sideDescContainer}>
          <p>{description}</p>
        </div>
      </div>
      <div className={styles.descContainer}>
        <p>{sideDescription}</p>
      </div>
    </section>
  );
};

export default Layout2;
