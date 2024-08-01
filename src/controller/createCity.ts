import { ICity } from "../model/models";
import Swal from "sweetalert2";

const form = document.getElementById('addCity-form') as HTMLFormElement;
const cityName = document.getElementById('new-city') as HTMLInputElement;
const country = document.getElementById('new-country') as HTMLInputElement;
const description = document.getElementById('newCity-description') as HTMLInputElement;

const cityArray: ICity[]= JSON.parse(localStorage.getItem('cityArray') || '[]');

form.addEventListener('submit', (e:Event)=>{
    e.preventDefault();

    const newCity= {
        name: cityName.value,
        country: country.value,
        description: description.value,
        date: new Date()
    }

    cityArray.push(newCity);
    localStorage.setItem('cityArray', JSON.stringify(cityArray));
    form.reset();
    Swal.fire({
        title: "Hello!",
        text: "you are logged in",
        icon: "success"
    });
    console.log(cityArray);
    
})
