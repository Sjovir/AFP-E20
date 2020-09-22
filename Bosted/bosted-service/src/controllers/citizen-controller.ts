import { Next, Context } from 'koa';
import CitizenService from '../services/citizen-service';

export default class CitizenController {
    constructor(private citizenService: CitizenService) {}

    async get(ctx: Context, next: Next) {
        ctx.response.body = 'GET Citizen';
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
        ctx.response.body = 'GET All Citizens';
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
        ctx.response.body = 'DELETE Citizen';
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
