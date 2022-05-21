import { useContext } from "react";
import { CardCounterContext } from "../context/CardTransition";

export default function NextBtn(props: { disabled?: boolean }) {
  const { cardCounter, setCardCounter } = useContext(CardCounterContext);
  return (
    <button
      disabled={props.disabled === undefined ? false : props.disabled}
      onClick={() => setCardCounter(cardCounter + 1)}
      className={`p-3 w-16 h-16 text-center text-4xl bg-white text-purple-500 rounded-full shadow-md transition-transform ease-in-out hover:scale-95 ${
        props.disabled ? "opacity-50" : ""
      }`}
    >
      {">"}
    </button>
  );
}
