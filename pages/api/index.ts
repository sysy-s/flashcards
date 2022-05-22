import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { CardSetVague, CardSetFull } from '../../@types/cards'

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CardSetVague[] | CardSetFull | null>
) {
    if (req.method === 'GET') {
        const cardSets = await prisma.flashcardSet.findMany({
            select: {
                id: true,
                name: true,
                length: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.status(200).json(cardSets);
    } else if (req.method === 'POST') {

        // TODO try to return new set without throwing errors
        await prisma.flashcardSet.create({
            data: {
                name: String(req.body.name),
                length: 0,
            }
        })
        res.status(201).send(null);
    }
}
