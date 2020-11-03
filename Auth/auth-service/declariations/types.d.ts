interface IUser {
    id?: string;
    firstName: string;
    lastName: string;
    cpr: string;
    username: string;
    password_hash: string;
}

interface IInstallation {
    id?: string;
    name: string;
    address: string;
}

interface ITokens {
    accessToken: string;
    refreshToken: string;
}

interface IDecodedAccessToken {
    firstName: string;
    lastName: string;
    username: string;
    permissions: string[];
}

interface IDecodedRefreshToken {
    userId: string;
    installationId: string;
}
