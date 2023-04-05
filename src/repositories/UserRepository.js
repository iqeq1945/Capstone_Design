import { PrismaClient } from "@prisma/client";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime";

const prisma = new PrismaClient();

export const findByEmail = async (email) => {
  try {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const findById = async (id) => {
  try {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const findByName = async (name) => {
  try {
    return await prisma.user.findUnique({
      where: { name },
    });
  } catch (err) {
    console.error(err);
  }
};

export const create = async (name, email, password) => {
  try {
    return await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const findByIdWithData = async (id) => {
  try {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        seed: true,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const createSeed = async (id, seed) => {
  try {
    return await prisma.user.update({
      where: { id },
      data: {
        seed: {
          increment: seed,
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};
