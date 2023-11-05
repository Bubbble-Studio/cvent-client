import styles from "./Buttons.module.css";

// eslint-disable-next-line react/prop-types
const ButtonGrid = ({ buttons = [], handleClickBtn }) => {
  let columns;

  if (buttons.length === 2) {
    columns = "1fr";
  } else if (buttons.length === 3) {
    columns = "repeat(3, 1fr)";
  } else if (buttons.length === 4) {
    columns = "repeat(2, 1fr)";
  } else {
    // Default fallback for other cases
    columns = "1fr";
  }

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: columns,
    gridGap: "1.5rem", // Adjust as needed
    gridAutoRows: "minmax(50px, auto)", // Adjust as needed
  };

  return (
    <div style={gridStyle}>
      {buttons.map((button) => (
        <button
          key={button.text}
          className={styles.button}
          onClick={() => {
            handleClickBtn(button.next);
          }}
        >
          {button.text}
        </button>
      ))}
    </div>
  );
};

export default ButtonGrid;
