import styles from "./Layout1.module.css";

const Layout1 = ({ mediaType, mediaLink, description }) => {
  return (
    <section>
      <div className={styles.mediaContainer}>
        {mediaType === "image" ? (
          <img src={mediaLink} alt="media" />
        ) : (
          <video src={mediaLink} autoPlay muted loop />
        )}
      </div>
      <div className={styles.descContainer}>
        <p>{description}</p>
      </div>
    </section>
  );
};

export default Layout1;
