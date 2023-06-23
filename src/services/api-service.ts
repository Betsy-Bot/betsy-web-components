import { inject } from 'aurelia';
import { IHttpClient, json } from '@aurelia/fetch-client';

import { apiEndpoint } from "../environment";

import { ApiInterceptor } from "./api-interceptor";

@inject(IHttpClient, ApiInterceptor)
export class ApiService {
    constructor(readonly http: IHttpClient, readonly interceptor: ApiInterceptor) {
        http.configure(config =>
            config.withBaseUrl(apiEndpoint())
                .withInterceptor(
                    {
                        request(request) {
                            return interceptor.request(request);
                        },
                        response(response) {
                            return interceptor.response(response);
                        }
                    }
                )
                .withDefaults({
                    headers: {
                        'Accept': 'application/json'
                    }
                })
        )
    }

    async _request(path: string, options?: RequestInit) {
        const result = await this.http.fetch(path, options);
        if (result) {
            const status = result.status;
            if (status === 204) {
                return null;
            }

            if (status >= 400) {
                throw "Error";
            }

            let response;
            if (result) {
                try {
                    response = await result.json();
                } catch(e){
                    response = result;
                }
            }

            if (status >= 200 && status < 400) {
                return response;
            }
        }
        return null;
    }

    async doGet(path, params = null) {
        const options = {
            method: 'GET'
        };

        if (params) {
            path += `?${new URLSearchParams(params).toString()}`;
        }

        return this._request(path, options);
    }

    async doPatch(path, body) {
        const options = {
            method: 'PATCH',
            body: json(body)
        };

        return this._request(path, options);
    }

    async doPost(path, body, isFile = false) {
        return this._push(path, body, false, isFile);
    }

    async doPut(path, body) {
        return this._push(path, body, true);
    }

    async _fileUpload(path, formData) {
        const options = {
            method: 'POST',
            body: formData
        };
        return this._request(path, options);
    }

    async doDelete(path) {
        const options = {
            method: 'DELETE'
        };

        return this._request(path, options);
    }

    async _push(path, body, asPut = false, isFile = false) {
        const options = {
            method: asPut ? 'PUT' : 'POST',
            body: isFile ? body : json(body)
        };

        return this._request(path, options);
    }
}
