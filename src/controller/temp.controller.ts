import {IWeather } from "../model/models";

export class TempController {
    url: string;
    constructor(url:string){
        this.url = url;
    }
    //method to get the temp
    async getTemp(cityName: string,apiKey:string):Promise<IWeather>{
        const res: Response = await fetch(`${this.url}${cityName}&appid=${apiKey}`);
        if(res.status !== 200){
            throw new Error(`Failed to get temp. Error: ${res.status}`);
        }
        const temp:IWeather = await res.json();
        return temp;
    }
}
