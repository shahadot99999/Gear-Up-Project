export interface RegisterUserPaylooad {
    name: string;
    email: string;
    password: string;
    role: 'CUSTOMER' | 'ADMIN' | 'PROVIDER';
}