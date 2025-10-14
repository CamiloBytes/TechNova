import { useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { Product, ProductFormData, ProductCategory } from '../types';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';


interface ProductFormProps {
    product?: Product | null;
    onSubmit: (data: ProductFormData) => Promise<void>;
    onCancel: () => void;
}

const categories: { value: ProductCategory; label: string }[] = [
    { value: 'laptops', label: 'Laptops' },
    { value: 'monitors', label: 'Monitors' },
    { value: 'peripherals', label: 'Peripherals' },
    { value: 'accessories', label: 'Accessories' },
];

type Inputs = ProductFormData;

export function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        defaultValues: product ? {
            sku: product.sku,
            name: product.name,
            brand: product.brand,
            quantity: product.quantity,
            price: product.price,
            is_active: product.is_active,
            category: product.category,
            image_url: product.image_url || '',
        } : {
            sku: '',
            name: '',
            brand: '',
            quantity: 0,
            price: 0,
            is_active: true,
            category: 'laptops',
            image_url: '',
        },
    });

    useEffect(() => {
        if (product) {
            setValue('sku', product.sku);
            setValue('name', product.name);
            setValue('brand', product.brand);
            setValue('quantity', product.quantity);
            setValue('price', product.price);
            setValue('is_active', product.is_active);
            setValue('category', product.category);
            setValue('image_url', product.image_url || '');
        }
    }, [product, setValue]);

    const handleFormSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            await onSubmit(data);
        } catch (error: any) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Dialog
            visible={true}
            onHide={onCancel}
            header={product ? 'Edit Product' : 'Add New Product'}
            modal
            className="p-fluid w-full max-w-md sm:max-w-lg md:max-w-2xl"
            style={{ width: '90vw', maxWidth: '600px' }}
        >

            <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-2">
                            SKU <span className="text-red-500">*</span>
                        </label>
                        <InputText
                            {...register("sku", { required: "SKU is required" })}
                            className={`w-full ${errors.sku ? 'p-invalid' : ''}`}
                            placeholder="e.g., LAP-001"
                            disabled={isSubmitting}
                        />
                        {errors.sku && <small className="p-error">{errors.sku.message}</small>}
                    </div>

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Product Name <span className="text-red-500">*</span>
                        </label>
                        <InputText
                            {...register('name', { required: 'Name is required' })}
                            className={`w-full ${errors.name ? 'p-invalid' : ''}`}
                            placeholder="e.g., Dell XPS 15"
                            disabled={isSubmitting}
                        />
                        {errors.name && <small className="p-error">{errors.name.message}</small>}
                    </div>

                    <div>
                        <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">
                            Brand <span className="text-red-500">*</span>
                        </label>
                        <InputText
                            {...register('brand', { required: 'Brand is required' })}
                            className={`w-full ${errors.brand ? 'p-invalid' : ''}`}
                            placeholder="e.g., Dell"
                            disabled={isSubmitting}
                        />
                        {errors.brand && <small className="p-error">{errors.brand.message}</small>}
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                            Category <span className="text-red-500">*</span>
                        </label>
                        <Dropdown
                            value={watch('category')}
                            options={categories}
                            optionLabel="label"
                            optionValue="value"
                            onChange={(e) => setValue('category', e.value)}
                            className={`w-full ${errors.category ? 'p-invalid' : ''}`}
                            disabled={isSubmitting}
                        />
                        {errors.category && <small className="p-error">{errors.category.message}</small>}
                    </div>

                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                            Quantity <span className="text-red-500">*</span>
                        </label>
                        <InputNumber
                            value={watch('quantity')}
                            onValueChange={(e) => setValue('quantity', e.value || 0)}
                            min={0}
                            className={`w-full ${errors.quantity ? 'p-invalid' : ''}`}
                            disabled={isSubmitting}
                        />
                        {errors.quantity && <small className="p-error">{errors.quantity.message}</small>}
                    </div>

                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                            Price <span className="text-red-500">*</span>
                        </label>
                        <InputNumber
                            value={watch('price')}
                            onValueChange={(e) => setValue('price', e.value || 0)}
                            min={0}
                            mode="currency"
                            currency="USD"
                            locale="en-US"
                            className={`w-full ${errors.price ? 'p-invalid' : ''}`}
                            disabled={isSubmitting}
                        />
                        {errors.price && <small className="p-error">{errors.price.message}</small>}
                    </div>
                </div>

                <div>
                    <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-2">
                        Image URL
                    </label>
                    <InputText
                        {...register('image_url')}
                        type="url"
                        className="w-full"
                        placeholder="https://example.com/image.jpg"
                        disabled={isSubmitting}
                    />
                </div>

                <div className="flex items-center">
                    <Checkbox
                        checked={watch('is_active')}
                        onChange={(e) => setValue('is_active', e.checked || false)}
                        disabled={isSubmitting}
                    />
                    <label htmlFor="is_active" className="ml-2 text-sm text-gray-700">
                        Product is active
                    </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                    <Button
                        type="submit"
                        label={product ? 'Update Product' : 'Create Product'}
                        loading={isSubmitting}
                        size="small"
                        className="flex-1 w-full sm:w-auto px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base"
                    />
                    <Button
                        type="button"
                        label="Cancel"
                        onClick={onCancel}
                        disabled={isSubmitting}
                        outlined
                        size="small"
                        className="flex-1 w-full sm:w-auto px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base"
                    />
                </div>
            </form>
        </Dialog>
    );
}
