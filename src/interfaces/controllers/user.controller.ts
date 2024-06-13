import { JwtService, UserService } from '@/application/services';
import { Request, Response } from 'express';

export class UserController {
    private userService: UserService;
    private jwtService: JwtService;
    constructor(userService: UserService, jwtService: JwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    signupUser = async (req: Request, res: Response) => {
        const user = await this.userService.signUp(req.body);
        return res.status(201).json(user);
    };

    loginUser = async (req: Request, res: Response) => {
        const user = await this.userService.login(req.body);
        return res.status(200).json(user);
    };

    refreshAccessToken = async (req: Request, res: Response) => {
        const accessToken = this.userService.exchangeRefreshTokenForAccessToken(
            req.body.refreshToken
        );
        res.json({ accessToken });
    };

    getUserDetails = async (req: Request, res: Response) => {
        const user = await this.userService.getUserById(Number(req.params.id));
        return res.status(200).json(user);
    };

    updateUserById = async (req: Request, res: Response) => {
        const user = await this.userService.updateUser(
            Number(req.params.id),
            req.body
        );
        return res.status(202).json(user);
    };

    deleteUserById = async (req: Request, res: Response) => {
        const user = await this.userService.deleteUser(Number(req.params.id));
        return res.status(204).end();
    };

    getUserInfoByGoogle = async (req: Request, res: Response) => {
        const decode = await this.jwtService.decodeGoogleToken(req.body.token);
        res.json(decode);
    };

    loginByGoogle = async (req: Request, res: Response) => {
        const decode = await this.jwtService.decodeGoogleToken(req.body.token);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const userData = { email: decode.email, password: null };
        const user = await this.userService.loginByGoogle(userData);
        return res.status(200).json(user);
    };
}
