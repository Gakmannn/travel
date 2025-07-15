import prisma from "@@/server/utils"

export default defineEventHandler(async (event) => {
    const data = await readBody(event)
    if (data.email && data.pass) {
      const user = await prisma.user.findUnique({
        select: {
          id:true,
          email: true,
          token: true,
          approved: true,
        },
        where: {
          email: data.email,
          pass: data.pass,
          approved: true
        }
      })
      return user
    } else {
      return {
        error: 'not found'
      }
    }
  
})