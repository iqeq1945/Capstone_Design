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

export const createNovel = async (data) => {
  try {
    return await prisma.novel.create({
      data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateNovel = async (data) => {
  try {
    return await prisma.novel.update({
      where: { id: data.id },
      data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteNovel = async (id) => {
  try {
    return await prisma.novel.delete({
      where: { id },
    });
  } catch (err) {
    console.error(err);
  }
};
