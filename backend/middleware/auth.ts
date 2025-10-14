import { Request, Response, NextFunction } from "express";
import db from "../db";

interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
        name: string;
        user_name: string;
        role: string;
    };
}

export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
    const userName = req.headers['x-user-name'] as string;
    console.log('Middleware: Received x-user-name header:', userName);

    if (!userName) {
        console.log('Middleware: No user name header provided');
        res.status(401).json({ message: "Unauthorized: Missing user name" });
        return;
    }

    db.query("SELECT * FROM users WHERE user_name = ?", [userName], (err, results) => {
        if (err) {
            console.log('Middleware: DB query error:', err);
            res.status(500).json(err);
            return;
        }

        const users = results as any[];
        console.log('Middleware: Query results:', users);

        if (users.length === 0) {
            console.log('Middleware: User not found for user_name:', userName);
            res.status(401).json({ message: "Unauthorized: User not found" });
            return;
        }

        const user = users[0];
        console.log('Middleware: User role:', user.role);

        if (user.role !== 'admin') {
            console.log('Middleware: User is not admin, role:', user.role);
            res.status(403).json({ message: "Forbidden: Admin access required" });
            return;
        }

        (req as AuthenticatedRequest).user = user;
        console.log('Middleware: Admin access granted');
        next();
    });
};
