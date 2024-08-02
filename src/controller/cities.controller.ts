import { ICity } from "../model/models";
import { CitiesController } from "./cities.crud";
import Swal from "sweetalert2";
//paths
const domain = 'http://localhost:3000/';
const endpoint = 'cities';
//DOM elements
const form = document.getElementById('addCity-form') as HTMLFormElement;
const cityName = document.getElementById('new-city') as HTMLInputElement;
const country = document.getElementById('new-country') as HTMLInputElement;
const description = document.getElementById('newCity-description') as HTMLInputElement;
//variable to store the id of the city to edit
let idCache: string | undefined;

//set the cityArray in local storage
const cityArray: ICity[]= JSON.parse(localStorage.getItem('cityArray') || '[]');

//check if there is an edit city
const editCity = sessionStorage.getItem('editCity');
if(editCity){
    const city: ICity = JSON.parse(editCity);
    cityName.value = city.name;
    country.value = city.country;
    description.value = city.description;

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
        date: new Date()
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
                icon: "success"
            });
        } else {
            
            await controller.editCity(newCity, endpoint, idCache);
            Swal.fire({
                title: "City",
                text: "edited!",
                icon: "success"
            });
            idCache = undefined;
        }
        await controller.getCities(endpoint);
        cityArray.push(newCity);
        localStorage.setItem('cityArray', JSON.stringify(cityArray));
        form.reset();
        console.log(cityArray);
    } catch (error){
        console.error('Error creating city;', error);
        Swal.fire({
            title: "Error!",
            text: "Error creating city",
            icon: "error"
        });
    }
    
})
