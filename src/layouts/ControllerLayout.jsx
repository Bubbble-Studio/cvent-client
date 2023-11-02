import styles from "./ControllerLayout.module.css";

function Controller(props) {
  return <div className={styles.controller}>{props.children}</div>;
}

export default Controller;
