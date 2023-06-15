import winston, { format } from 'winston'
import path from 'path'
const {combine, timestamp, label, printf} = format;
import  DailyRotateFile from 'winston-daily-rotate-file';

const myFormat = printf(({ level, message, label, timestamp }) => {
    const date = new Date(timestamp)
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    return `${date.toDateString()} ${hour}:${minutes}:${seconds} } [${label}] ${level}: ${message}`;
});    

const logger = winston.createLogger({
    level: 'info',
    format: combine(label({ label: 'right meow!' }),timestamp(),myFormat),
    transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
            filename: path.join(process.cwd(),
            'logs',
            'winston',
            'successes',
            'phu-%DATE%-success.log'), 
            datePattern: 'YYYY--DD-MM-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ],
})
  
const errorlogger = winston.createLogger({
  level: 'error',
  format: combine(label({ label: 'right meow!' }),timestamp(),myFormat),
    transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
            filename: path.join(process.cwd(), 
            'logs', 
            'winston',
            'errors',
            'phu--%DATE%-error.log'), 
            datePattern: 'YYYY--DD-MM-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ],
})

export {logger, errorlogger}
