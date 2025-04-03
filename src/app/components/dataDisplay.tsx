import { useRef, useState, useEffect } from "react";
import { useDataContext } from "../context/dataContext";

export default function DatabaseDisplay() {
  const { data } = useDataContext();
  const tableRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const shouldAutoOpen = localStorage.getItem("autoOpenResponses") === "true";

  const openFullscreen = () => {
    if (tableRef.current && !document.fullscreenElement) {
      tableRef.current
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch((err) => console.error(`Fullscreen error: ${err.message}`));
    }
  };
  const exitFullscreen = () => {
    document.exitFullscreen();
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (shouldAutoOpen && data?.data?.length) {
      openFullscreen();
    }
  }, [data, shouldAutoOpen]);

  return (
    <section
      ref={tableRef}
      className="relative h-5/6 max-h-[620px] w-full bg-black rounded-[28px] border-[2px] border-[#171717] overflow-auto custom-scrollbar"
    >
      <div className="bg-gradient-to-r from-[#121212] to-[#0C0C0C] h-[2.375rem] text-[#9E9E9E] flex items-center w-full justify-between px-5 font-semibold border-b-[2px] border-[#171717] rounded-t-[28px]">
        <h1 className="text-[0.938rem]">Data</h1>
        {!isFullscreen ? (
          <div
            className="flex items-center text-[0.5rem] gap-x-1 cursor-pointer hover:text-white transition"
            onClick={openFullscreen}
          >
            <p>Open in fullscreen</p>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.13332 3.73333C2.13332 3.43878 2.3721 3.2 2.66665 3.2H13.3333C13.6278 3.2 13.8667 3.43878 13.8667 3.73333V10.1333C13.8667 10.4279 13.6278 10.6667 13.3333 10.6667H2.66665C2.3721 10.6667 2.13332 10.4279 2.13332 10.1333V3.73333ZM2.13332 11.6422C1.51188 11.4226 1.06665 10.83 1.06665 10.1333V3.73333C1.06665 2.84967 1.78299 2.13333 2.66665 2.13333H13.3333C14.2169 2.13333 14.9333 2.84967 14.9333 3.73333V10.1333C14.9333 10.83 14.4881 11.4226 13.8667 11.6422V12.2667C13.8667 13.1503 13.1503 13.8667 12.2667 13.8667H3.73332C2.84966 13.8667 2.13332 13.1503 2.13332 12.2667V11.6422ZM12.8 11.7333V12.2667C12.8 12.5612 12.5612 12.8 12.2667 12.8H3.73332C3.43877 12.8 3.19998 12.5612 3.19998 12.2667V11.7333H12.8Z"
                fill="#1C2024"
              />
            </svg>
          </div>
        ) : null}
      </div>

      <section>
        {data && data.data ? (
          <table className="w-full">
            <thead className="sticky top-0 bg-black text-white font-semibold text-sm">
              <tr>
                <th className="px-4 py-2 border-b border-[#171717]">
                  Course Code
                </th>
                <th className="px-4 py-2 border-b border-[#171717]">
                  Course Name
                </th>
                <th className="px-4 py-2 border-b border-[#171717]">Credits</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map(([code, name, credits], index) => (
                <tr key={index} className="odd:bg-transparent text-[#9E9E9E]">
                  <td className="border border-[#171717] px-4 py-2 font-semibold">
                    {code.trim()}
                  </td>
                  <td className="px-4 py-2 border border-[#171717]">{name}</td>
                  <td className="border border-[#171717] px-4 py-2">
                    {credits}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-[#9E9E9E] font-semibold text-sm pt-5">
            Waiting for data
          </p>
        )}
      </section>

      {isFullscreen && (
        <button
          className="absolute top-0 right-5 flex items-center bg-[#0C0C0C] text-[#9E9E9E] hover:text-white border border-[#171717] px-3 py-1.5 rounded-md text-sm transition-all"
          onClick={exitFullscreen}
        >
          Exit Fullscreen
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="pt-1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="16" height="16" fill="white" fill-opacity="0.01" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.567 4.30032C12.8066 4.0608 12.8066 3.67246 12.567 3.43294C12.3276 3.19342 11.9392 3.19342 11.6997 3.43294L8.00006 7.13258L4.30042 3.43294C4.06089 3.19342 3.67255 3.19342 3.43303 3.43294C3.19351 3.67246 3.19351 4.0608 3.43303 4.30032L7.13268 7.99997L3.43303 11.6996C3.19351 11.9392 3.19351 12.3274 3.43303 12.567C3.67255 12.8065 4.06089 12.8065 4.30042 12.567L8.00006 8.86735L11.6997 12.567C11.9392 12.8065 12.3276 12.8065 12.567 12.567C12.8066 12.3274 12.8066 11.9392 12.567 11.6996L8.86744 7.99997L12.567 4.30032Z"
              fill="#1C2024"
            />
          </svg>
        </button>
      )}
    </section>
  );
}
