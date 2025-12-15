import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrderStatus } from '../../interfaces/order.interface';
import { CartItem } from '../../interfaces/cart.interface';
import { Address } from '../../interfaces/user.interface';

interface OrdersState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // Tạo đơn hàng mới từ giỏ hàng
    createOrder: (
      state,
      action: PayloadAction<{
        userId: string;
        items: CartItem[];
        total: number;
        shippingAddress: Address;
        paymentMethod: 'cash' | 'credit_card' | 'bank_transfer';
        notes?: string;
      }>
    ) => {
      const { userId, items, total, shippingAddress, paymentMethod, notes } = action.payload;
      
      const newOrder: Order = {
        id: `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        userId,
        items,
        total,
        status: 'pending',
        shippingAddress,
        paymentMethod,
        paymentStatus: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        notes,
      };
      
      state.orders.unshift(newOrder); // Thêm vào đầu danh sách
      state.currentOrder = newOrder;
      state.error = null;
    },
    
    // Cập nhật trạng thái đơn hàng
    updateOrderStatus: (
      state,
      action: PayloadAction<{ orderId: string; status: OrderStatus }>
    ) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find(o => o.id === orderId);
      
      if (order) {
        order.status = status;
        order.updatedAt = new Date().toISOString();
        
        if (state.currentOrder?.id === orderId) {
          state.currentOrder = order;
        }
      }
    },
    
    // Cập nhật trạng thái thanh toán
    updatePaymentStatus: (
      state,
      action: PayloadAction<{ orderId: string; paymentStatus: 'pending' | 'paid' | 'failed' }>
    ) => {
      const { orderId, paymentStatus } = action.payload;
      const order = state.orders.find(o => o.id === orderId);
      
      if (order) {
        order.paymentStatus = paymentStatus;
        order.updatedAt = new Date().toISOString();
        
        if (state.currentOrder?.id === orderId) {
          state.currentOrder = order;
        }
      }
    },
    
    // Đặt danh sách đơn hàng (từ server hoặc localStorage)
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
      state.loading = false;
      state.error = null;
    },
    
    // Chọn đơn hàng để xem chi tiết
    selectOrder: (state, action: PayloadAction<string>) => {
      const order = state.orders.find(o => o.id === action.payload);
      state.currentOrder = order || null;
    },
    
    // Xóa đơn hàng đã chọn
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    
    // Lấy đơn hàng theo userId
    setUserOrders: (state, action: PayloadAction<{ userId: string; orders: Order[] }>) => {
      // Có thể lọc hoặc merge với orders hiện có
      state.orders = action.payload.orders;
    },
    
    // Hủy đơn hàng
    cancelOrder: (state, action: PayloadAction<string>) => {
      const order = state.orders.find(o => o.id === action.payload);
      if (order && (order.status === 'pending' || order.status === 'confirmed')) {
        order.status = 'cancelled';
        order.updatedAt = new Date().toISOString();
        
        if (state.currentOrder?.id === action.payload) {
          state.currentOrder = order;
        }
      }
    },
    
    // Đặt trạng thái loading
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    // Đặt lỗi
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  createOrder,
  updateOrderStatus,
  updatePaymentStatus,
  setOrders,
  selectOrder,
  clearCurrentOrder,
  setUserOrders,
  cancelOrder,
  setLoading,
  setError,
} = ordersSlice.actions;

export default ordersSlice.reducer;

