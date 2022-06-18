import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient, Todo } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    const todo: Todo = JSON.parse(req.body);

    try {
      const data: Todo = await prisma.todo.update({
        where: {
          id: todo.id,
        },
        data: {
          isFinished: !todo.isFinished,
        },
      });
      res.status(200).json(data.isFinished);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e);
      }
      res.json(e);
    }
  }
};
