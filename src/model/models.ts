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

//----- Weather

export interface IWeather {
    coord:      Coord;
    weather:    Weather[];
    base:       string;
    main:       Main;
    visibility: number;
    wind:       Wind;
    clouds:     Clouds;
    dt:         number;
    sys:        Sys;
    timezone:   number;
    id:         number;
    name:       string;
    cod:        number;
}

export interface Clouds {
    all: number;
}

export interface Coord {
    lon: number;
    lat: number;
}

export interface Main {
    temp:       number;
    feels_like: number;
    temp_min:   number;
    temp_max:   number;
    pressure:   number;
    humidity:   number;
    sea_level:  number;
    grnd_level: number;
}

export interface Sys {
    type:    number;
    id:      number;
    country: string;
    sunrise: number;
    sunset:  number;
}

export interface Weather {
    id:          number;
    main:        string;
    description: string;
    icon:        string;
}

export interface Wind {
    speed: number;
    deg:   number;
}
