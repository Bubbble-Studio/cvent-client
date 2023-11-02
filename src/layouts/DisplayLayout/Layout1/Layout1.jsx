import styles from "./Layout1.module.css";

const Layout1 = ({ mediaType, mediaLink, description }) => {
  let url = window.location.origin;
  if (mediaType === "video") {
    url += "/assets/video/";
  } else {
    url += "/assets/images/";
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
