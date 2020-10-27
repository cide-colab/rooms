import {Identity} from './identity';

export interface UserModel {
  principal: string;
  givenName: string;
  familyName: string;
  email: string;
  imageUrl?: string;
}

export interface User extends UserModel, Identity {}
export interface RichUser extends UserModel, Identity {}
