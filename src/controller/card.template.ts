import { ICity } from "../model/models";

export class CardTemplate {
    //propiedad para el contenedor
    private container: HTMLDivElement;
    //constructor para el contenedor recibe un div
    constructor(container: HTMLDivElement){
        this.container = container;
    } 

    //metodo para crear la tarjeta
    cardTemplate(data: ICity){
        //creacion de elementos, agrefar clases y contenido

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

        const editButton = <HTMLElement> document.createElement('button');
        editButton.classList.add('card-edit');
        editButton.textContent = 'Edit';

        const deleteButton = <HTMLElement> document.createElement('button');
        deleteButton.classList.add('card-delete');
        deleteButton.textContent = 'Delete';

        //agregar elementos al contenedor
        container.appendChild(title);
        container.appendChild(country);
        container.appendChild(description);
        container.appendChild(date);

        //agregar contenedor al contenedor principal
        this.container.append(container);
    }
}