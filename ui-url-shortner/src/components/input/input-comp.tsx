"use client";
import { useState } from "react";
import ButtonComp from "../button/button";
import styles from "./input-comp.module.css";
import ShortenURLdiv from "../shorten_url/shorten-url_div";

export default function InputComp() {
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [shortenedUrl, setShortenedUrl] = useState<string>("");

  const shortenHandler = async () => {
    const APIresponse = await fetch(
      "https://server-url-shortner.vercel.app/url/shorten",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ originalUrl }),
      }
    );

    if (APIresponse.ok) {
      const data = await APIresponse.json();
      console.log(data);
      console.log(data.data.shortenedUrl);
      setShortenedUrl(data.data.shortenedUrl);
      setOriginalUrl("");
    }
  };

  return (
    <div className={styles.main}>
      <h1>URL Shortner</h1>
      <label htmlFor="urlShortner">Enter URL:</label>
      <input
        type="text"
        name=""
        id="urlShortner"
        placeholder="eg:https://www.youtube.com/watch?v=TIQ5hrfermg"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      />
      <ButtonComp btnlabel={"Shorten"} btnhandler={() => shortenHandler()} />
      {shortenedUrl && <ShortenURLdiv shortenedUrl={shortenedUrl} />}
    </div>
  );
}
