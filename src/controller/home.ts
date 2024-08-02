import Swal from 'sweetalert2';
const logout = document.getElementById('logout') as HTMLButtonElement;
const token = sessionStorage.getItem('token');

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
    