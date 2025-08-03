import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    console.log('API Key:', apiKey); // Debugging line to check the API key
    return apiKey === 'my-secret-api-key'; // Replace with your actual API key validation logic
  }
}
