"use client";
import { useState } from "react";
import ButtonComp from "../button/button";
import styles from "./input-comp.module.css";
import ShortenURLdiv from "../shorten_url/shorten-url_div";

export default function InputComp() {
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [shortenedUrl, setShortenedUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false); // Add loading state
  const [error, setError] = useState<string>(""); // State for error message

  const shortenHandler = async () => {
    // Check if the input is empty
    if (!originalUrl.trim()) {
      setError("Please enter a URL to shorten.");
      return;
    }

    setError(""); // Clear previous errors if input is valid
    setIsLoading(true); // Set loading to true when the shortening starts

    try {
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
        console.log("Shortened URL data:", data);
        setShortenedUrl(data.data.shortenedUrl);
        setOriginalUrl(""); // Reset input field
      } else {
        const errorData = await APIresponse.json();
        console.error("Error response:", errorData);
        setError(
          "Sorry, something went wrong while shortening your URL. Please try again."
        );
      }
    } catch (error) {
      console.error("Request error:", error);
      setError(
        "An error occurred while processing your request. Please try again."
      );
    } finally {
      setIsLoading(false); // Set loading to false when the process finishes
    }
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.heading}>URL Shortener</h1>
      <label htmlFor="urlShortner" className={styles.inplabel}>
        Enter a URL to shorten
      </label>
      <input
        className={`${styles.input} ${error ? styles.errorInput : ""}`} // Add error styling to input
        type="text"
        id="urlShortner"
        placeholder="Enter your URL here"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      />

      {/* Error message */}
      {error && <p className={styles.errorText}>{error}</p>}

      <div className={styles.button}>
        <svg
          height="24"
          width="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path
            d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
            fill="currentColor"
          ></path>
        </svg>
        <ButtonComp btnlabel={"Shorten URL"} btnhandler={shortenHandler} />
      </div>

      {/* Loader display during URL shortening */}
      {isLoading && (
        <div className={styles.loader}>
          <div className={styles["loading-text"]}>
            Loading<span className={styles.dot}>.</span>
            <span className={styles.dot}>.</span>
            <span className={styles.dot}>.</span>
          </div>
          <div className={styles["loading-bar-background"]}>
            <div className={styles["loading-bar"]}>
              <div className={styles["white-bars-container"]}>
                <div className={styles["white-bar"]}></div>
                <div className={styles["white-bar"]}></div>
                <div className={styles["white-bar"]}></div>
                <div className={styles["white-bar"]}></div>
                <div className={styles["white-bar"]}></div>
                <div className={styles["white-bar"]}></div>
                <div className={styles["white-bar"]}></div>
                <div className={styles["white-bar"]}></div>
                <div className={styles["white-bar"]}></div>
                <div className={styles["white-bar"]}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Show shortened URL once available */}
      <div className={styles.urlCenter}>
        {shortenedUrl && <ShortenURLdiv shortenedUrl={shortenedUrl} />}
      </div>
    </div>
  );
}
