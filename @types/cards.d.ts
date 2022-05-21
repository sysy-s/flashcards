export interface Flashcard {
    id: string,
    question: string,
    answer: string
}

export interface CardSetFull {
    id: string,
    name: string,
    length: number,
    cards?: Flashcard[]
}

export interface CardSetVague {
    id: string,
    name: string,
    length: number
}

export const defaultCard: Flashcard = {
    question: "No question",
    answer: "No answer"
}

export const defaultCardSet: CardSet = {
    name: "No name",
    cards: [defaultCard]
}