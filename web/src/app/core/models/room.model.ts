interface RoomModel {
  number: string;
  name: string;
  description: string;
  imageUrl?: string;
}

interface RoomIdentity extends RoomModel, IdentityModel {}
