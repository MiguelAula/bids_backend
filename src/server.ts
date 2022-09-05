import { App } from './app';
import { buildResources } from './resources';

new App(buildResources()).serve(3000);