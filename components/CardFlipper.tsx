import React, { useContext, useEffect } from "react";
import Card from "./Card";
import styles from "../styles/cardflipper.module.css";
import { useState } from "react";
import { CardCounterContext } from "../context/CardTransition";

export default function CardFlipper(props: {
  question: string;
  answer: string;
}) {
  const [flipped, setFlipped] = useState<boolean>(false);
  const { cardCounter } = useContext(CardCounterContext);
  function flip() {
    setFlipped((prevFlipped) => !prevFlipped);
  }

  useEffect(() => {
    setFlipped(() => false);
  }, [cardCounter]);

  return (
    <div className={flipped ? styles.flipped : ""} onClick={flip}>
      <div className={styles.front}>
        <Card>{props.question}</Card>
      </div>
      <div className={styles.back}>
        <Card>{props.answer}</Card>
      </div>
    </div>
  );
}
