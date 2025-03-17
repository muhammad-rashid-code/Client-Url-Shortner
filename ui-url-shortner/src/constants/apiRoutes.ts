// // Base URLs
// const localHost = "http://localhost:4000/";
// const liveHost = "https://server-url-shortner.vercel.app/";

// // Environment-specific base URL
// const isLocal = process.env.NODE_ENV === "development"; // Check if running locally
// const BASE_URL = isLocal ? localHost : liveHost;

// // API Endpoints
// const API_ENDPOINTS = {
//   HISTORY: "url/red/history", // Endpoint for fetching URL history
// };

// // Construct full API routes
// export const APIroute = {
//   getUrl: BASE_URL + API_ENDPOINTS.HISTORY, // Full URL for fetching history
// };

// const localHost = "http://localhost:4000/";
// const liveHost = "https://server-url-shortner.vercel.app/";

// const isLocal = process.env.NODE_ENV === "development"; // Check if running locally
// const BASE_URL = isLocal ? localHost : liveHost;

// export const APIroute = {
//   getUrl: BASE_URL + "url/red/history",
//   postUrl: BASE_URL + "url/shorten",
// };

const BASE_URL = "http://localhost:4000/";

export const APIroute = {
  getUrl: BASE_URL + "url/red/history",
  postUrl: BASE_URL + "url/shorten",
};
