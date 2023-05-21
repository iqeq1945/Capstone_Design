import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findById = async (id) => {
  try {
    return await prisma.post.findUnique({
      where: {
        id: id,
      },
      include: {
        novel: true,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const createPost = async (data) => {
  try {
    return await prisma.post.create({
      data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const updatePost = async (data, id) => {
  try {
    return await prisma.post.update({
      where: { id },
      data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const deletePost = async (id) => {
  try {
    return await prisma.post.delete({
      where: { id },
    });
  } catch (err) {
    console.error(err);
  }
};

export const findNextById = async (id, novelId, take) => {
  try {
    return await prisma.post.findMany({
      take,
      skip: Math.abs(take),
      cursor: { id },
      where: {
        novelId,
      },
      include: {
        novel: true,
      },
    });
  } catch (err) {
    console.error(err);
  }
};
