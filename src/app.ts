import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes} from './app/modules/user/user.route'
import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.route'
import routes from './app/routes'
import httpStatus from 'http-status'
import { generateFacultyId, generateStudentId } from './app/modules/user/user.utils'
const app: Application = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application routes


// app.use('/api/v1/users/', UserRoutes);
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes)
app.use('/api/v1/', routes)


// app.get('/', async (req: Request, res: Response, next:NextFunction) => {
//   // throw new ApiError(400, 'ami error');
//   next("Ore Error")
// })

//Global Error Handling
app.use(globalErrorHandler);


//Handle Not Found
app.use((req:Request, res:Response, next:NextFunction)=>{
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'Not Found',
        errorMessage:[{
            path: req.originalUrl,
            message: 'API NOT FOUND'
        }]
    })
    next();
});


export default app
