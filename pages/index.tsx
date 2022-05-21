import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CardSetVague } from "../@types/cards";
import Navbar from "../components/Navbar";
import NewCardForm from "../components/NewCardForm";
import NewSetForm from "../components/NewSetForm";
import RoundBtn from "../components/RoundButton";
import SetList from "../components/SetList";

export default function Home() {
  const [cardSets, setCardSets] = useState<CardSetVague[] | never[]>([]);

  const getAllSets = async () => {
    const res = await fetch("/api");
    const data = await res.json();
    setCardSets(data);
  };

  useEffect(() => {
    getAllSets();
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-around items-center">
      <NewSetForm />
      <h1 className="text-3xl">Recent sets:</h1>
      <SetList sets={cardSets}/>
    </div>
  );
}
