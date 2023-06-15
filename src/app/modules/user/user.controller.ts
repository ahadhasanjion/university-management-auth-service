import httpStatus from 'http-status'
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { userService } from './user.servicee';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

const createStudent: RequestHandler  = catchAsync( async (req:Request, res:Response) => {
    
    const {student, ...userData } = req.body
    const result = await userService.createStudent(student, userData)

    sendResponse(res,{
      statusCode: httpStatus.OK,
      success:true,
       message:'User created successfully', 
       data:result
      })

  
});

export const userController ={
  createStudent,
}
