import styles from "./ControllerLayout.module.css";

function Controller(props) {
  return (
    <>
      <div className={styles.controller}>{props.children}</div>
      <video
        src="/assets/video/IMEX_BG.mp4"
        autoPlay
        muted
        className={styles.BGvideo}
      ></video>
    </>
  );
}

export default Controller;
