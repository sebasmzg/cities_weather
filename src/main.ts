import { ILogin } from "./model/ILogin";
import { Controller } from "./controller/controllers";

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
});
