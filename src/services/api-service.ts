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
        response = await result.json();
      }

      if (status >= 200 && status < 400) {
        return response;
      }
    }
    return null;
  }

  doGet(path, params = null) {
    const options = {
      method: 'GET'
    };

    if (params) {
      path += `?${buildQueryString(params)}`;
    }

    return this._request(path, options);
  }

  doPatch(path, body) {
    const options = {
      method: 'PATCH',
      body: json(body)
    };

    return this._request(path, options);
  }

  doPost(path, body, isFile = false) {
    return this._push(path, body, false, isFile);
  }

  doPut(path, body) {
    return this._push(path, body, true);
  }

  _fileUpload(path, formData) {
    const options = {
      method: 'POST',
      body: formData
    };
    return this._request(path, options);
  }

  doDelete(path) {
    const options = {
      method: 'DELETE'
    };

    return this._request(path, options);
  }

  _push(path, body, asPut = false, isFile = false) {
    const options = {
      method: asPut ? 'PUT' : 'POST',
      body: isFile ? body : json(body)
    };

    return this._request(path, options);
  }
}
