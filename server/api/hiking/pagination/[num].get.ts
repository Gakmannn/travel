import prisma from "@@/server/utils"

export default defineEventHandler(async (event) => {
  const paramsNum = event.context.params?.num
  let num = 0
  if (paramsNum) {
    num = +paramsNum-1
  }
  const arr = await prisma.hiking.findMany({
    where: {
      active: true,
    },
    skip: num*30,
    take: 30,
  })
  return arr
})