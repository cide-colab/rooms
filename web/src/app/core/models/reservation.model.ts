interface ReservationModel {
  title: string;
  description: string;
  start: string;
  end: string;
}

interface ReservationIdentity extends ReservationModel, IdentityModel {}
