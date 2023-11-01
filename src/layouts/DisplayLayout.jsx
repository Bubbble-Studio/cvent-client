import styles from "./desktopLayout.module.css";

const DesktopLayout = ({ children }) => {
  return (
    <>
      <div className={styles.desktopLayout}>{children}</div>
      <div className={styles.desktopBG} />
    </>
  );
};

export default DesktopLayout;
