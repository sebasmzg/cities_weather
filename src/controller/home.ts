import Swal from 'sweetalert2';
import { CitiesController } from './cities.crud';
import { CardTemplate } from './card.template';
import { ICity } from '../model/models';

//DOM elements
const logout = document.getElementById('logout') as HTMLButtonElement;
const token = sessionStorage.getItem('token');
const citiesContainer = document.getElementById('cities-container') as HTMLDivElement;

//paths
const urlCities = 'http://localhost:3000/';
const endpointCities = 'cities';

(()=>{
    if(!token){
        Swal.fire({
            title: "Oops!",
            text: "You are not logged in",
            icon: "error",
            background: '#fff',
        }).then(()=>{
            window.location.href = '/';
        });
        
    }
})();

function logoutConfirm(){
    sessionStorage.removeItem('token');
    window.location.href = '/';

}


logout.addEventListener('click',()=>{
    Swal.fire({
        title: "Logout",
        text: "Are you sure",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
    }).then((result) => {
        if (result.isConfirmed) {
        logoutConfirm();
        }
    })
            
})

const citiesController = new CitiesController(urlCities);
citiesController.getCities(endpointCities)

//render cards
async function loadCityCards(){
    try {
        const response = await citiesController.getCities(endpointCities);
        const cities: ICity[] = response;
        cities.forEach((city)=>{
            const cardTemplate = new CardTemplate(citiesContainer);
            cardTemplate.cardTemplate(city);
        })
    } catch (error) {
        console.error('Error loading cities', error);
        throw error;
    }
}

//load cards
document.addEventListener('DOMContentLoaded', loadCityCards);

//edit and delete cards
citiesContainer.addEventListener('click', async(e:Event)=>{
    const target = e.target as HTMLElement;

    if(target instanceof HTMLElement){
        const action = target.dataset.action;
        const idCache = target.dataset.id;

        if(action === 'edit' && idCache){

            const city = await citiesController.getCityById(idCache, endpointCities); //get city by id
            //set data in session storage
            sessionStorage.setItem('editCity', JSON.stringify(city));
            //redirect to edit page
            window.location.href = '/src/views/crudCities/crud.cities.html';

            
        } else if(action === 'delete' && idCache){
            Swal.fire({
                title: "Delete",
                text: "Are you sure?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes"
            }).then(async(result) => {
                if (result.isConfirmed) {
                    await citiesController.deleteCity(idCache, endpointCities);
                    Swal.fire({
                        title: "City",
                        text: "deleted!",
                        icon: "success"
                    });
                }
            })
        }
    }
})