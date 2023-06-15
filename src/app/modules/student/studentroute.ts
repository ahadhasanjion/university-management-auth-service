import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidation } from './studentvalidation';
import { StudentController } from './studentcntroller';
const router = express.Router();

router.get('/:id', StudentController.getSingleStudent);
router.get('/', StudentController.getAllStudents);

router.delete('/:id', StudentController.deleteStudent);

router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudent
);

export const StudentRoutes = router;