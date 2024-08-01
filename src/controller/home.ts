import Swal from 'sweetalert2';
import { CitiesController } from './cities.crud';
const logout = document.getElementById('logout') as HTMLButtonElement;
const token = sessionStorage.getItem('token');
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

if(token){
    Swal.fire({
        title: "Hello!",
        text: "you are logged in",
        icon: "success"
    });
}

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