import { UserType } from '@/domain/entities';
import { Request, Response, NextFunction } from 'express';

export function IsAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!req.user) throw new Error('401::Unauthenticated');
    return next();
}

export function IsAdministrator(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (req.user._userType != UserType.Admin)
        throw new Error('404::Resource Not Found');
    next();
}
