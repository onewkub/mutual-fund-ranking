import express from 'express'
import { Request, Response } from 'express'
import cors from 'cors'
import 'dotenv/config'

import swaggerUI from 'swagger-ui-express'
import swaggerFile from './swagger'
import router from './routers'
import prisma from './lib/prisma'

const PORT = process.env.PORT || 8080
const server = express()

async function main() {
  server.use(cors())

  server.use(express.json())

  server.get('/', (req: Request, res: Response) => {
    res.send(
      'Hello This is server of My Project Yeah!! TypeScript + Express + Nodemon',
    )
  })
  server.use('/api', router)

  server.use('/api/doc', swaggerUI.serve, swaggerUI.setup(swaggerFile))

  server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
  })
}

main()
  .catch((e) => {
    console.log(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
