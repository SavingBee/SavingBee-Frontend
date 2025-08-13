/**
 * .env --- VITE_USE_MOCK 값으로 제어
 */
// if (import.meta.env.VITE_USE_MOCK !== "0") {
//   const { worker } = await import("./mocks/browser");
//   await worker.start({
//     serviceWorker: { url: "/mockServiceWorker.js" }, // public 내에 위치
//     //정의 안 된 API 처리 -> 실제 네트워크로
//     // onUnhandledRequest: 'bypass',
//   });
// }

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
