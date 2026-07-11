export interface IRegisterPayload {
  email: string;
  password: string;
  name: string;
  role: 'CUSTOMER' | 'PROVIDER';
}

export interface ILoginPayload {
  email: string;
  password: string;
}