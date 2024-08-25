import * as Yup from 'yup';
import mongoose from 'mongoose';

// Custom validation for MongoDB ObjectId
const objectIdValidation = Yup.string()
  .test('is-valid-objectId', '${path} is not a valid ObjectId', (value) => {
    if(!value) return true;
    return mongoose.Types.ObjectId.isValid(value);
  });

export default objectIdValidation;