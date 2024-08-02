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

        const title = <HTMLElement> document.createElement('h3');
        title.classList.add('card-title');
        title.textContent = data.name;

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
        editButton.dataset.id = data.id;
        editButton.dataset.action = 'edit';

        const deleteButton = <HTMLElement> document.createElement('button');
        deleteButton.classList.add('card-delete');
        deleteButton.textContent = 'Delete';
        deleteButton.dataset.id = data.id;
        deleteButton.dataset.action = 'delete';

        //agregar elementos al contenedor
        container.appendChild(title);
        container.appendChild(country);
        container.appendChild(description);
        container.appendChild(date);
        container.appendChild(editButton);
        container.appendChild(deleteButton);

        //agregar contenedor al contenedor principal
        this.container.appendChild(container);
    }
}