import { ILogin } from "../model/ILogin";

export class Controller {
    url: string;
    constructor(url: string) {
        this.url = url;
    }

    async login(data: ILogin, endpoint: string) {
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
        const resBodyLogin: ILogin = await res.json();
        return resBodyLogin;

    }

}