export enum Role {
  Freelancer = 1,
  Customer = 2,
  Other = 3,
}

export type User = {
  name: string;
  email: string;
  role: Role;
};

export interface Customer extends User {
  id: string;
}
