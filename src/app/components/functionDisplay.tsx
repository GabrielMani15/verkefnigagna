"use client";
import CallableDisplay from "./callabledisplay";
import { useState } from "react";
import { crudOperations } from "../libs/crudOperations";

export default function FunctionDisplay() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Courses");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  const selectedOperations = crudOperations[selectedItem];

  return (
    <section className="bg-black text-[#8A8A8A] h-fit font-semibold my-2">
      <div className="bg-gradient-to-r from-[#121212] to-[#0C0C0C] flex justify-between py-2 px-10 items-center rounded-[8px]">
        <div className="bg-black px-4 py-1 rounded-[5px]">Functions</div>
        <div className="relative">
          <div
            className="flex gap-x-1 items-center cursor-pointer select-none"
            onClick={toggleDropdown}
          >
            {selectedItem}
            <svg
              width="14"
              height="12"
              viewBox="0 0 14 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="14" height="12" fill="white" fillOpacity="0.01" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.04995 2.00001C8.04995 2.49706 7.57985 2.90001 6.99995 2.90001C6.42005 2.90001 5.94995 2.49706 5.94995 2.00001C5.94995 1.50295 6.42005 1.10001 6.99995 1.10001C7.57985 1.10001 8.04995 1.50295 8.04995 2.00001ZM8.04995 6.00001C8.04995 6.49706 7.57985 6.90001 6.99995 6.90001C6.42005 6.90001 5.94995 6.49706 5.94995 6.00001C5.94995 5.50295 6.42005 5.10001 6.99995 5.10001C7.57985 5.10001 8.04995 5.50295 8.04995 6.00001ZM6.99995 10.9C7.57985 10.9 8.04995 10.497 8.04995 10C8.04995 9.50297 7.57985 9.10001 6.99995 9.10001C6.42005 9.10001 5.94995 9.50297 5.94995 10C5.94995 10.497 6.42005 10.9 6.99995 10.9Z"
                fill="#808080"
                fillOpacity="0.55"
              />
            </svg>
          </div>

          {isOpen && (
            <div className="absolute top-full left-0 mt-1 bg-gradient-to-r from-[#121212] to-[#0C0C0C] border-[2px] border-[#171717] rounded-[8px] w-32">
              <ul className="py-2">
                <li
                  className="px-4 py-1 hover:text-[#9c9c9c] cursor-pointer"
                  onClick={() => handleItemClick("Courses")}
                >
                  Courses
                </li>
                <li
                  className="px-4 py-1 hover:text-[#9c9c9c] cursor-pointer"
                  onClick={() => handleItemClick("Trackcourses")}
                >
                  TrackCourses
                </li>
                <li
                  className="px-4 py-1 hover:text-[#9c9c9c] cursor-pointer"
                  onClick={() => handleItemClick("Semester")}
                >
                  Semester
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <section>
        {selectedOperations &&
          selectedOperations.map((operation, index) => {
            const operationDetails =
              typeof operation === "string"
                ? { function: operation, parameters: [] }
                : operation;

            return operationDetails ? (
              <CallableDisplay key={index} operation={operationDetails} />
            ) : null;
          })}
      </section>
    </section>
  );
}
