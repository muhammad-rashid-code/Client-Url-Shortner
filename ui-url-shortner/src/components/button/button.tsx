"use client";
import styles from "./button.module.css"; // Import your button styles

type ButtonType = { btnlabel: string; btnhandler: () => void };

export default function ButtonComp({ btnlabel, btnhandler }: ButtonType) {
  return (
    <button className={styles.button} onClick={btnhandler}>
      {btnlabel}
    </button>
  );
}
