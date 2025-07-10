import prisma from "@@/server/utils"

export default defineEventHandler(async (event) => {
  const paramsId = event.context.params?.id
  let id = null as null|number
  if (paramsId) {
    id = +paramsId
  }
  if (id) {
    const el = await prisma.hiking.findUnique({
      include: {
        image: true,
        reviews: true,
      },
      where: {
        id,
        active: true,
      }
    })
    return el
  }
  return null
})