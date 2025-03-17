"use client";

import ButtonComp from "@/components/common/button/button";

export default function Rootpage() {
  const increase = () => {
    console.log("good");
  };
  return (
    <>
      <div>
        <ButtonComp 
          btnLabel={"submit"}
          btnHanler={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    </>
  );
}
