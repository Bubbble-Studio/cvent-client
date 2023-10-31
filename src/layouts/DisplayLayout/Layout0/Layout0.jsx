import styles from "./Layout0.module.css";

const Layout0 = ({ mediaType, mediaLink }) => {
  return (
    <section>
      <div className={styles.mediaContainer}>
        {mediaType === "image" ? (
          <img src={mediaLink} alt="media" />
        ) : (
          <video src={mediaLink} autoPlay muted loop />
        )}
      </div>
    </section>
  );
};

export default Layout0;
