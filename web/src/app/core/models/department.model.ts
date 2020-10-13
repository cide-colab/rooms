interface DepartmentModel {
  name: string;
  description: string;
  imageUrl?: string;
}

interface DepartmentIdentity extends DepartmentModel, IdentityModel {}
