import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';

export const validateRequest = <T>(type: new () => T) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const input = plainToInstance(type, req.body);
        const errors = await validate(input as object);

        if (errors.length > 0) {
            return res.status(400).json(
                errors.map(error => ({
                    property: error.property,
                    constraints: error.constraints
                }))
            );
        }

        (req as any).validatedBody = input;
        next();
    };
};