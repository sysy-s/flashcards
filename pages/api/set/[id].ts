// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Flashcard, PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { CardSetFull } from '../../../@types/cards'

const prisma = new PrismaClient();

// GET specific card set or POST a new flash card to an existing set
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CardSetFull | Flashcard | null | string>
) {
    const id = String(req.query.id);

    if (req.method === 'GET') {
        try {
            const cardSet = await prisma.flashcardSet.findFirst({
                where: {
                    id: id
                },
                select: {
                    name: true,
                    length: true,
                    cards: true,
                    id: true,
                    // createdAt is useless for my purposes
                    createdAt: false
                }
            });
            res.status(200).json(cardSet);
        } catch {
            res.status(404).send(null);
        }

    } else if (req.method === 'POST') {

        const newCard = {
            flashcardSetId: id,
            question: req.body.question,
            answer: req.body.answer
        }

        let newCardResponse;

        try {
            const currentSet = await prisma.flashcardSet.findFirst({
                where: {
                    id: id
                },
                select: {
                    length: true
                }
            })
            newCardResponse = await prisma.flashcard.create({ data: newCard });

            // increment length by one each time we add a new card
            if (currentSet?.length) {
                await prisma.flashcardSet.update({
                    where: {
                        id: id
                    },
                    data: {
                        length: currentSet.length + 1
                    }
                })
            }

        } catch {
            res.status(401).send(null);
            return;
        }

        res.status(201).send(newCardResponse);
    } else if (req.method === 'DELETE') {
        try {
            await prisma.flashcardSet.delete({
                where: {
                    id: id
                }
            })

            res.status(204).send(null);
        } catch {
            res.status(404).send(null);
        }
    } else {
        res.status(400).send(`${req.method} is not suported here`);
    }
}
