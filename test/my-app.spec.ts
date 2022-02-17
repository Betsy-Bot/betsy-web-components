import { render } from './helper';
import { App } from '../src/app';

describe('my-app', () => {
  it('should render message', async () => {
    const node = (await render('<my-app></my-app>', App)).firstElementChild;
    const text =  node.textContent;
    expect(text.trim()).toBe('Hello World!');
  });
});
