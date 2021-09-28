import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Client } from 'src/clients/client.entity';
import { Provider } from 'src/providers/provider.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): Client | Provider => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
