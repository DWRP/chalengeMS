import {Request,Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import { promisify } from "util";

class AuthController {
    async AuthCheck(req: Request, res: Response, next: NextFunction){
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).send({ error: "No token provided" });
        }

        const [, token] = authHeader.split(" ");

        try {
            await promisify(jwt.verify)(token, process.env.SECRET || "secret");

            return next();
        } catch (err) {
            return res.status(401).send({ error: "Token invalid" });
        }
    }

    async compareHash(hash:string, password: string) {
		return bcrypt.compare(hash, password);
	}

	async generateToken(email:string) {
		return jwt.sign({ email }, process.env.SECRET || "secret", {
			expiresIn: 86400
		});
	}
};

export default new AuthController()