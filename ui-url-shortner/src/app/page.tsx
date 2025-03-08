import InputComp from "@/components/input/input-comp";
import styles from "./page.module.css";
import HistoryComp from "@/components/history/history";

export default function Rootpage() {
  return (
    <div className={styles.main}>
      {/* Adding specific classes to each component */}
      <div className={styles.inputComponent}>
        <InputComp />
      </div>
      <div className={styles.historyComponent}>
        <HistoryComp />
      </div>
    </div>
  );
}
