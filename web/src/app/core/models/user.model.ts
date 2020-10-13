interface UserModel {
  principal: string;
  givenName: string;
  familyName: string;
  email: string;
  imageUrl?: string;
}

interface UserIdentity extends UserModel, IdentityModel {}
