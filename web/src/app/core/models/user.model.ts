import {IdentityModel} from './identity.model';

export interface UserModel {
  principal: string;
  givenName: string;
  familyName: string;
  email: string;
  imageUrl?: string;
}

export interface UserIdentity extends UserModel, IdentityModel {}
