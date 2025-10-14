import { Request, Response } from "express";
import db from "../db";

export const getOrders = (req: Request, res: Response): void => {
    db.query("SELECT * FROM orders", (err, results) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.json(results);
    });
};

export const createOrder = (req: Request, res: Response): void => {
    const { user_id, total, status } = req.body;
    db.query(
        "INSERT INTO orders (user_id, total, status) VALUES (?, ?, ?)",
        [user_id, total, status || 'pending'],
        (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            res.json({ id: (result as any).insertId, user_id, total, status: status || 'pending' });
        }
    );
};

export const updateOrder = (req: Request, res: Response): void => {
    const { id } = req.params;
    const { user_id, total, status } = req.body;
    db.query(
        "UPDATE orders SET user_id = ?, total = ?, status = ? WHERE id = ?",
        [user_id, total, status, id],
        (err) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            res.json({ id, user_id, total, status });
        }
    );
};

export const deleteOrder = (req: Request, res: Response): void => {
    const { id } = req.params;
    db.query("DELETE FROM orders WHERE id = ?", [id], (err) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.json({ message: "Order deleted" });
    });
};
