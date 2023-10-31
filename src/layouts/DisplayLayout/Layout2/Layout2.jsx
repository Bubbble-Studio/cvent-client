import styles from "./Layout2.module.css";

const Layout2 = ({ mediaType, mediaLink, description, sideDescription }) => {
  return (
    <section>
      <div className={styles.upperContainer}>
        <div className={styles.mediaContainer}>
          {mediaType === "image" ? (
            <img src={mediaLink} alt="media" />
          ) : (
            <video src={mediaLink} autoPlay muted loop />
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
