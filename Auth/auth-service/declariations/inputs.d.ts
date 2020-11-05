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
    refreshToken: string;
}

interface ISelect {
    installationUUID: string;
    tokens: ITokens;
}
