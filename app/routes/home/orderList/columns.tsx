import type { ColumnDef } from '@tanstack/react-table';

import { Button } from '~/components/ui/button';
import Delete from '../DeleteOrder';
import { AddOrder } from '../AddOrder';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  product: string;
  price: number;
  number: number;
};

export const columns: ColumnDef<Payment>[] = [
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
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex space-x-2">
          <AddOrder isEdit={true} />
          <Delete />
        </div>
      );
    },
  },
];
