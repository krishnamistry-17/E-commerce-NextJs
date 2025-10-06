export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
  totalPrice: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  address1: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  _id?: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: "stripe" | "paypal" | "cod";
  paymentStatus: "pending" | "completed" | "failed" | "refunded";
  orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  subtotal: number;
  shippingFee: number;
  tax: number;
  total: number;
  paymentIntentId?: string;
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
  deliveredAt?: Date;
  notes?: string;
}

export interface Products {
  ProductId: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Details {
  Products: Products[];
}

export interface CreateOrderRequest {
  Products: Products[];
}

export interface UpdateOrderStatusRequest {
  orderStatus?:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  paymentStatus?: "pending" | "completed" | "failed" | "refunded";
  transactionId?: string;
}

export interface OrderResponse {
  success: boolean;
  message: string;
  order?: Order;
  orders?: Order[];
  totalOrders?: number;
  page?: number;
  limit?: number;
}
