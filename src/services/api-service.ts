import {inject, buildQueryString} from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(HttpClient)
export class ApiService {
  constructor(private http: HttpClient) {
  }

  async _request(path, options) {
    const result = await this.http.fetch(path, options);
    if (result) {
      const status = result.status;
      if (status === 204) {
        return null;
      }

      if (status >= 400) {
        return null;
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
      path += `?${buildQueryString(params)}`;
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
