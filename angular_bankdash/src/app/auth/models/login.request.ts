export class LoginRequest {
  email!: string;
  password!: string;
}

export class User extends LoginRequest {
  id!: number;
  name!: string;
  username!: string;
  about!: string;
  jobTitle!: string;
  roles!: Role[];
  photo!: string;
}

export class Role {
  id!: number;
  name!: string;
}

export enum TokenStatus {
  VALID,
  INVALID,
  EXPIRED,
  SENDING,
  SENT
}
