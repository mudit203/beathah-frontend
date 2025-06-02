'use client';
import { FC } from 'react';
import { Button, Input, Textarea } from '@windmill/react-ui';

const ProductDrawer: FC = () => (
  <div className="w-full p-6">
    <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Product Title</label>
        <Input type="text" placeholder="Enter product title" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <Textarea rows={4} placeholder="Enter product description" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Price</label>
        <Input type="number" placeholder="Enter price" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Sale Price</label>
        <Input type="number" placeholder="Enter sale price" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Stock</label>
        <Input type="number" placeholder="Enter stock quantity" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Category</label>
        <select className="w-full p-2 border rounded">
          <option value="">Select Category</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
        </select>
      </div>
      <div className="flex justify-end space-x-3 mt-6">
        <Button layout="outline">Cancel</Button>
        <Button>Save Product</Button>
      </div>
    </div>
  </div>
);
export default ProductDrawer;