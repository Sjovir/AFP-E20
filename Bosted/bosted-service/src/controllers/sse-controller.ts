import { Context } from 'koa';
import { PassThrough } from 'stream';
import { Service } from 'typedi';
import SseService from '../services/sse-service';
import { isUUID } from '../utils/uuid-util';

@Service()
export default class SseController {
  constructor(private sseService: SseService) {}

  getCitizenEvents(ctx: Context) {
    const id = ctx.params.citizenUUID;

    if (!isUUID(id)) {
      ctx.response.status = 400;
      ctx.response.body = {
        errors: [
          {
            message: 'The inserted id is not an UUID.',
            code: 'INVALID_IDENTIFIER',
          },
        ],
      };

      return;
    }

    ctx.request.socket.setTimeout(0);
    ctx.req.socket.setNoDelay(true);
    ctx.req.socket.setKeepAlive(true);

    ctx.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });

    const stream = new PassThrough();
    ctx.status = 200;
    ctx.body = stream;

    const listener = (data) => {
      stream.write(`data: ${data}\n\n`);
    };

    this.sseService.addCitizenListener(listener);
  }
}
