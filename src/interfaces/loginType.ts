export interface ILoginForm {
    password: string
    login_id: string
}

export interface IFormStatus {
    message: string
    type: string
}

export interface IFormStatusProps {
    [key: string]: IFormStatus
}

export interface ISignUpForm {
    loginId: string
    password: string
    confirmPassword: string
}