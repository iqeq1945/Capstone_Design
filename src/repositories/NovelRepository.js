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
      include: {
        post: true,
        like: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const findByIdwithLike = async () => {
  try {
    return await prisma.novel.findMany({
      include: {
        post: true,
        like: true,
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        like: {
          _count: "desc",
        },
      },
      take: 8,
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

export const updateNovel = async (data, novelId) => {
  try {
    return await prisma.novel.update({
      where: { id: novelId },
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

export const findByKeyword = async (keyword) => {
  try {
    return await prisma.novel.findMany({
      where: {
        OR: [
          {
            title: {
              contains: keyword,
            },
          },
          {
            author: {
              name: {
                contains: keyword,
              },
            },
          },
        ],
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        like: {
          _count: true,
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const findList = async (category) => {
  try {
    return await prisma.novel.findMany({
      where: { category },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const findByauthor = async (authorId) => {
  try {
    return await prisma.novel.findMany({
      where: { authorId },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};
