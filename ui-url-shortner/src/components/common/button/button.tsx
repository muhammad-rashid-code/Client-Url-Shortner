import styles from "./button.module.css";
type ButtonType = { btnLabel: string; btnHanler: () => void };
export default function ButtonComp({ btnHanler, btnLabel }: ButtonType) {
  return (
    <button
      className={styles.btnMain}
      onClick={() => {
        btnHanler();
      }}
    >
      {btnLabel}
    </button>
  );
}
