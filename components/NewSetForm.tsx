import axios from "axios";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export default function NewSetForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [warning, setWarning] = useState<boolean>(false);
  function createSet() {
    const data = {
      name: nameRef.current?.value,
    };

    if (!nameRef.current?.value) {
      setWarning((prevWarning) => true);
      return;
    }

    axios({
      method: "POST",
      url: "/api",
      data: data,
    }).then((res) => {
      router.push(`/set/${res.data.id}`);
      console.log(res.data);
    });
  }

  return (
    <form className="mt-4 p-4 w-80 sm:w-96 h-fit flex flex-col justify-center items-center text-2xl bg-white rounded-lg text-center">
      <h1 className="text-4xl text-purple-500">Create new set</h1>
      <input
        className="p-2 w-full mt-2 resize-y rounded-md border-2 border-purple-500 focus:outline-nonez"
        type="text"
        name="name"
        placeholder="Set name..."
        ref={nameRef}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          createSet();
        }}
        className="mt-4 bg-purple-500 text-white shadow-md w-fit p-2 rounded-md"
      >
        Create
      </button>
      <div className="text-2xl">{warning && 'Name field is empty!'}</div>
    </form>
  );
}
