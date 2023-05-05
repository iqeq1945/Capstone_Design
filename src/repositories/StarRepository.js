import { PrismaClient } from "@prisma/client";
import { dbNow } from "../utils/dayUtils";

const now = dbNow();
const prisma = new PrismaClient();

export const findStar = async (userId, postId) => {
  try {
    return await prisma.star.findUnique({
      where: {
        starKey: {
          userId,
          postId,
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getAvg = async (postId) => {
  try {
    return await prisma.star.aggregate({
      where: {
        postId,
      },
      _avg: {
        star: true,
      },
    });
  } catch (err) {
    console.error(err);
  }
};
