import { ICity } from "../model/models";
import { CitiesController } from "./cities.crud";
import Swal from "sweetalert2";
import { logout } from "./home";

//paths
const domain = 'http://localhost:3000/';
const endpoint = 'cities';

//DOM elements
const form = document.getElementById('addCity-form') as HTMLFormElement;
const cityName = document.getElementById('new-city') as HTMLInputElement;
const country = document.getElementById('new-country') as HTMLInputElement;
const description = document.getElementById('newCity-description') as HTMLInputElement;
const url = document.getElementById('new-url') as HTMLInputElement;

//variable to store the id of the city to edit
let idCache: string | undefined;

//set the cityArray in local storage
export let cityArray: ICity[]= [];

//load cities from json-server
export async function loadCities(){   
    const controller = new CitiesController(domain);
    try {
        const cities = await controller.getCities(endpoint);
        cityArray = cities;
        localStorage.setItem('cityarray', JSON.stringify(cityArray));
    } catch (error) {
         console.error('Error loading cities:', error);
    }
}

//check if there is an edit city
const editCity = sessionStorage.getItem('editCity');
if(editCity){
    const city: ICity = JSON.parse(editCity);
    cityName.value = city.name;
    country.value = city.country;
    description.value = city.description;
    url.value = city.url;

    idCache = city.id; //store the id of the city to edit
    sessionStorage.removeItem('editCity');
}

//event listener for the form
form.addEventListener('submit', async(e:Event)=>{
    e.preventDefault();
    //create a new city object
    const newCity: ICity= {
        id: idCache,
        name: cityName.value,
        country: country.value,
        description: description.value,
        date: new Date(),
        url: url.value
    }
    //create a new instance of the controller
    try{
        const controller = new CitiesController(domain);
        //check if there is an id to edit
        if(idCache === undefined){
            await controller.createCity(newCity,endpoint);
            Swal.fire({
                title: "City",
                text: "created!",
                icon: "success",
                background: '#181818',
                color: '#fff'
            });
        } else { 
            await controller.editCity(newCity, endpoint, idCache);
            Swal.fire({
                title: "City",
                text: "edited!",
                icon: "success",
                background: '#181818',
                color: '#fff'
            });
            idCache = undefined;
        }

        await loadCities();

        form.reset();
        console.log(cityArray);
    } catch (error){
        console.error('Error creating city;', error);
        Swal.fire({
            title: "Error!",
            text: "Error creating city",
            icon: "error",
            background: '#181818',
            color: '#fff'
        });
    }
    
})

/* logout */
logout();