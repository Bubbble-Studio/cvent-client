import styles from "./Layout0.module.css";

const Layout0 = ({ mediaType, mediaLink }) => {
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
      <div className={styles.mediaContainer}>
        {mediaType === "image" ? (
          <img src={url} alt="media" />
        ) : (
          <video src={url} autoPlay muted loop />
        )}
      </div>
    </section>
  );
};

export default Layout0;
