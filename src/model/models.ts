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


//----- City

export interface ICity {
    name: string,
    country: string,
    description: string
    date: Date
}