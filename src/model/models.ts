//------- Interface for User -------//

//----- login

//--- request login
export interface ILogin {
    email: string,
    password: string
}
//--- response login
export interface IResponseLogin {
    token: string
}


//----- register
