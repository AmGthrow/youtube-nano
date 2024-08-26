export interface LoginResponse {
    access: string;
    refresh: string;
    user: UserDetails;
}
export interface UserDetails {
    pk: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}
export interface UserCreate {
    username: string;
    email?: string;
    password1: string;
    password2: string;
}

export interface UserLogin {
    username: string;
    password: string;
}
