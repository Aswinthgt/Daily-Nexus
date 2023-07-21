export interface Register {
    userName: string,
    email: string,
    password: string
}

export interface Show {
    registerData:(register:Register, value:boolean)=> void;
}

export interface Message{
    message: string;
}