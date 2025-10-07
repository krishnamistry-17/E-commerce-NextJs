"use client";

import React, { Suspense } from "react";
import CartComponent from "./CartComponent"; // Move your current Cart code to CartComponent.tsx

export default function CartPage() {
  return (
    <Suspense fallback={<div>Loading cart...</div>}>
      <CartComponent />
    </Suspense>
  );
}
