import {IRouteViewModel, route} from "aurelia";

@route({
    routes: [
        {
            path: 'login',
            component: import('./pages/login/login'),
            title: 'Login',
        }
    ]
})
export class App implements IRouteViewModel {
  public message = 'Hello World!';

  public url = 'https://discord.com/api/oauth2/authorize?client_id=414202113070202880&redirect_uri=http%3A%2F%2Flocalhost%3A9000%2Flogin&response_type=code&scope=email%20identify';
}
