import { inject } from 'aurelia-framework';
import { SessionService } from './session-service';

const AUTHORIZATION_HEADER = 'Authorization';

@inject(SessionService)
export class ApiInterceptor {
  constructor(private sessionService: SessionService) {
    this.sessionService = sessionService;
  }

  request(request) {
    try {
      if (!this.sessionService.hasValidSession()) {
        return request;
      }

      if (!request.headers.get(AUTHORIZATION_HEADER)) {
        const bearerToken = `Bearer ${this.sessionService.getStorageItem(SessionService.TOKEN_KEY)}`;
        request.headers.append(AUTHORIZATION_HEADER, bearerToken);
      }

      return request;
    } catch (e) {
      console.log(e);
      //this.notification.error('Something went wrong. If this error continues, please contact support.', 'Error');
    }
  }

  async response(response) {
    try {
      switch (response?.status) {
        case 401:
          await this.sessionService.clearSession();
          break;
        case 403:
          //this.notification.error('You do not have access to this section.', 'Unauthorized');
          break;
        case 404:
          return null;
        case 400:
        case 422:
        case 500:
          const data = await response.json();
          let msg = data.Message || data.message;
          if (msg) {
            let titelDependingOnMessage = response.status === 500 ? 'Error' : 'API Error';
            msg.endsWith('.') ? msg : msg = msg + '.';
           // this.notification.error(msg.replace(/(?:\r\n|\r|\n)/g, '<br />'), titelDependingOnMessage);
          }

          if (data.validationErrors) {
            let errorMsg = '';
            Object.keys(data.validationErrors).forEach((key, index) => {
              data.validationErrors[key].forEach(m => {
                errorMsg += `${m}<br>`;
              });
            });
            //this.notification.error(errorMsg, 'Error');
          }
          new Error(msg);
          break;
      }
      return response;
    } catch (e) {
      console.log(e);
      //this.notification.error('Something went wrong. If this error continues, please contact support.', 'Error');
    }
  }
}
