import React, { createContext, useState } from "react";

interface CardCounterInterface {
    cardCounter: number;
    setCardCounter: React.Dispatch<React.SetStateAction<number>>
}

export const CardCounterContext = createContext<CardCounterInterface>({
  cardCounter: 0,
  setCardCounter: () => null,
});

export const CardCounterProvider = (props: { children: React.ReactNode }) => {
  const [cardCounter, setCardCounter] = useState(0);
  const value = {
    cardCounter,
    setCardCounter,
  };

  return (
    <CardCounterContext.Provider value={value}>
      {props.children}
    </CardCounterContext.Provider>
  );
};
