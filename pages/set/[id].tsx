import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { CardSetFull } from "../../@types/cards";
import CardFlipper from "../../components/CardFlipper";
import DeleteBtn from "../../components/DeleteButton";
import NewCardForm from "../../components/NewCardForm";
import NextBtn from "../../components/NextButton";
import PrevBtn from "../../components/PreviousButton";
import RoundBtn from "../../components/RoundButton";
import { CardCounterContext } from "../../context/CardTransition";
import { AnimatePresence, motion } from "framer-motion";

export default function FlashcardSet() {
  const router = useRouter();
  const { id } = router.query;
  const [cardSet, setCardSet] = useState<CardSetFull | null>(null);
  const [formVisible, toggleFormVisible] = useState<boolean>(false);
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
    <div className="h-full w-full flex flex-col justify-center items-center">
      <AnimatePresence>
        {cardSet && !formVisible && (
          <>
            <motion.div
              transition={{ ease: "easeInOut" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-fit flex justify-center items-center"
            >
              <div className="-mr-16 sm:mr-2 z-10 opacity-70 sm:opacity-100">
                <PrevBtn
                  disabled={cardSet.cards[cardCounter - 1] === undefined}
                />
              </div>
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
              <div className="-ml-16 sm:ml-2 z-10 opacity-70 sm:opacity-100">
                <NextBtn
                  disabled={cardSet.cards[cardCounter + 1] === undefined}
                />
              </div>
            </motion.div>

            <div className="flex flex-row justify-between mt-2 items-center">
              <div className="p-4 bg-white rounded-lg h-16 text-2xl text-purple-500 ">
                {cardCounter + 1} / {cardSet.cards.length}
              </div>
            </div>
            {cardSet.cards[0] && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <DeleteBtn type="card" itemId={cardSet.cards[cardCounter].id} />
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {formVisible && (
          <motion.div
            className="absolute"
            transition={{ type: "spring" }}
            initial={{ opacity: 0, translateY: -100 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -200 }}
          >
            <NewCardForm setId={String(id)} />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute right-2 top-2">
        <RoundBtn
          content={formVisible ? "Cancel" : "Add"}
          handleClick={() => {
            toggleFormVisible((prev) => !prev);
          }}
        />
      </div>
    </div>
  );
}
