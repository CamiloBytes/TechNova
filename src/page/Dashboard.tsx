import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-toastify';

import { Plus, Search, LogOut, Package, Filter } from 'lucide-react';
import type { Product, ProductFormData } from '../types';
import axios from 'axios';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { ProductCard } from '../components/ProductCard';
import { ProductForm } from '../components/ProductFrom';


const API_BASE = 'http://localhost:3001';

interface FilterState {
    selectedCategory: string;
    selectedBrand: string;
    searchQuery: string;
}

export function Dashboard() {
    const { user, logout } = useAuthStore();
    const [products, setProducts] = useState<Product[]>([]);
    const [filters, setFilters] = useState<FilterState>({
        selectedCategory: 'all',
        selectedBrand: 'all',
        searchQuery: '',
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    useEffect(() => {
        loadProducts();
    }, []);

    useEffect(() => {
        loadProducts();
    }, [filters]);

    const loadProducts = async () => {
        try {
            setIsLoading(true);
            const params = new URLSearchParams();
            if (filters.searchQuery) params.append('searchQuery', filters.searchQuery);
            if (filters.selectedCategory !== 'all') params.append('category', filters.selectedCategory);
            if (filters.selectedBrand !== 'all') params.append('brand', filters.selectedBrand);
            const response = await axios.get(`${API_BASE}/products?${params.toString()}`);
            setProducts(response.data);
            setError(null);
        } catch (error: any) {
            setError(error.message || 'Failed to load products');
        } finally {
            setIsLoading(false);
        }
    };

    const getUniqueBrands = () => {
        return Array.from(new Set(products.map((p) => p.brand)));
    };

    const handleCreateProduct = async (data: ProductFormData) => {
        try {
            const response = await axios.post(`${API_BASE}/products`, data);
            console.log(response.data);
            await loadProducts();
            setShowForm(false);
            toast.success('Product created successfully!');
        } catch (error: any) {
            throw error;
        }
    };

    const handleUpdateProduct = async (data: ProductFormData) => {
        if (!editingProduct) return;

        try {
            await axios.put(`${API_BASE}/products/${editingProduct.id}`, data);
            await loadProducts();
            setEditingProduct(null);
            setShowForm(false);
            toast.success('Product updated successfully!');
        } catch (error: any) {
            throw error;
        }
    };

    const handleDeleteProduct = async (product: Product) => {
        if (!confirm(`Are you sure you want to delete "${product.name}"?`)) {
            return;
        }

        try {
            await axios.delete(`${API_BASE}/products/${product.id}`);
            await loadProducts();
            toast.success('Product deleted successfully!');
        } catch (error: any) {
            alert(error.message || 'Failed to delete product');
        }
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingProduct(null);
    };



    const handleLogout = async () => {
        try {
            await logout();
        } catch (error: any) {
            alert(error.message || 'Failed to logout');
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, searchQuery: e.target.value });
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters({ ...filters, selectedCategory: e.target.value });
    };

    const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters({ ...filters, selectedBrand: e.target.value });
    };

    const brands = getUniqueBrands();

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-600 p-2 rounded-lg">
                                <Package className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">TechNova</h1>
                                <p className="text-sm text-gray-600">Inventory Management System</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                                <Badge severity="info" value={user?.role} />
                            </div>
                            <Button
                                severity="secondary"
                                size="small"
                                icon={<LogOut size={16} />}
                                label="Logout"
                                onClick={handleLogout}
                                text
                                className="flex items-center gap-2"
                            />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800">Product Catalog</h2>
                            <p className="text-gray-600 mt-1">Manage your technology products inventory</p>
                        </div>
                        <Button
                            size="large"
                            icon={<Plus size={20} />}
                            label="Add Product"
                            onClick={() => setShowForm(true)}
                            className="flex items-center gap-2"
                        />
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-4">
                        <div className="flex items-center gap-2 text-gray-700 font-medium">
                            <Filter className="w-5 h-5" />
                            Filters
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by name, SKU, or brand..."
                                    value={filters.searchQuery}
                                    onChange={handleSearchChange}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <select
                                value={filters.selectedCategory}
                                onChange={handleCategoryChange}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Categories</option>
                                <option value="laptops">Laptops</option>
                                <option value="monitors">Monitors</option>
                                <option value="peripherals">Peripherals</option>
                                <option value="accessories">Accessories</option>
                            </select>

                            <select
                                value={filters.selectedBrand}
                                onChange={handleBrandChange}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Brands</option>
                                {brands.map((brand: string) => (
                                    <option key={brand} value={brand}>
                                        {brand}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="font-medium">
                                {products.length} product{products.length !== 1 ? 's' : ''} found
                            </span>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
                        <p className="text-gray-600 mb-6">
                            {filters.searchQuery || filters.selectedCategory !== 'all' || filters.selectedBrand !== 'all'
                                ? 'Try adjusting your filters'
                                : 'Get started by adding your first product'}
                        </p>
                        <Button label="Add Your First Product" onClick={() => setShowForm(true)}>
                            Add Your First Product
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onEdit={handleEdit}
                                onDelete={handleDeleteProduct}
                            />
                        ))}
                    </div>
                )}
            </main>

            {showForm && (
                <ProductForm
                    product={editingProduct}
                    onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
                    onCancel={handleCloseForm}
                />
            )}
        </div>
    );
}
