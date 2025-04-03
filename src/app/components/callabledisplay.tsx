import { useState } from "react";
import requestBuilder from "../libs/requestBuilder";
import { useDataContext } from "../context/dataContext";

export default function CallableDisplay({ operation }) {
  const { data, updateData } = useDataContext();

  const [inputs, setInputs] = useState(() =>
    Array.isArray(operation.parameters)
      ? operation.parameters.reduce((acc, param) => {
          acc[param.name] = param.value || "";
          return acc;
        }, {})
      : {}
  );

  // Handle input changes
  const handleChange = (paramName, value) => {
    setInputs((prev) => {
      const updatedInputs = { ...prev, [paramName]: value };

      // Sync changes with operation.parameters
      const paramIndex = operation.parameters.findIndex(
        (p) => p.name === paramName
      );
      if (paramIndex !== -1) {
        operation.parameters[paramIndex].value = value;
      }

      return updatedInputs;
    });
  };

  // Handle execute
  const handleExecute = async () => {
    console.log("Updated operation:", operation);
    console.log("Updated inputs:", inputs);

    let data = await requestBuilder(operation);
    updateData(data);
  };

  return (
    <div className="h-[4.938rem] text-[#8A8A8A] font-semibold border-[2px] border-[#1F1F1F] rounded-[8px] my-5">
      <div className="bg-gradient-to-r from-[rgb(18,18,18)] to-[#0C0C0C] h-[2.75rem] text-[0.75rem] border-b-[2px] border-[#1F1F1F] rounded-t-[8px] flex items-center px-4">
        {operation.function}(
        {operation.parameters.map((param, index) => (
          <input
            key={index}
            type="text"
            placeholder={param.name}
            value={inputs[param.name]}
            onChange={(e) => handleChange(param.name, e.target.value)}
            className="bg-transparent border-b border-[#8A8A8A] outline-none text-white mx-1 w-[5rem] text-center"
          />
        ))}
        )
      </div>
      <div className="flex justify-between items-center pt-2 px-4">
        <p className="text-[0.5rem]">Created | 14/10/2025</p>
        <button
          className="flex items-center cursor-pointer hover:text-[#aeaeae]"
          onClick={handleExecute}
        >
          <p className="text-[0.75rem]">Execute</p>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.45789 2.47659C3.61798 2.38007 3.81691 2.37441 3.98222 2.46166L13.5822 7.52833C13.7572 7.62065 13.8666 7.8022 13.8666 8C13.8666 8.19779 13.7572 8.37934 13.5822 8.47166L3.98222 13.5383C3.81691 13.6256 3.61798 13.6199 3.45789 13.5234C3.29782 13.4269 3.19995 13.2535 3.19995 13.0667V2.93333C3.19995 2.74641 3.29782 2.57312 3.45789 2.47659ZM4.26662 3.81786V12.1821L12.1907 8L4.26662 3.81786Z"
              fill="#808080"
              fillOpacity="0.55"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
