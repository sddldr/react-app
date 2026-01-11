import Header from '../../components/Header';
import OrderList from './orderList';

export default function Home() {
  return (
    <div className="h-full">
      <Header />
      <OrderList />
    </div>
  );
}
