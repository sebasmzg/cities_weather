import { ICity } from "../model/models";

export class CardTemplate {
    private container: HTMLDivElement;
    constructor(container: HTMLDivElement){
        this.container = container;
    }

    //metodo para crear la tarjeta
    cardTemplate(data: ICity){
        const container = <HTMLElement> document.createElement('figure');
        container.classList.add('card');
        container.textContent = data.name;

        const title = <HTMLElement> document.createElement('h3');
        title.classList.add('card-title');
        title.textContent = data.country;

        const country = <HTMLElement> document.createElement('p');
        country.classList.add('card-country');
        country.textContent = data.country;

        const description = <HTMLElement> document.createElement('p');
        description.classList.add('card-description');
        description.textContent = data.description;

        const date = <HTMLElement> document.createElement('p');
        date.classList.add('card-date');
        date.textContent = data.date.toString();
    }
}