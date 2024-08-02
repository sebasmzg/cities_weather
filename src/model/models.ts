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
    id: string | undefined,
    name: string,
    country: string,
    description: string,
    date: Date,
    url: string
}