import React, { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function NewCardForm(props: { setId: string }) {
  const questionRef = useRef<HTMLTextAreaElement>(null);
  const answerRef = useRef<HTMLTextAreaElement>(null);
  const [emptyWarning, setEmptyWarning] = useState<boolean>(false);
  const router = useRouter();

  async function postData(data: { question: string; answer: string }) {
    axios({
      url: `/api/set/${props.setId}`,
      method: "POST",
      data: data,
    }).then(() => {
      router.replace(router.asPath);
      if (questionRef.current) {
        questionRef.current.value = "";
      }
      if (answerRef.current) {
        answerRef.current.value = "";
      }
    });
  }

  function submitNewCardSet(e: React.FormEvent) {
    e.preventDefault();
    const question = questionRef.current ? questionRef.current.value : "";
    const answer = answerRef.current ? answerRef.current.value : "";
    console.log(question);
    console.log(answer);

    if (answer === "" || question === "") {
      setEmptyWarning(true);
      return;
    }

    const cardData = {
      question: question,
      answer: answer,
    };
    postData(cardData);
  }

  return (
    <form className="mt-4 p-4 w-96 flex flex-col justify-center items-center text-2xl bg-white rounded-lg text-center">
      <h1 className="text-4xl text-purple-500">Create new set</h1>
      <textarea
        name="question"
        placeholder="Question..."
        ref={questionRef}
        required
        className={`p-2 w-full mt-2 resize-y rounded-md border-2 border-purple-500 focus:outline-nonez`}
      />
      <textarea
        name="answer"
        placeholder="Answer..."
        ref={answerRef}
        required
        className={`mt-2 w-full mb-2 resize-y p-2 rounded-md border-2 border-purple-500 focus:outline-none`}
      />
      <button
        onClick={(e) => submitNewCardSet(e)}
        className="bg-purple-500 text-white shadow-md w-fit p-2 rounded-md"
      >
        Submit
      </button>
      <div>{emptyWarning ? "Some fields are still empty" : ""}</div>
    </form>
  );
}
