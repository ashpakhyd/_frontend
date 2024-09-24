// @components/OrderForm.js

"use client"
import { useForm, Controller } from 'react-hook-form';
import OrderStatusDropdown from './OrderStatusDropdown';

const OrderForm = ({ initialData }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialData || {},
  });

  const onSubmit = (data) => {
    console.log(data);
    // Here you would typically send data to your API
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="customer" className="block">Customer Name</label>
        <input
          type="text"
          id="customer"
          {...register('customer', { required: 'Customer name is required' })}
          className="p-2 border rounded w-full"
        />
        {errors.customer && <p className="text-red-500">{errors.customer.message}</p>}
      </div>

      <div>
        <label htmlFor="address" className="block">Address</label>
        <input
          type="text"
          id="address"
          {...register('address', { required: 'Address is required' })}
          className="p-2 border rounded w-full"
        />
        {errors.address && <p className="text-red-500">{errors.address.message}</p>}
      </div>

      <div>
        <label htmlFor="quantity" className="block">Quantity</label>
        <input
          type="number"
          id="quantity"
          {...register('quantity', { required: 'Quantity is required', min: { value: 1, message: 'Minimum quantity is 1' } })}
          className="p-2 border rounded w-full"
        />
        {errors.quantity && <p className="text-red-500">{errors.quantity.message}</p>}
      </div>

      <div>
        <label htmlFor="status" className="block">Order Status</label>
        <Controller
          control={control}
          name="status"
          rules={{ required: 'Status is required' }}
          render={({ field }) => <OrderStatusDropdown {...field} />}
        />
        {errors.status && <p className="text-red-500">{errors.status.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 text-white p-2 rounded"
      >
        {isSubmitting ? 'Submitting...' : 'Create Order'}
      </button>
    </form>
  );
};

export default OrderForm;
