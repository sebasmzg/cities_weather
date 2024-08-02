import Swal from "sweetalert2";

export function showLoading(){
    Swal.fire({
        title: 'Welcome',
        html: 'Please wait... ',
        allowOutsideClick: false,
        showConfirmButton: false, 
        willOpen: ()=>{
            Swal.showLoading();
        }
    });
}