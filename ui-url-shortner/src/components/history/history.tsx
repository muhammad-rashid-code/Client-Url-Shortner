"use client";
import React, { useEffect, useState } from "react";
import styles from "./history.module.css"; // Assuming you have styles defined in this CSS module

export default function HistoryComp({ className }: { className?: string }) {
  // State variables
  const [urls, setUrls] = useState<any[]>([]); // Holds the list of shortened URLs
  const [loading, setLoading] = useState<boolean>(true); // Loading state while fetching data
  const [error, setError] = useState<string | null>(null); // Error state for handling fetch issues

  // Fetch shortened URLs when the component mounts
  useEffect(() => {
    const fetchUrls = async () => {
      try {
        console.log("Fetching shortened URLs...");

        // Make the API request to get shortened URLs
        const response = await fetch(
          "https://server-url-shortner.vercel.app/url/history"
        ); // Replace with your actual API URL

        // Check for successful response
        if (!response.ok) {
          throw new Error("Failed to fetch URLs");
        }

        // Parse the JSON response
        const data = await response.json();
        console.log("Data received:", data);

        // Validate the data structure before updating state
        if (data?.status === false && data?.data?.urls) {
          setUrls(data.data.urls); // Update state with URLs
        } else {
          throw new Error("Unexpected data structure or empty URLs");
        }
      } catch (err: any) {
        console.error("Error fetching URLs:", err);
        setError(err.message || "An error occurred while fetching URLs");
      } finally {
        setLoading(false); // Set loading to false after the fetch process completes
        console.log("Data fetching completed.");
      }
    };

    fetchUrls(); // Call the fetch function
  }, []); // The empty dependency array ensures the effect runs once after the component mounts

  return (
    <div className={`${styles.main} ${className}`}>
      <h2>Your Shortened URLs</h2>

      {/* Show loading state while data is being fetched */}
      {loading && <p>Loading...</p>}

      {/* Show error message if something went wrong during fetch */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Render the list of shortened URLs */}
      <ul className={styles.urlList}>
        {urls.length > 0 ? (
          urls.map((url, index) => (
            <li key={index} className={styles.urlItem}>
              <div className={styles.urlDetails}>
                {/* Display the original URL */}
                <span className={styles.originalUrl}>{url.originalUrl}</span>
                {/* Display the shortened URL as a clickable link */}
                <span className={styles.shortenedUrl}>
                  <a
                    href={`/${url.shortenedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {url.shortenedUrl}
                  </a>
                </span>
              </div>
            </li>
          ))
        ) : (
          // Message when no shortened URLs are available
          <li>No shortened URLs found.</li>
        )}
      </ul>
    </div>
  );
}
