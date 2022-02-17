import { HttpClient, inject } from 'aurelia';

@inject(HttpClient)
export class ApiService {
    constructor(private http: HttpClient) {
        http.configure((config) =>
            config
                .withBaseUrl('http://localhost:5000/')
        );
    }

    async _request(path: string, options: object): Promise<null | any> {
        const result = await this.http.fetch(path, options);
        if(result) {
            const status = result.status;
            if(status === 204) {
                return null;
            }

            if (status >= 400) {
                return null;
            }

            let response;
            if (result) {
                response = await result.json();
            }

            if (status >= 200 && status < 400) {
                return response;
            }
        }
        return null;
    }

    doGet(path: string, params: Record<string, string>) {
        const options = {
            method: 'GET'
        };

        if (params) {
            path += `?${new URLSearchParams(params).toString()}`;
        }

        return this._request(path, options);
    }
}
