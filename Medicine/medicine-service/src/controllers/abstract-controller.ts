import { Context } from 'koa';
import ajv from '../schemas/schema-validator';
import { isUUID } from '../utils/uuid-util';

export default abstract class AbstractController {
  protected validSchema(
    ctx: Context,
    schema: Record<string, unknown>,
    input: Record<string, unknown>
  ): boolean {
    const compiled = ajv.compile(schema);
    const valid = compiled(input);

    if (!valid) {
      ctx.throw(400, compiled.errors);
    }

    return <boolean>valid;
  }

  protected validIdentifiers(
    ctx: Context,
    identifiers: string | Array<string>
  ): boolean {
    if (!isUUID(identifiers)) {
      const message = Array.isArray(identifiers)
        ? 'One of the identifiers is not an UUID.'
        : 'The inserted identifier is not an UUID.';

      ctx.throw(400, message);
    }

    return true;
  }
}
