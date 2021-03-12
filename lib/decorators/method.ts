import { ROUTES } from '../common/constant';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface Route {
  propertyKey: string | symbol;
  method: HttpMethod;
  path: string;
}

export type RouterDecoratorFactory = (path?: string) => MethodDecorator;
export function createRouterDecorator(
  method: HttpMethod
): RouterDecoratorFactory {
  return (path?: string) => (target: any, propertyKey: string | symbol) => {
    const route: Route = {
      propertyKey,
      method,
      path: path || '',
    };
    if (!Reflect.getMetadata(ROUTES, target)) {
      Reflect.defineMetadata(ROUTES, [], target);
    }
    const routes = Reflect.getMetadata(ROUTES, target);
    routes.push(route);
  };
}

export const Get = createRouterDecorator('GET');
export const Post = createRouterDecorator('POST');
export const Put = createRouterDecorator('PUT');
export const Delete = createRouterDecorator('DELETE');
