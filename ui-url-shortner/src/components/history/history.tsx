"use client";
import React, { useEffect, useState } from "react";
import styles from "./history.module.css"; // Assuming your CSS module is here

interface URLData {
  originalUrl: string;
  shortenedUrl: string;
}

export default function HistoryComp() {
  const [urls, setUrls] = useState<URLData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1); // To manage the current page
  const [perPage] = useState<number>(10); // Items per page

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        console.log("Fetching shortened URLs...");

        const response = await fetch(
          "https://server-url-shortner.vercel.app/url/red/history"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch URLs");
        }

        const data = await response.json();
        console.log("Data received:", data);

        if (data?.status === false || !Array.isArray(data?.data?.urls)) {
          setError("Unexpected data structure or no URLs found.");
        } else {
          setUrls(data.data.urls);
        }
      } catch (err: unknown) {
        console.error("Error fetching URLs:", err);
        if (err instanceof Error) {
          setError(err.message || "An error occurred while fetching URLs");
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
        console.log("Data fetching completed.");
      }
    };

    fetchUrls();
  }, []);

  // Get the current page's URLs
  const indexOfLastUrl = currentPage * perPage;
  const indexOfFirstUrl = indexOfLastUrl - perPage;

  // If on the first page, show only 3 URLs
  const currentUrls = currentPage === 1 ? urls.slice(0, 3) : urls.slice(indexOfFirstUrl, indexOfLastUrl);

  // Handle next and previous page clicks
  const nextPage = () => {
    if (currentPage < Math.ceil(urls.length / perPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.main}>
      <h2>Your Shortened URLs</h2>

      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <ul className={styles.urlList}>
        {currentUrls.length > 0 ? (
          currentUrls.map((url, index) => (
            <li key={index} className={styles.urlItem}>
              <div className={styles.urlDetails}>
                <span className={styles.originalUrl}>{url.originalUrl}</span>
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
          <li>No shortened URLs found.</li>
        )}
      </ul>

      {/* Pagination controls */}
      <div className={styles.pagination}>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(urls.length / perPage)}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(urls.length / perPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
