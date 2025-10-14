import { Package, Edit, Trash2 } from 'lucide-react';



import { Product } from '../types';

import { Badge } from 'primereact/badge';
import { Card, CardBody, CardFooter } from './Card';
import { Button } from 'primereact/button';
;

interface ProductCardProps {
    product: Product;
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
    const getCategoryColor = (category: string) => {
        const colors: Record<string, 'info' | 'success' | 'warning' | 'contrast'> = {
            laptops: 'info',
            monitors: 'success',
            peripherals: 'warning',
            accessories: 'contrast',
        };
        return colors[category] || 'contrast';
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    return (
        <Card hover className="h-full flex flex-col">
            <div className="aspect-video bg-gray-100 relative overflow-hidden ">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                                const icon = document.createElement('div');
                                icon.className = 'w-full h-full flex items-center justify-center ';
                                icon.innerHTML = '<svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>';
                                parent.appendChild(icon);
                            }
                        }}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-16 h-16 text-gray-400" />
                    </div>
                )}
                <div className="absolute top-2 right-2">
                    <Badge severity={product.is_active ? 'success' : 'danger'} value={product.is_active ? 'Active' : 'Inactive'} />
                </div>
            </div>

            <CardBody className="flex-1 flex flex-col p-4 sm:p-6">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-2">
                        {product.name}
                    </h3>
                </div>

                <div className="space-y-1 sm:space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-gray-600">Brand:</span>
                        <span className="font-medium text-gray-800">{product.brand}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-gray-600">SKU:</span>
                        <span className="font-mono text-gray-800">{product.sku}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-gray-600">Stock:</span>
                        <span className={`font-medium ${product.quantity > 10 ? 'text-green-600' : product.quantity > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {product.quantity} units
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                    <Badge severity={getCategoryColor(product.category)} value={product.category} className="text-xs sm:text-sm" />
                </div>

                <div className="text-xl sm:text-2xl font-bold text-blue-600 mt-auto">
                    {formatPrice(product.price)}
                </div>
            </CardBody>

            <CardFooter className="flex flex-col sm:flex-row gap-2 p-3 sm:p-4">
                <Button
                    size="small"
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 w-full sm:w-auto px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm"
                    onClick={() => onEdit(product)}
                    severity="warning"
                >
                    <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                    Edit
                </Button>
                <Button
                    size="small"
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 w-full sm:w-auto px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm"
                    onClick={() => onDelete(product)}
                    severity="danger"
                >
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
}
