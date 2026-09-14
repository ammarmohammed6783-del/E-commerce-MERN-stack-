export interface User {
    _id: string;
    userName: string;
    email: string;
    role: "user" | "admin" | "superAdmin";
}

export interface SigninResponse {
    msg: string;
    accessToken: string;
}

export interface RegisterResponse {
    msg: string;
    accessToken: string;
}