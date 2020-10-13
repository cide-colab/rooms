interface AboModel {
  title: string;
  start: string;
  end: string;
  contingent: number;
  unlimited_end: boolean;
  unlimited_contingent: boolean;
  description: string;
}

interface AboIdentity extends AboModel, IdentityModel {}
