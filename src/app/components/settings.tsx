"use client";
import { useState, useEffect } from "react";
import Button from "./button";

export default function Settings() {
  const [firstButtonActive, setFirstButtonActive] = useState(true); // Default to true
  const [secondButtonActive, setSecondButtonActive] = useState(true); // Default to true

  useEffect(() => {
    const savedFirstButtonState = localStorage.getItem("autoOpenResponses");
    const savedSecondButtonState = localStorage.getItem("preview");

    if (savedFirstButtonState !== null) {
      setFirstButtonActive(JSON.parse(savedFirstButtonState));
    } else {
      localStorage.setItem("autoOpenResponses", JSON.stringify(true)); // Set default true if not found
    }

    if (savedSecondButtonState !== null) {
      setSecondButtonActive(JSON.parse(savedSecondButtonState));
    } else {
      localStorage.setItem("preview", JSON.stringify(true)); // Set default true if not found
    }
  }, []);

  const toggleFirstButton = () => {
    const newState = !firstButtonActive;
    setFirstButtonActive(newState);
    localStorage.setItem("autoOpenResponses", JSON.stringify(newState));
  };

  const toggleSecondButton = () => {
    const newState = !secondButtonActive;
    setSecondButtonActive(newState);
    localStorage.setItem("preview", JSON.stringify(newState));
  };

  return (
    <section className="bg-black text-[#B2B2B2] font-semibold flex items-center justify-between px-5 border-[2px] border-[#171717] rounded-[28px] h-[3.263rem]">
      <h1 className="font-bold text-[0.938rem]">Settings</h1>

      <Button onClick={toggleFirstButton} className="cursor-pointer">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="16" height="16" fill="white" fillOpacity="0.01" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.27642 0.0430443C9.50247 0.139774 9.63311 0.378514 9.59268 0.621051L8.62952 6.40001H13.3333C13.5352 6.40001 13.72 6.51414 13.8103 6.69484C13.9007 6.87552 13.8812 7.09173 13.7599 7.25334L7.35994 15.7867C7.21242 15.9834 6.94953 16.0537 6.72347 15.957C6.49742 15.8603 6.36678 15.6215 6.40721 15.379L7.37037 9.6H2.66663C2.46463 9.6 2.27995 9.48587 2.18961 9.30518C2.09927 9.1245 2.11876 8.90828 2.23996 8.74667L8.63994 0.213374C8.78747 0.0166672 9.05036 -0.0536855 9.27642 0.0430443ZM3.7333 8.53334H7.99994C8.15672 8.53334 8.30555 8.60231 8.40689 8.72194C8.50822 8.84156 8.55179 8.99971 8.52602 9.15435L7.81893 13.3969L12.2666 7.46668H7.99994C7.84318 7.46668 7.69434 7.3977 7.593 7.27808C7.49167 7.15845 7.44809 7.00031 7.47387 6.84566L8.18097 2.60311L3.7333 8.53334Z"
            fill={firstButtonActive ? "yellow" : "#1C2024"}
          />
        </svg>
        Auto open responses
      </Button>

      <Button onClick={toggleSecondButton} className="cursor-pointer">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="16" height="16" fill="white" fillOpacity="0.01" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.77445 0.850038C7.9174 0.783325 8.08257 0.783325 8.22552 0.850038L14.6255 3.83671C14.8133 3.92433 14.9333 4.11279 14.9333 4.32V11.68C14.9333 11.8873 14.8133 12.0756 14.6255 12.1633L8.22552 15.15C8.08257 15.2166 7.9174 15.2166 7.77445 15.15L1.37445 12.1633C1.18667 12.0756 1.06665 11.8873 1.06665 11.68V4.32C1.06665 4.11279 1.18667 3.92433 1.37445 3.83671L7.77445 0.850038ZM2.13332 5.12617L7.46665 7.39284V13.8292L2.13332 11.3404V5.12617ZM8.53332 13.8292L13.8667 11.3404V5.12617L8.53332 7.39284V13.8292ZM7.99998 6.4605L13.09 4.29724L7.99998 1.92188L2.90995 4.29724L7.99998 6.4605Z"
            fill={secondButtonActive ? "blue" : "#1C2024"}
          />
        </svg>
        Preview
      </Button>
    </section>
  );
}
