import bcrypt from 'bcryptjs';
import { Service } from 'typedi';
import RoleRepository from '../database/role-repository';
import UserRepository from '../database/user-repository';
import { signAccessToken, signRefreshToken, verify } from '../utils/token';
import ExistsError from '../errors/exists-error';

@Service()
export default class UserService {
  constructor(
    private userRepository: UserRepository,
    private roleRepository: RoleRepository
  ) {}

  async createUser(body: IRegister) {
    const password_hashed = bcrypt.hashSync(
      body.password,
      bcrypt.genSaltSync(10)
    );

    body.password = password_hashed;

    try {
      await this.userRepository.create(body);
    } catch (err) {
      if (err.errno === 1062) {
        throw new ExistsError('User already exists.');
      } else {
        throw err;
      }
    }
  }

  async login(info: ILogin): Promise<ITokens | null> {
    const user = await this.userRepository.find(info.username, info.cpr);

    if (user && bcrypt.compareSync(info.password, user.password_hash)) {
      return {
        accessToken: signAccessToken({
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
        }),
        refreshToken: signRefreshToken({ userId: user.id }),
      };
    }

    return null;
  }

  async refresh(tokens: IRefresh): Promise<string | null> {
    const refreshToken = <IDecodedRefreshToken>verify(tokens.refreshToken);

    const user = await this.userRepository.get(refreshToken.userId);
    const accessRights = await this.roleRepository.getAccessRightsByUsername(
      refreshToken.installationId,
      user.username
    );

    return signAccessToken({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      permissions: accessRights,
    });
  }

  async updateTokensWithInstallation(
    tokens: ITokens,
    installationUUID: string
  ): Promise<ITokens> {
    const refreshTokenDecode = <IDecodedRefreshToken>(
      verify(tokens.refreshToken)
    );
    const accessTokenDecode = <IDecodedAccessToken>verify(tokens.accessToken);

    const accessRights = await this.roleRepository.getAccessRightsByUsername(
      installationUUID,
      accessTokenDecode.username
    );

    const newAccessToken = signAccessToken({
      firstname: accessTokenDecode.firstName,
      lastname: accessTokenDecode.lastName,
      username: accessTokenDecode.username,
      permissions: accessRights,
    });

    const newRefreshToken = signRefreshToken({
      userId: refreshTokenDecode.userId,
      installationId: installationUUID,
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async getOnUsername(username: string): Promise<IUser> {
    return this.userRepository.find(username);
  }
}
