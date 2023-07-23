export interface Register {
    userName: string,
    email: string,
    password: string
}

export interface Show {
    registerData:(register:Register)=> void;
}

export interface Message{
    message: string;
}