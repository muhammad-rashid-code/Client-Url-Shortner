"use client";

import { APIroute, BASE_URL } from "@/constants/apiRoutes";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

interface UrlData {
  originalUrl: string;
  shortUrl: string; // Ensure this is only the short code (e.g., "c60ef7")
}

export default function RootPageURLS() {
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [isloading, setIsloading] = useState<boolean>(false);
  const [allUrls, setAllUrls] = useState<UrlData[]>([]);
  const [sucessMessage, setSucessMessage] = useState<string>("");

  const APIpost = async () => {
    setIsloading(true);
    setOriginalUrl("");
    try {
      const APIresponse = await fetch(APIroute.postUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl }),
      });

      if (!APIresponse.ok) {
        throw new Error(`HTTP error! Status: ${APIresponse.status}`);
      }

      const dataAPI = await APIresponse.json();
      console.log(dataAPI);

      if (APIresponse.ok) {
        setIsloading(false);
        setShortUrl(dataAPI.data.shortUrl);
        setSucessMessage(dataAPI.message);
        console.log(dataAPI.data.shortUrl, "line 38");

        // Update allUrls in real-time
        setAllUrls((prevUrls) => {
          const newUrl = {
            originalUrl: dataAPI.data.originalUrl,
            shortUrl: dataAPI.data.shortUrl,
          };
          console.log("New URL added:", newUrl); // Log only the newly added URL
          return [...prevUrls, newUrl];
        });
      }
    } catch (error) {
      console.error("Error while shortening URL:", error);
      setIsloading(false);
    }
  };

  const APIget = async () => {
    try {
      const APIresponse = await fetch(APIroute.getUrl);

      if (!APIresponse.ok) {
        throw new Error(`HTTP error! Status: ${APIresponse.status}`);
      }

      const dataResponse = await APIresponse.json();
      console.log(dataResponse.data);
      setAllUrls(dataResponse.data);
      console.log(dataResponse, "line 66");
    } catch (error) {
      console.error(
        "Error fetching data:",
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  };

  useEffect(() => {
    APIget();
  }, []);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.inputContainer}>
          <label htmlFor="urlsinput" className={styles.urlLabel}>
            Enter URL:
          </label>
          <input
            className={styles.urlInput}
            type="text"
            id="urlsinput"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder={"Enter URL Having SSL || https"}
          />
          <button onClick={APIpost} className={styles.button}>
            {isloading ? "Shortning. . ." : "Shorten"}
          </button>

          <div className="urlContainer">
            {shortUrl && (
              <a href={`${shortUrl}`} target="_blank" rel="noopener noreferrer">
                {`${shortUrl}`}
              </a>
            )}
            {sucessMessage && <p>{sucessMessage}</p>}
          </div>
        </div>
        <ol className={styles.allUrls}>
          {allUrls &&
            allUrls.map((url, index) => (
              <li key={url.originalUrl + index}>
                <a
                  href={`${BASE_URL}/${url.shortUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`${BASE_URL}/${url.shortUrl}`}
                </a>
              </li>
            ))}
        </ol>
      </div>
    </>
  );
}
