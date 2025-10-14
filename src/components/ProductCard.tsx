import { Package, Edit, Trash2 } from 'lucide-react';



import { Product } from '../types';
import { Button } from './Button';
import { Badge } from './Badge';
import { Card, CardBody, CardFooter } from './Card';
;

interface ProductCardProps {
    product: Product;
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
    const getCategoryColor = (category: string) => {
        const colors: Record<string, 'info' | 'success' | 'warning' | 'default'> = {
            laptops: 'info',
            monitors: 'success',
            peripherals: 'warning',
            accessories: 'default',
        };
        return colors[category] || 'default';
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    return (
        <Card hover className="h-full flex flex-col">
            <div className="aspect-video bg-gray-100 relative overflow-hidden">
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
                                icon.className = 'w-full h-full flex items-center justify-center';
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
                    <Badge variant={product.is_active ? 'success' : 'danger'} size="sm">
                        {product.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                </div>
            </div>

            <CardBody className="flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                        {product.name}
                    </h3>
                </div>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Brand:</span>
                        <span className="font-medium text-gray-800">{product.brand}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">SKU:</span>
                        <span className="font-mono text-gray-800">{product.sku}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Stock:</span>
                        <span className={`font-medium ${product.quantity > 10 ? 'text-green-600' : product.quantity > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {product.quantity} units
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                    <Badge variant={getCategoryColor(product.category)} size="sm">
                        {product.category}
                    </Badge>
                </div>

                <div className="text-2xl font-bold text-blue-600 mt-auto">
                    {formatPrice(product.price)}
                </div>
            </CardBody>

            <CardFooter className="flex gap-2">
                <Button
                    variant="primary"
                    size="sm"
                    className="flex-1 flex items-center justify-center gap-2"
                    onClick={() => onEdit(product)}
                >
                    <Edit className="w-4 h-4" />
                    Edit
                </Button>
                <Button
                    variant="danger"
                    size="sm"
                    className="flex-1 flex items-center justify-center gap-2"
                    onClick={() => onDelete(product)}
                >
                    <Trash2 className="w-4 h-4" />
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
}
