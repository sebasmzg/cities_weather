import { ILogin } from "./model/models";
import { Controller } from "./controller/controllers";
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

  console.log(formData);
  const pageController = new Controller(url)
  const token = await pageController.login(formData, endpoint)
  sessionStorage.setItem('token', token.token);
  console.log('token:',token);
  Swal.fire({
    title: "Hello!",
    text: "you are logged in",
    icon: "success"
  });
  form.reset();
});
