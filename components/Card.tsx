import React, { useContext } from "react";

interface Props {
  children: React.ReactNode;
}

export default function Card(props: Props) {
  return (
    <div
      className="w-72 h-56 sm:w-96 sm:h-72 p-4 rounded-xl shadow-md bg-white flex justify-center items-center hover:cursor-pointer"
    >
      <div className="h-fit w-fit text-center text-purple-500 text-2xl sm:text-4xl">
        {props.children}
      </div>
    </div>
  );
}
