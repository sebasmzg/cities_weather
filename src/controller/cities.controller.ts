import { ICity } from "../model/models";

export class CitiesController {
    url: string
    constructor(url:string){
        this.url = url;
    }
    
    async getCities(endpoint:string):Promise<ICity[]>{
        const res: Response = await fetch(`${this.url}${endpoint}`);
        if(res.status !== 200){
            throw new Error('Failed to get cities');
        }
        const cities = await res.json();
        console.log(cities);
        
        return cities;
    }
}