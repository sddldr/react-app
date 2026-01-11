'use client';
import { columns, type Payment } from './columns';
import DataTable from './DataTable';
import { AddOrder } from '../AddOrder';
import { useEffect, useState } from 'react';

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      product: 'Product Name',
      price: 100,
      number: 5,
    },
    // ...
  ];
}

export default function OrderList() {
  const [tableData, setTableData] = useState<Payment[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setTableData(data);
    }
    fetchData();
  }, []);

  return (
    <div className="py-10">
      <main className="mx-auto max-w-7xl px-6 py-20 text-center">
        <div className="flex justify-end mb-4">
          <AddOrder />
        </div>
        <DataTable columns={columns} data={tableData} />
      </main>
    </div>
  );
}
