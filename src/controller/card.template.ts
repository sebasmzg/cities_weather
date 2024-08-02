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

        const cardContainer = <HTMLElement> document.createElement('figure');
        cardContainer.classList.add('card');

        const imgContainer = <HTMLElement> document.createElement('div');
        imgContainer.classList.add('card-image-container');

        const infoContainer = <HTMLElement> document.createElement('div');
        infoContainer.classList.add('card-info-container');

        const image = <HTMLImageElement> document.createElement('img');
        image.classList.add('card-image');
        image.src = data.url;

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

        const infoButton = <HTMLElement> document.createElement('button');
        infoButton.classList.add('card-info');
        infoButton.textContent = 'Info';
        infoButton.dataset.id = data.id;
        infoButton.dataset.action = 'info';

        //info container elements
        infoContainer.appendChild(description);
        infoContainer.appendChild(date);

        //agregar info container al contenedor principal
        cardContainer.appendChild(infoContainer);

        //agregar img al div contenedor
        imgContainer.appendChild(image);

        //agregar img al contenedor
        cardContainer.appendChild(imgContainer);

        //card container elements
        cardContainer.appendChild(title);
        cardContainer.appendChild(country);
        cardContainer.appendChild(editButton);
        cardContainer.appendChild(deleteButton);
        cardContainer.appendChild(infoButton);

        //agregar contenedor al contenedor principal
        this.container.appendChild(cardContainer);
    }
}