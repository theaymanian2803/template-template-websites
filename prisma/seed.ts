import { PrismaClient } from '@prisma/client'
import sampleData from './sample-data' // Ensure this file exists at prisma/sample-data.ts

const prisma = new PrismaClient()

async function main() {
  // 1. Clear existing data to avoid duplicates
  await prisma.product.deleteMany()

  // 2. Insert new data
  await prisma.product.createMany({
    data: sampleData.products,
  })

  console.log('Database seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
