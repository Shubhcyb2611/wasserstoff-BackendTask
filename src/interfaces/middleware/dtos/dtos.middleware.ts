import { Request, Response, NextFunction } from 'express';
import { plainToInstance, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export const UseRequestDto = (dto: any) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> => {
        if (!req.body) return next();
        req.body = plainToInstance(dto, req.body, {
            excludeExtraneousValues: false,
        });
        const validationErrors = await validate(req.body, {
            whitelist: true,
        });
        if (validationErrors.length > 0) {
            return res.status(400).json({
                error: {
                    code: 400,
                    errors: validationErrors.map((e) => ({
                        field: e.property,
                        errors: Object.values(e.constraints),
                    })),
                },
            });
        }
        return next();
    };
};

export const UseResponseDto = (dto: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const transformedDto = plainToInstance(dto, res.locals.responseData, {
            excludeExtraneousValues: true,
        });
        res.locals.responseDTO = transformedDto;
        return next();
    };
};

export const ValidateArray = (dto: any) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> => {
        if (!req.body || !Array.isArray(req.body)) return next();
        req.body = plainToInstance(dto, req.body, {
            excludeExtraneousValues: false,
        });
        const arrayData = req.body;
        for (const data of arrayData) {
            const validationErrors = await validate(
                Object.assign(new dto(), data)
            );
            if (validationErrors.length > 0) {
                return res.status(400).json({
                    error: {
                        code: 400,
                        errors: validationErrors.map((e) => ({
                            field: e.property,
                            errors: Object.values(e.constraints),
                        })),
                    },
                });
            }
        }
        return next();
    };
};
