import prisma from "@@/server/utils"

export default defineEventHandler(async (event) => {
  const arr = await prisma.hiking.findMany({
    where: {
      active: true,
      primary: true,
    },
    take: 6,
  })
  return arr
})