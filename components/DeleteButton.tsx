import axios from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";
import { CardCounterContext } from "../context/CardTransition";

export default function DeleteBtn(props: { type: string; itemId: string }) {
  const router = useRouter();
  const { setCardCounter } = useContext(CardCounterContext);

  function deleteType() {
    axios({
      method: "DELETE",
      url: `/api/${props.type}/${props.itemId}`,
    }).then(() => {
      setCardCounter((prevCouter) => 0);
      router.replace(router.asPath);
    });
  }

  return (
    <button
      className="bg-red-500 text-white p-2 rounded-md text-lg transition-all ease-in-out  hover:scale-95 hover:bg-red-600 absolute bottom-3 left-3"
      onClick={() => deleteType()}
    >
      Delete this {props.type}
    </button>
  );
}
