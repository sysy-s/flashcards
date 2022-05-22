import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        try {
            const currentCard = await prisma.flashcard.findFirst({
                where: {
                    id: String(req.query.id)
                },
                select: {
                    flashcardSetId: true
                }
            })

            await prisma.flashcardSet.update({
                where: {
                    id: currentCard?.flashcardSetId
                },
                data: {
                    length: { decrement: 1 }
                }
            })

            await prisma.flashcard.delete({
                where: {
                    id: String(req.query.id)
                }
            })
            res.status(204).send(null);
        } catch {
            res.status(404).send(null);
        }
    } else {
        res.status(401).send(`${req.method} is not allowed here`)
    }
} 