import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const todo: Prisma.TodoCreateInput = JSON.parse(req.body);

    try {
      const saveTodo: Prisma.TodoCreateInput = await prisma.todo.create({
        data: todo,
      });
      res.status(200).json(saveTodo);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e);
      }
      res.json(e);
    }
  } else if (req.method === "DELETE") {
    const id = JSON.parse(req.body);

    try {
      const deleteTodo = await prisma.todo.delete({
        where: { id: id },
      });
      res.status(200).json(deleteTodo);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e);
      }
      res.json(e);
    }
  } else if (req.method === "PUT") {
    const todo = JSON.parse(req.body);

    try {
      const updateTodo = await prisma.todo.update({
        where: { id: todo.id },
        data: { task: todo.task, isEditing: false },
      });

      res.status(200).json(updateTodo);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e);
      }
      res.json(e);
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
};
