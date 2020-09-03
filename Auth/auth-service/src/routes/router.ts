import Router from 'koa-router';

const router = new Router();

interface AuthBody {
    username: string;
    password: string;
}

router.post('/register', (ctx, next) => {
    const { username, password }: AuthBody = ctx.request.body

    if (username.startsWith("t")) {
        ctx.response.status = 400
    } else {
        ctx.response.status = 200
    }
})

router.post('/login', (ctx, next) => {
    const { username, password }: AuthBody = ctx.request.body

    ctx.response.status = 400

    if (username === "dennis" || username === "erik") {
        if (password === "sdu" || password === "AFPE20") {
            ctx.response.status = 200

            ctx.body = {
                accessToken: "flksdjksljfklfjsdfjasdklfasdf",
                refreshToken: "dasdkaodkasdsadawoidjdsofsd"
            }
        }
    }
})

router.post('/refresh', (ctx, next) => {
    const { refreshToken } = ctx.request.body

    // if (refreshToken.isValid) {}

    ctx.body = {
        accessToken: "flksdjksljfklfjsdfjasdklfasdf"
    }
})

export default router;
