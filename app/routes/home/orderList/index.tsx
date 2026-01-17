'use client';
import { columns } from './columns';
import DataTable from './DataTable';
import { AddOrder } from '../AddOrder';
import { useEffect, useState } from 'react';
import { getOrders } from '../orderApi';
import { type Product } from '../types';

export default function OrderList() {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState<Product[]>([]);

  async function fetchData() {
    setLoading(true);
    const data = await getOrders();
    setTableData(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="py-10">
      <main className="mx-auto max-w-7xl px-6 py-20 text-center">
        <div className="flex justify-end mb-4">
          <AddOrder onSuccess={fetchData} />
        </div>
        <DataTable loading={loading} columns={columns} data={tableData} onRefresh={fetchData} />
      </main>
    </div>
  );
}
