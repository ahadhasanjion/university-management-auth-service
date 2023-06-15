import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import {AcademicSemesterRoutes} from '../modules/academicSemester/academicSemester.route'
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartmentroutes';

const router = express.Router()

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/academic-semester',
        route: AcademicSemesterRoutes,
    },
    {
       path: '/academic-department',
       route: AcademicDepartmentRoutes,
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))


export default router;