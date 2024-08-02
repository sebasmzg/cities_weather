export class TempController {
    url: string;
    constructor(url:string){
        this.url = url;
    }
    //method to get the temp
    async getTemp(cityName: string,apiKey:string):Promise<string>{
        const res: Response = await fetch(`${this.url}${cityName}&appid=${apiKey}`);
        if(res.status !== 200){
            throw new Error(`Failed to get temp. Error: ${res.status}`);
        }
        const temp:string = await res.json();
        return temp;
    }
}
const key = 'a9ddd42079273baf62bb1a5f1991e805'
const cityName = 'medellin'
const tempController = new TempController('https://api.openweathermap.org/data/2.5/weather?q=');
tempController.getTemp(cityName,key)
console.log(await tempController.getTemp(cityName,key));
