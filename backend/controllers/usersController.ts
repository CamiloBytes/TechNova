import { Request, Response } from "express";
import db from "../db";

export const getUsers = (req: Request, res: Response): void => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.json(results);
    });
};

export const createUser = (req: Request, res: Response): void => {
    const { name, user_name, password, role } = req.body;
    const userRole = user_name === 'admin' ? 'admin' : (role || 'customer');
    db.query(
        "INSERT INTO users (name, user_name, password, role) VALUES (?, ?, ?, ?)",
        [name, user_name, password, userRole],
        (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            res.json({ id: (result as any).insertId, name, user_name, role: userRole });
        }
    );
};

export const loginUser = (req: Request, res: Response): void => {
    const { user_name, password } = req.body;
    db.query(
        "SELECT * FROM users WHERE user_name = ? AND password = ?",
        [user_name, password],
        (err, results) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            if ((results as any[]).length === 0) {
                res.status(401).json({ message: "Invalid credentials" });
                return;
            }
            const user = (results as any[])[0];
            res.json({ user: { id: user.id, name: user.name, user_name: user.user_name, role: user.role } });
        }
    );
};

export const updateUser = (req: Request, res: Response): void => {
    const { id } = req.params;
    const { name, user_name, password, role } = req.body;
    db.query(
        "UPDATE users SET name = ?, user_name = ?, password = ?, role = ? WHERE id = ?",
        [name, user_name, password, role, id],
        (err) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            res.json({ id, name, user_name, role });
        }
    );
};

export const deleteUser = (req: Request, res: Response): void => {
    const { id } = req.params;
    db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.json({ message: "User deleted" });
    });
};
