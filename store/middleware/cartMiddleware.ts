import { Middleware } from '@reduxjs/toolkit';
import { updateProductStock } from '../slices/productsSlice';
import { updateCartItemProduct } from '../slices/cartSlice';

/**
 * Middleware để liên kết giỏ hàng với sản phẩm:
 * - Cập nhật thông tin sản phẩm trong giỏ hàng khi sản phẩm thay đổi
 * - Đồng bộ giá và tồn kho
 */
export const cartMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  
  // Khi sản phẩm được cập nhật, cập nhật lại trong giỏ hàng
  if (action.type === 'products/updateProduct') {
    const updatedProduct = action.payload;
    const cartState = store.getState().cart;
    
    // Kiểm tra xem sản phẩm có trong giỏ hàng không
    const cartItem = cartState.items.find(item => item.productId === updatedProduct.id);
    if (cartItem) {
      store.dispatch(updateCartItemProduct(updatedProduct));
    }
  }
  
  return result;
};

