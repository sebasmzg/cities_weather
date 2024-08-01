import { ILogin, IResponseLogin } from "../model/ILogin";

export class Controller {
    url: string;
    constructor(url: string) {
        this.url = url;
    }

    async login(data: ILogin, endpoint: string):Promise<IResponseLogin> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json'
        }
        const reqOptions: RequestInit = {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        }
        const res: Response = await fetch(`${this.url}${endpoint}`, reqOptions);
        if(res.status !== 200) {
            throw new Error('Login failed');
        }
        console.log(`res.status: ${res.status}`);
        
        const token: IResponseLogin = await res.json();
        return token;

    }

}