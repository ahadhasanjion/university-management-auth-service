import mongoose from 'mongoose'
import config from '../../../config/index'
import ApiError from '../../../errors/ApiError'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { IStudent } from '../student/studentinterface'
import { IUser } from './user.interfase'
import { User } from './user.model'
import { generateFacultyId, generateStudentId } from './user.utils'
import { Student } from '../student/studentmodel'
import httpStatus from 'http-status'

const createStudent = async (student:IStudent, user: IUser): Promise<IUser | null> => {

  //default password
  if (!user.password) {
    user.password = config.default_student_pass as string
  }

  //set role
  user.role = 'student'

  const academicsemester  = await AcademicSemester.findById(student.academicSemester);

  //generate student id
  let newUserAllData = null

  const session = await mongoose.startSession()

  try{
    session.startTransaction()
    const id = await generateStudentId(academicsemester)
    user.id = id 
    student.id = id

    const newStudent = await Student.create([student], {session})

    if(!newStudent.length){
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    //set student _id into user.student
    user.student = newStudent[0]._id;
    const newUser = await User.create([user], {session})
    if(!newUser.length){
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    newUserAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()

  }catch(error){
    await session.abortTransaction()
    await session.endSession()
  }

  //user --> student --> academic[semester, department, faculty]
  if(newUserAllData){
    newUserAllData = await User.findOne({id: newUserAllData.id}).populate
    ({
      path: 'student',
      populate: [
        {
          path: 'academicSemester'
        },
        {
          path: 'academicDepartment'
        },
        {
          path:'academicFaculty'
        }
      ]
    })
  }
  return newUserAllData;
}

export const userService = {
  createStudent
}
