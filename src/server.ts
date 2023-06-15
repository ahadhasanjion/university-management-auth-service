import mongoose from 'mongoose'
import config from './config'
import app from './app'
import { logger, errorlogger } from './shared/logger'
import { Server } from 'http'

process.on('uncaughtException', error =>{
  errorlogger.error(error)
  process.exit(1)
})

let server: Server

async function boosTrap() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Database connected successfully')

    server =app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`)
    })
  } catch (err) {
    errorlogger.error('Failed to connect database')
  }

  process.on('unhandledRejection', (error) => {
    if(server){
      server.close(()=>{
        errorlogger.error(error)
        process.exit(1)
      })
    } else{
      process.exit(1)
    }

  })
}

boosTrap()

process.on('SIGTERM', ()=>{
  logger.info('SIGTERM IS RECEIVED')
  if(server){
    server.close()
  }
})
