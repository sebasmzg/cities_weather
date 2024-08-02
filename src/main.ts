import { ILogin } from "./model/models";
import { Controller } from "./controller/user.controller";
import Swal from "sweetalert2";

const form = document.getElementById('form') as HTMLFormElement;
const email = document.getElementById('email') as HTMLInputElement;
const password = document.getElementById('password') as HTMLInputElement;

const url = 'https://reqres.in/api/'
const endpoint = 'login'

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData: ILogin = {
    email: email.value,
    password: password.value
  };

  try{
    const pageController = new Controller(url)
    const token = await pageController.login(formData, endpoint)
    sessionStorage.setItem('token', token.token);
    const getToken = sessionStorage.getItem('token');
    //pantalla de carga

    form.reset();
    if(getToken){
      window.location.href = './src/views/home/home.html';
    }
  } catch{
    if(!email.value || !password.value){
      Swal.fire({
        title: "Oops!",
        text: "Login failed, please fill in all the fields",
        icon: "error"
      });
    }
  };
});
