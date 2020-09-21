import { Next, Context } from 'koa';

class ControllerTemplate {
    // constructor() {}

    async post(ctx: Context, next: Next) {
        ctx.response.body = 'POST Protocol received!';
        // const compiled = ajv.compile(schema);
        // const valid = compiled(ctx.request.body);

        // if (!valid) {
        //     ctx.response.body = compiled.errors;
        //     ctx.response.status = 400;
        //     return;
        // }

        next();
    }
}

export default ControllerTemplate;
