import prisma from "@@/server/utils"

export default defineEventHandler(async (event) => {
    const data = await readBody(event)
  if (data.email && data.id && data.token) {
      const user = await prisma.user.findUnique({
        select: {
          id: true,
          email: true,
          token: true,
          approved: true,
        },
        where: {
          email: data.email,
          id: data.id,
          token: data.token,
          approved: true
        }
      })
      if (user) {
        return {ok:true, user, massage:''}
      }
      return {ok:false, user:null, massage:''}
    } else {
      return {
        error: 'not found'
      }
    }
  
})