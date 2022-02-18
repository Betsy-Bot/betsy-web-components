import { HttpClient, inject, json } from 'aurelia';

@inject(HttpClient)
export class ApiService {
    constructor(private http: HttpClient, private sessionService) {
        http.configure((config) =>
            config
                .withBaseUrl('http://localhost:5000/')
                .withInterceptor({
                    request(request) {
                        const token = window.localStorage['jwt_token'];
                        if (token) { request.headers.append('Authorization', 'Bearer ' + token); }
                        return request
                    }
                })
        );
    }

    async _request(path: string, options: object): null | Promise<any> {
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

    _push(path: string, body: Record<string, string>, asPut = false, isFile = false) {
        const options = {
            method: asPut ? 'PUT' : 'POST',
            body: isFile ? body : json(body)
        };

        return this._request(path, options);
    }

    _fileUpload(path: string, formData: FormData) {
        const options = {
            method: 'POST',
            body: formData
        };
        return this._request(path, options);
    }

    doGet(path: string, params?: Record<string, string>): Promise<any> {
        const options = {
            method: 'GET'
        };

        if (params) {
            path += `?${new URLSearchParams(params).toString()}`;
        }

        return this._request(path, options);
    }

    doPost(path: string, body: Record<string, string>, isFile = false) {
        return this._push(path, body, false, isFile);
    }

    doPut(path: string, body: Record<string, string>) {
        return this._push(path, body, true);
    }

    doDelete(path: string) {
        const options = {
            method: 'DELETE'
        };

        return this._request(path, options);
    }
}
