import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { CardSetFull } from "../../@types/cards";
import CardFlipper from "../../components/CardFlipper";
import DeleteBtn from "../../components/DeleteButton";
import NewCardForm from "../../components/NewCardForm";
import NextBtn from "../../components/NextButton";
import PrevBtn from "../../components/PreviousButton";
import { CardCounterContext } from "../../context/CardTransition";

export default function FlashcardSet() {
  const router = useRouter();
  const { id } = router.query;
  const [cardSet, setCardSet] = useState<CardSetFull | null>(null);
  const { cardCounter } = useContext(CardCounterContext);

  const getFlashcards = async () => {
    const res = await fetch(`/api/set/${id}`);
    const fc = await res.json();
    setCardSet(fc);
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    getFlashcards();
  }, [router.isReady, router.query]);

  return (
    <div className="h-full w-full flex flex-row justify-around items-center">
      {cardSet && (
        <div className="w-fit">
          <CardFlipper
            question={
              cardSet.cards[0]
                ? cardSet.cards[cardCounter].question
                : "Nothing here yet"
            }
            answer={
              cardSet.cards[0]
                ? cardSet.cards[cardCounter].answer
                : "Nothing here yet"
            }
          />
          <div className="flex flex-row justify-between mt-2 items-center">
            <PrevBtn disabled={cardSet.cards[cardCounter - 1] === undefined} />
            <div className="p-4 bg-white rounded-full h-16 text-2xl text-purple-500 ">
              {cardCounter + 1} / {cardSet.cards.length}
            </div>
            <NextBtn disabled={cardSet.cards[cardCounter + 1] === undefined} />
          </div>
          {cardSet.cards[0] && (
            <DeleteBtn type="card" itemId={cardSet.cards[cardCounter].id} />
          )}
        </div>
      )}
      <NewCardForm setId={String(id)} />
    </div>
  );
}
