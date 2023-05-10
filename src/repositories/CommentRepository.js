import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findById = async (id) => {
  try {
    return await prisma.comment.findUnique({
      where: {
        id: id,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const createComment = async (data) => {
  try {
    return await prisma.comment.create({
      data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteComment = async (id) => {
  try {
    return await prisma.Comment.delete({
      where: { id },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getMyComment = async (id) => {
  try {
    return await prisma.comment.findMany({
      where: { userId: id },
      include: {
        user: {
          select: { name: true },
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getListComment = async (postId) => {
  try {
    return await prisma.comment.findMany({
      where: { postId: postId },
      include: {
        user: {
          select: { name: true },
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};
