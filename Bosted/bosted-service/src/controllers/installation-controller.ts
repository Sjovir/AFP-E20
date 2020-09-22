import { Next, Context } from 'koa';
import InstallationService from '../services/installation-service';

export default class InstallationController {
    constructor(private installationService: InstallationService) {}

    async get(ctx: Context, next: Next) {
        ctx.response.body = 'GET Installation';
        // const compiled = ajv.compile(schema);
        // const valid = compiled(ctx.request.body);

        // if (!valid) {
        //     ctx.response.body = compiled.errors;
        //     ctx.response.status = 400;
        //     return;
        // }

        await next();
    }

    async getAll(ctx: Context, next: Next) {
        ctx.response.body = 'GET All Installations';
        // const compiled = ajv.compile(schema);
        // const valid = compiled(ctx.request.body);

        // if (!valid) {
        //     ctx.response.body = compiled.errors;
        //     ctx.response.status = 400;
        //     return;
        // }

        await next();
    }

    async create(ctx: Context, next: Next) {
        ctx.response.body = 'POST Create';
        // const compiled = ajv.compile(schema);
        // const valid = compiled(ctx.request.body);

        // if (!valid) {
        //     ctx.response.body = compiled.errors;
        //     ctx.response.status = 400;
        //     return;
        // }

        await next();
    }

    async update(ctx: Context, next: Next) {
        ctx.response.body = 'PUT Update';
        // const compiled = ajv.compile(schema);
        // const valid = compiled(ctx.request.body);

        // if (!valid) {
        //     ctx.response.body = compiled.errors;
        //     ctx.response.status = 400;
        //     return;
        // }

        await next();
    }

    async delete(ctx: Context, next: Next) {
        ctx.response.body = 'DELET Installation';
        // const compiled = ajv.compile(schema);
        // const valid = compiled(ctx.request.body);

        // if (!valid) {
        //     ctx.response.body = compiled.errors;
        //     ctx.response.status = 400;
        //     return;
        // }

        await next();
    }
}
