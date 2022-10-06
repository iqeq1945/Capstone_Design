import { PrismaClient } from "@prisma/client";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime";
import { dbNow } from "../utils/dayUtils";
const prisma = new PrismaClient();

export const findById = async (id) => {
  try {
    return await prisma.novel.findUnique({
      where: {
        id: id,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const create = async (data, author) => {
  try {
    return await prisma.novel.create({
      data,
    });
  } catch (err) {
    console.error(err);
  }
};
