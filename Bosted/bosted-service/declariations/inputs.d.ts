interface IRegister {
    firstName: string;
    lastName: string;
    cpr: string;
    username: string;
    password: string;
}

interface ILogin {
    cpr?: string;
    username?: string;
    password: string;
}

interface IRefresh {
    accessToken: string;
    refreshToken: string;
}
