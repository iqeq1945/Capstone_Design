import { PrismaClient } from "@prisma/client";
import { dbNow } from "../utils/dayUtils";

const now = dbNow();
const prisma = new PrismaClient();

export const findLike = async (userId, novelId) => {
  try {
    return await prisma.like.findUnique({
      where: {
        likeKey: {
          userId,
          novelId,
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};
