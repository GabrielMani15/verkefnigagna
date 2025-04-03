"use client";
import { useState, useEffect } from "react";
import DatabaseDisplay from "./components/dataDisplay";
import FunctionDisplay from "./components/functionDisplay";
import Heading from "./components/heading";
import Settings from "./components/settings";
import { DataProvider } from "./context/dataContext";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // After 2 seconds, set loading to false
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timeout on component unmount
  }, []);

  return (
    <DataProvider>
      <section className="">
        {loading ? (
          <section className="flex items-center justify-center h-screen w-full bg-black">
            <Heading />
          </section>
        ) : (
          <section className="h-screen grid grid-cols-3 bg-black px-10 py-5 gap-x-5">
            <section className=" ">
              <Settings />
              <FunctionDisplay />
            </section>
            <section className="flex justify-center items-center">
              <Heading />
            </section>
            <section className=" ">
              <DatabaseDisplay />
            </section>
          </section>
        )}
      </section>
    </DataProvider>
  );
}
