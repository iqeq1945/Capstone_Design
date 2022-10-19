import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findById = async (id) => {
  try {
    return await prisma.post.findUnique({
      where: {
        id: id,
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

export const updatePost = async (data) => {
  try {
    return await prisma.post.update({
      where: { id: data.id },
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
