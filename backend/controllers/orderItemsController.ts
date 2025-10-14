import { Request, Response } from "express";
import db from "../db";

export const getOrderItems = (req: Request, res: Response): void => {
    db.query("SELECT * FROM order_items", (err, results) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.json(results);
    });
};

export const createOrderItem = (req: Request, res: Response): void => {
    const { order_id, product_id, quantity, unit_price, subtotal } = req.body;
    db.query(
        "INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal) VALUES (?, ?, ?, ?, ?)",
        [order_id, product_id, quantity, unit_price, subtotal],
        (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            res.json({ id: (result as any).insertId, order_id, product_id, quantity, unit_price, subtotal });
        }
    );
};

export const updateOrderItem = (req: Request, res: Response): void => {
    const { id } = req.params;
    const { order_id, product_id, quantity, unit_price, subtotal } = req.body;
    db.query(
        "UPDATE order_items SET order_id = ?, product_id = ?, quantity = ?, unit_price = ?, subtotal = ? WHERE id = ?",
        [order_id, product_id, quantity, unit_price, subtotal, id],
        (err) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            res.json({ id, order_id, product_id, quantity, unit_price, subtotal });
        }
    );
};

export const deleteOrderItem = (req: Request, res: Response): void => {
    const { id } = req.params;
    db.query("DELETE FROM order_items WHERE id = ?", [id], (err) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.json({ message: "Order item deleted" });
    });
};
