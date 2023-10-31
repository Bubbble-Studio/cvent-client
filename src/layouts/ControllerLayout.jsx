import React from "react";
import styles from "./ControllerLayout.module.css";
const ControllerLayout = ({ children }) => {
  return <div className={styles.controllerLayout}>{children}</div>;
};

export default ControllerLayout;
