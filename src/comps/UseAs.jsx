import styles from "./UseAs.module.css";

const UseAs = ({ handleClickBtn }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2>Use As</h2>
        <div className={styles.btns}>
          <button
            onClick={() => {
              handleClickBtn("display");
            }}
            className={styles.displayBtn}
          >
            Display Device
          </button>
          <button
            onClick={() => {
              handleClickBtn("controller");
            }}
            className={styles.controllerBtn}
          >
            Controller Device
          </button>
        </div>
      </div>
    </div>
  );
};

export default UseAs;
