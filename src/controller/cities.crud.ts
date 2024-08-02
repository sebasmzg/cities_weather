import { ICity } from "../model/models";

export class CitiesController {
    url: string
    constructor(url:string){
        this.url = url;
    }
    //metodo para obtener las ciudades
    async getCities(endpoint:string):Promise<ICity[]>{
        const res: Response = await fetch(`${this.url}${endpoint}`);
        if(res.status !== 200){
            throw new Error('Failed to get cities');
        }
        const cities:ICity[] = await res.json();
        console.log(cities);
        
        return cities;
    }
    //metodo para obtener una ciudad por id
    async getCityById(id:string,endpoint:string):Promise<ICity>{
        const res: Response = await fetch(`${this.url}${endpoint}/${id}`);
        if(res.status !== 200){
            throw new Error('Failed to get city');
        }
        const city: ICity = await res.json();
        return city;
    }
    //metodo para crear una ciudad
    async createCity(city: ICity,endpoint:string):Promise<ICity>{
        const reqOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(city)
        }
        
        try{
            const res: Response = await fetch(`${this.url}${endpoint}`, reqOptions);
    
            if(res.status !== 201){
                throw new Error(`Failed to create city. Error: ${res.status}`);
            } 
            
            const newCity: ICity = await res.json();
            return newCity;
        } catch (error){
            console.error('Error creating city;', error);
            throw error;
        }
    }
    //metodo para editar una ciudad
    async editCity(city: ICity, endpoint: string, idCache: string):Promise<ICity | undefined>{
        const reqOptions: RequestInit = {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(city)
            }
        try {
            const res: Response = await fetch(`${this.url}${endpoint}/${idCache}`, reqOptions);
            if(res.status !== 200){
                throw new Error(`Error editing city. Error: ${res.status}`);
            }
            const editedCity: ICity = await res.json();
            return editedCity;
        } catch (error) {
            
        }
    }
    //metodo para eliminar una ciudad
    async deleteCity(id:string, endpoint: string){
        const reqOptions : RequestInit = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res: Response = await fetch (`${this.url}${endpoint}/${id}`, reqOptions);
            if(res.status !== 204){
                throw new Error(`Error deleting city. Error: ${res.status}`);
            }
        } catch (error){
            console.error('Error deleting city:', error);
            throw error;
        }
    }
}