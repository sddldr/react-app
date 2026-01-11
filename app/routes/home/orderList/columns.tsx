import type { ColumnDef } from '@tanstack/react-table';
import Delete from '../DeleteOrder';
import { AddOrder } from '../AddOrder';
import { type Product } from '../types';

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'product',
    header: 'Product',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'number',
    header: 'Number',
  },
  {
    id: 'actions', // required when no accessorKey
    header: 'Actions',
    cell: ({ row, table }) => {
      const product = row.original;
      const onRefresh = table.options.meta?.onRefresh;
      return (
        <div className="flex space-x-2">
          <AddOrder isEdit={true} productInfo={product} onSuccess={onRefresh} />
          <Delete id={product.id} onSuccess={onRefresh} />
        </div>
      );
    },
  },
];
