import { PrismaClient } from "@prisma/client";

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

export const createHistory = async (data) => {
  try {
    return await prisma.history.create({
      data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteHistory = async (id) => {
  try {
    return await prisma.History.delete({
      where: { id },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getMyHistory = async (id) => {
  try {
    return await prisma.history.findMany({
      where: { buyerId: id },
      distinct: ["novelId"],
      include: {
        post: true,
        novel: {
          include: {
            author: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getMyHistoryByPost = async (id, postId) => {
  try {
    return await prisma.history.findMany({
      where: {
        AND: [
          {
            buyerId: id,
          },
          { postId: postId },
        ],
      },
      include: {
        post: true,
        novel: {
          include: {
            author: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};
