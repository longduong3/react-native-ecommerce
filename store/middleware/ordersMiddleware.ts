import { Middleware } from '@reduxjs/toolkit';
import { updateProductStock } from '../slices/productsSlice';
import { clearCart } from '../slices/cartSlice';

/**
 * Middleware để liên kết đơn hàng với các nghiệp vụ khác:
 * - Khi tạo đơn hàng thành công: cập nhật tồn kho sản phẩm và xóa giỏ hàng
 * - Khi hủy đơn hàng: cập nhật lại tồn kho (nếu cần)
 */
export const ordersMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  
  // Khi đơn hàng được tạo thành công
  if (action.type === 'orders/createOrder') {
    const state = store.getState();
    const orders = state.orders.orders;
    // Lấy đơn hàng mới nhất (vừa được tạo)
    const newOrder = orders[0];
    
    if (newOrder) {
      // Cập nhật tồn kho cho từng sản phẩm trong đơn hàng
      newOrder.items.forEach((item: { productId: string; quantity: number }) => {
        store.dispatch(updateProductStock({
          productId: item.productId,
          quantity: item.quantity,
        }));
      });
      
      // Xóa giỏ hàng sau khi tạo đơn hàng thành công
      store.dispatch(clearCart());
    }
  }
  
  // Khi đơn hàng bị hủy, có thể cập nhật lại tồn kho
  if (action.type === 'orders/cancelOrder') {
    const orderId = action.payload;
    const ordersState = store.getState().orders;
    const cancelledOrder = ordersState.orders.find(o => o.id === orderId);
    
    // Nếu đơn hàng đã được xử lý (confirmed, processing, shipped), cần cập nhật lại tồn kho
    if (cancelledOrder && 
        (cancelledOrder.status === 'confirmed' || 
         cancelledOrder.status === 'processing' || 
         cancelledOrder.status === 'shipped')) {
      cancelledOrder.items.forEach((item: { productId: string; quantity: number }) => {
        // Thêm lại tồn kho (số lượng âm để tăng tồn kho)
        store.dispatch(updateProductStock({
          productId: item.productId,
          quantity: -item.quantity,
        }));
      });
    }
  }
  
  return result;
};

