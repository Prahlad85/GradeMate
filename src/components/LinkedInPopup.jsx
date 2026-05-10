// LinkedInPopup.jsx
import React, { useEffect, useState } from "react";

const LinkedInPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("linkedin-popup");

    if (!alreadyShown) {
      setTimeout(() => {
        setShow(true);
      }, 1200);
    }
  }, []);

  const handleConnect = () => {
    sessionStorage.setItem("linkedin-popup", "true");

    window.open(
      "https://www.linkedin.com/in/er.prahlad",
      "_blank"
    );

    setShow(false);
  };

  const handleClose = () => {
    sessionStorage.setItem("linkedin-popup", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      
      <div
        className="relative w-full max-w-md rounded-2xl border border-blue-500/20
        bg-[#0f172a] p-8 text-white shadow-2xl
        animate-[popup_0.5s_ease]"
      >
        
        {/* Glow */}
        <div className="absolute inset-0 rounded-2xl bg-blue-500/10 blur-3xl"></div>

        {/* Content */}
        <div className="relative z-10 text-center">
          
          {/* Icon */}
          <div
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center
            rounded-2xl bg-gradient-to-br from-blue-500 to-sky-400
            shadow-[0_0_25px_rgba(59,130,246,0.7)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M8.34 17V10.66H6.16V17H8.34M7.25 9.73A1.27 1.27 0 1 0 7.25 7.19A1.27 1.27 0 0 0 7.25 9.73M17.84 17V13.5C17.84 11.63 16.84 10.56 15.5 10.56C14.42 10.56 13.94 11.16 13.67 11.58V10.66H11.5C11.53 11.27 11.5 17 11.5 17H13.67V13.46C13.67 13.27 13.68 13.08 13.74 12.94C13.89 12.56 14.23 12.16 14.81 12.16C15.57 12.16 15.88 12.74 15.88 13.59V17H17.84Z" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold">
            Let’s Connect on LinkedIn
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-gray-300">
            Stay connected for new projects, updates, and opportunities.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col gap-3">
            
            <button
              onClick={handleConnect}
              className="group relative overflow-hidden rounded-xl
              bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700
              px-5 py-3 font-semibold text-white
              shadow-[0_0_20px_rgba(59,130,246,0.5)]
              transition-all duration-300 hover:scale-[1.03]"
            >
              <span className="relative z-10">
                Connect on LinkedIn
              </span>

              <span
                className="absolute inset-0 -translate-x-full
                bg-white/20 skew-x-12
                transition-transform duration-1000
                group-hover:translate-x-full"
              ></span>
            </button>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedInPopup;