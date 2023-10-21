import dotenv from 'dotenv';

dotenv.config(); 

export default {
  secretOrKey: process.env.JWT_SECRET,
};
