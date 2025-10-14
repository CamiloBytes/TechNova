import { Request, Response } from "express";
import db from "../db";

export const getProducts = (req: Request, res: Response): void => {
    db.query("SELECT * FROM products", (err, results) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.json(results);
    });
};

export const createProduct = (req: Request, res: Response): void => {
    const { sku, name, brand, quantity, price, category, image_url } = req.body;
    db.query(
        "INSERT INTO products (sku, name, brand, quantity, price, category, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [sku, name, brand, quantity, price, category, image_url],
        (err, result) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            res.json({ id: (result as any).insertId, sku, name, brand, quantity, price, category, image_url });
        }
    );
};

export const updateProduct = (req: Request, res: Response): void => {
    const { id } = req.params;
    const { sku, name, brand, quantity, price, category, image_url, is_active } = req.body;
    db.query(
        "UPDATE products SET sku = ?, name = ?, brand = ?, quantity = ?, price = ?, category = ?, image_url = ?, is_active = ? WHERE id = ?",
        [sku, name, brand, quantity, price, category, image_url, is_active, id],
        (err) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            res.json({ id, sku, name, brand, quantity, price, category, image_url, is_active });
        }
    );
};

export const deleteProduct = (req: Request, res: Response): void => {
    const { id } = req.params;
    db.query("DELETE FROM products WHERE id = ?", [id], (err) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.json({ message: "Producto eliminado" });
    });
};
