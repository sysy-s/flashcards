import React from "react";
import Navbar from "./Navbar";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {props.children}
    </>
  );
}
