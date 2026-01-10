import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import OrderList from './orderList';

export default function Main() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20 text-center">
      {/* <h2 className="text-4xl font-bold mt-30">Welcome to my page</h2> */}
      <OrderList />
      {/* <Card>
        <CardContent className="space-y-6 p-10 text-center">
          <h2 className="text-4xl font-bold">Welcome to my page</h2>
          <p className="text-muted-foreground">
            Beautiful, accessible components built with Tailwind CSS.
          </p>
          <Button size="lg">Get Started</Button>
        </CardContent>
      </Card> */}
    </main>
  );
}
