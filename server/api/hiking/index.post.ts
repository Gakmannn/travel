import prisma from "@@/server/utils"

export default defineEventHandler(async (event) => {
  const files = event.context.files
  const data  = JSON.parse(event.context.fields.data)
  
  data.mainImage = files[0].newFileName
  data.price = Number(data.price.replaceAll(' ', '').replaceAll(',', '.'))
  const hiking = await prisma.hiking.create({
    data
  })

  for (let img of files) {
    await prisma.image.create({
      data:{
        img: img.newFileName,
        hiking_id: hiking.id
      }
    })
  }

  return {ok:true}
})