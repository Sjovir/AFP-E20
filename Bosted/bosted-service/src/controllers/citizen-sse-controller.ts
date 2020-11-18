import { Context } from 'koa';
import { PassThrough } from 'stream';
import { Service } from 'typedi';
import CitizenSseService from '../services/citizen-sse-service';
import { isUUID } from '../utils/uuid-util';

// https://medium.com/trabe/server-sent-events-sse-streams-with-node-and-koa-d9330677f0bf
@Service()
export default class CitizenSseController {
  constructor(private citizenSseService: CitizenSseService) {}

  getCitizenEvents(ctx: Context) {
    const id = ctx.params.citizenUUID;

    try {
      if (!isUUID(id)) {
        ctx.throw(400, 'The inserted identifier is not an UUID.');
      }

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
    } catch (err) {
      ctx.throw(500, err);
    }
  }
}
