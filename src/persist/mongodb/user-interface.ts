import { Document } from 'mongoose';

export interface UserInterface extends Document {
  email: string;
  name: string;
}