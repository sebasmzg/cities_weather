import Swal from 'sweetalert2';
import { CitiesController } from './cities.crud';
import { CardTemplate } from './card.template';
import { ICity, IWeather } from '../model/models';
import { getColorByTemp } from './temp.controller';


//DOM elements
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



/* logout function */
export function logout(){
    const logout = document.getElementById('logout') as HTMLButtonElement;
    logout.addEventListener('click',()=>{
        Swal.fire({
            title: "Logout",
            text: "Are you sure",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            background: '#181818',
            color: '#fff'
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.removeItem('token');
                window.location.href = '/';
            }
        })
                
    })
}

logout();

const citiesController = new CitiesController(urlCities);
citiesController.getCities(endpointCities)

//render cards
export async function loadCityCards(){
    try {
        const response = await citiesController.getCities(endpointCities);
        const cities: ICity[] = response;
        citiesContainer.innerHTML = ''; //clean the container before rendering the cards
        cities.forEach(async (city)=>{
            const res: Response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=a9ddd42079273baf62bb1a5f1991e805`);
            const data: IWeather = await res.json();
            const color = await getColorByTemp(data.main.temp);
            const cardTemplate = new CardTemplate(citiesContainer);
            cardTemplate.cardTemplate(city, data.main.temp,color);
        });
    } catch (error) {
        console.error('Error loading cities', error);
        throw error;
    }
}

//load cards
document.addEventListener('DOMContentLoaded', async()=>{

    //edit and delete cards
    citiesContainer.addEventListener('click', async(e:Event)=>{
        const target = e.target as HTMLElement;
    
        if(target instanceof HTMLElement){
            const action = target.dataset.action;
            const idCache = target.dataset.id;

            if (action === 'info' && idCache) {
                const city = await citiesController.getCityById(idCache, endpointCities);
                Swal.fire({
                    title: city.name,
                    html: `
                        <p><strong>Description:</strong> ${city.description}</p>
                        <p><strong>Date:</strong> ${city.date}</p>
                    `,
                    icon: 'info',
                    confirmButtonText: 'Close',
                    background: '#181818',
                    color: '#fff'
                });
            }
    
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
                    confirmButtonText: "Yes",
                    background: '#181818',
                    color: '#fff'
                }).then(async(result) => {
                    if (result.isConfirmed) {
                        await citiesController.deleteCity(idCache, endpointCities);
                        Swal.fire({
                            title: "City",
                            text: "deleted!",
                            icon: "success",
                            background: '#181818',
                            color: '#fff'
                        }).then(async ()=>{
                            await loadCityCards();
                        })
                    }
                })
            }
        }
    })
    

    loadCityCards();
});

