import { Next, Context } from 'koa';

import InstallationService from '../services/installation-service';
import { isUUID } from '../utils/uuid-util';
import ajv from '../schemas/schema-validator';
import installationSchema from '../schemas/installation-schema';

export default class InstallationController {
    constructor(private installationService: InstallationService) {}

    async getAll(ctx: Context, next: Next) {
        try {
            const allInstallations = await this.installationService.getAllInstallations();
            ctx.response.body = allInstallations;
            await next();
        } catch (err) {
            ctx.response.body = 500;
        }
    }

    async get(ctx: Context, next: Next) {
        const id = ctx.params.installationUUID;

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

        try {
            const installation = await this.installationService.getInstallation(
                id
            );

            if (installation && installation.length > 0) {
                ctx.response.body = installation[0];
            } else {
                ctx.response.body = '';
            }
            await next();
        } catch (err) {
            ctx.response.body = 500;
        }
    }

    async create(ctx: Context, next: Next) {
        const installation: IInstallation = ctx.request.body;

        const compiled = ajv.compile(installationSchema);
        const valid = compiled(installation);

        if (!valid) {
            ctx.response.body = compiled.errors;
            ctx.response.status = 400;
            return;
        }

        try {
            await this.installationService.createInstallation(installation);
            ctx.response.status = 201;
            ctx.response.body = '';
            await next();
        } catch (err) {
            // console.log(err);
            ctx.response.status = 500;
        }
    }

    async update(ctx: Context, next: Next) {
        const id = ctx.params.installationUUID;

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

        const installation: IInstallation = ctx.request.body;

        const compiled = ajv.compile(installationSchema);
        const valid = compiled(installation);

        if (!valid) {
            ctx.response.body = compiled.errors;
            ctx.response.status = 400;
            return;
        }

        try {
            await this.installationService.updateInstallation(id, installation);
            ctx.response.status = 201;
            ctx.response.body = '';
            await next();
        } catch (err) {
            ctx.response.status = 500;
        }
    }

    async delete(ctx: Context, next: Next) {
        const id = ctx.params.installationUUID;

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

        try {
            await this.installationService.deleteInstallation(id);
            ctx.response.status = 200;
            ctx.response.body = '';

            await next();
        } catch (err) {
            if (err.errno === 1451) {
                ctx.response.body = {
                    errors: [
                        {
                            message: 'Installation is connected to citizens.',
                            code: 'INSTALLATION_IS_CONNECTED',
                        },
                    ],
                };
            } else {
                ctx.response.status = 500;
            }
        }
    }

    async getCitizens(ctx: Context, next: Next) {
        const { installationUUID } = ctx.params;

        if (!isUUID(installationUUID)) {
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

        try {
            const installationCitizens = await this.installationService.getCitizens(
                installationUUID
            );

            ctx.response.body = installationCitizens;
            await next();
        } catch (err) {
            ctx.response.status = 500;
        }
    }

    async addCitizen(ctx: Context, next: Next) {
        const { installationUUID, citizenUUID } = ctx.params;

        if (!isUUID(installationUUID) || !isUUID(citizenUUID)) {
            ctx.response.status = 400;
            ctx.response.body = {
                errors: [
                    {
                        message: 'One of the ids is an invalid UUID.',
                        code: 'INVALID_IDENTIFIER',
                    },
                ],
            };

            return;
        }

        try {
            await this.installationService.addCitizen(
                citizenUUID,
                installationUUID
            );

            ctx.response.status = 201;
            ctx.response.body = '';

            await next();
        } catch (err) {
            if (err.errno === 1062) {
                ctx.response.body = {
                    errors: [
                        {
                            message: 'Installation has already that citizen.',
                            code: 'CITIZEN_EXISTS_IN_INSTALLATION',
                        },
                    ],
                };
            } else {
                ctx.response.status = 500;
            }
        }
    }

    async removeCitizen(ctx: Context, next: Next) {
        const { installationUUID, citizenUUID } = ctx.params;

        if (!isUUID(installationUUID) || !isUUID(citizenUUID)) {
            ctx.response.status = 400;
            ctx.response.body = {
                errors: [
                    {
                        message: 'One of the ids is an invalid UUID.',
                        code: 'INVALID_IDENTIFIER',
                    },
                ],
            };

            return;
        }

        try {
            await this.installationService.removeCitizen(
                citizenUUID,
                installationUUID
            );

            ctx.response.status = 201;
            ctx.response.body = '';
            
            await next();
        } catch (err) {
            ctx.response.status = 500;
        }
    }
}
