import { ICity } from "../model/models";

export class CardTemplate {
    //propiedad para el contenedor
    private container: HTMLDivElement;
    //constructor para el contenedor recibe un div
    constructor(container: HTMLDivElement){
        this.container = container;
    } 

    //metodo para crear la tarjeta
    cardTemplate(data: ICity, temp: number, color:string){
        //creacion de elementos, agrefar clases y contenido

        const cardContainer = <HTMLDivElement> document.createElement('figure');
        cardContainer.classList.add('card');
        cardContainer.style.setProperty('--card-color', color);

        const imgContainer = <HTMLDivElement> document.createElement('div');
        imgContainer.classList.add('card-image-container');

        const infoContainer = <HTMLDivElement> document.createElement('div');
        infoContainer.classList.add('card-info-container');

        const image = <HTMLImageElement> document.createElement('img');
        image.classList.add('card-image');
        image.src = data.url;

        const title = <HTMLHeadingElement> document.createElement('h3');
        title.classList.add('card-title');
        title.textContent = data.name;

        const country = <HTMLParagraphElement> document.createElement('p');
        country.classList.add('card-country');
        country.textContent = data.country;

        const temperature = <HTMLParagraphElement> document.createElement('p');
        temperature.classList.add('card-temperature');
        temperature.textContent = `${(temp-273.15).toFixed(2)}°C`;

        const description = <HTMLParagraphElement> document.createElement('p');
        description.classList.add('card-description');
        description.textContent = data.description;

        const date = <HTMLParagraphElement> document.createElement('p');
        date.classList.add('card-date');
        date.textContent = data.date.toString();

        const editButton = <HTMLButtonElement> document.createElement('button');
        editButton.classList.add('card-button');
        editButton.id = 'edit-button';
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.dataset.id = data.id;
        editButton.dataset.action = 'edit';

        const deleteButton = <HTMLButtonElement> document.createElement('button');
        deleteButton.classList.add('card-button');
        deleteButton.id = 'delete-button';
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.dataset.id = data.id;
        deleteButton.dataset.action = 'delete';

        const infoButton = <HTMLButtonElement> document.createElement('button');
        infoButton.classList.add('card-button');
        infoButton.id = 'info-button';
        infoButton.textContent = 'Info';
        infoButton.dataset.id = data.id;
        infoButton.dataset.action = 'info';

        //info container elements
        infoContainer.appendChild(description);
        infoContainer.appendChild(date);

        //agregar img al div contenedor
        imgContainer.appendChild(image);

        //agregar img al contenedor
        cardContainer.appendChild(imgContainer);

        //card container elements
        cardContainer.appendChild(editButton);
        cardContainer.appendChild(deleteButton);
        cardContainer.appendChild(title);
        cardContainer.appendChild(country);
        cardContainer.appendChild(temperature);
        cardContainer.appendChild(infoButton);

        //agregar contenedor al contenedor principal
        this.container.appendChild(cardContainer);
    }
}

