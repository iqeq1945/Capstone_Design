import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findById = async (id) => {
  try {
    return await prisma.cash.findUnique({
      where: {
        id: id,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const createCash = async (data) => {
  try {
    return await prisma.cash.create({
      data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteCash = async (id) => {
  try {
    return await prisma.cash.delete({
      where: { id },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getMyCash = async (id) => {
  try {
    return await prisma.cash.findMany({
      where: { buyerId: id },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (err) {
    console.error(err);
  }
};
