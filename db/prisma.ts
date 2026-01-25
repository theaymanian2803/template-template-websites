import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import ws from 'ws'

// Sets up WebSocket connections
neonConfig.webSocketConstructor = ws
const connectionString = `${process.env.DATABASE_URL}`

// 1. Define the function that creates the client
const prismaClientSingleton = () => {
  const pool = new Pool({ connectionString })
  const adapter = new PrismaNeon(pool)

  return new PrismaClient({ adapter }).$extends({
    result: {
      product: {
        price: {
          compute(product) {
            return product.price.toString()
          },
        },
        rating: {
          compute(product) {
            return product.rating.toString()
          },
        },
      },
    },
  })
}

// 2. Define the global type so TypeScript doesn't complain
declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

// 3. Use the existing instance if it exists, otherwise create a new one
export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

// 4. Save the instance to global in development
if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma
}
