import { Context, Next } from 'koa';
import { PassThrough } from 'stream';
import { Service } from 'typedi';
import CitizenSseService from '../services/citizen-sse-service';
import AbstractController from './abstract-controller';

// https://medium.com/trabe/server-sent-events-sse-streams-with-node-and-koa-d9330677f0bf
@Service()
export default class CitizenSseController extends AbstractController {
  constructor(private citizenSseService: CitizenSseService) {
    super();
  }

  async getCitizenEvents(ctx: Context, next: Next) {
    const id = ctx.params.citizenUUID;
    console.log(ctx.header);

    try {
      // if (!isUUID(id)) {
      //   ctx.throw(400, 'The inserted identifier is not an UUID.');
      // }
      if (!this.validIdentifiers(ctx, id)) return;

      ctx.set({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      });

      ctx.req.socket.setTimeout(0);
      ctx.req.socket.setNoDelay(true);
      ctx.req.socket.setKeepAlive(true);

      const stream = new PassThrough();
      ctx.status = 200;
      ctx.body = stream;

      const listener = (data: string): void => {
        stream.write(`data: ${data}\n\n`);
      };
      stream.on('close', () => {
        this.citizenSseService.removeListener(id, listener);
        this.citizenSseService.emitTotalEvent(id);
      });

      this.citizenSseService.addListener(id, listener);
      this.citizenSseService.emitTotalEvent(id);

      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  }
}
