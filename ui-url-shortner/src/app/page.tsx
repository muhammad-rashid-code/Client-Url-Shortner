import InputComp from "@/components/input/input-comp";
import styles from "./page.module.css";

export default function Rootpage() {
  return (
    <>
      <div className={styles.main}>
        <InputComp />
      </div>
    </>
  );
}
