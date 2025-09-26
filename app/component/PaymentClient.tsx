// components/PaymentClient.tsx
'use client';

import { useSearchParams } from 'next/navigation';

const PaymentClient = () => {
  const searchParams = useSearchParams();
  const cartItems = searchParams.get('cartItems')?.split(',') || [];

  return (
    <div>
      <h1>Payment Page</h1>
      <p>Cart Items: {cartItems.join(', ')}</p>
    </div>
  );
};

export default PaymentClient;
