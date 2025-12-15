/**
 * File tập trung các actions để sử dụng dễ dàng hơn
 * Import từ đây thay vì từ từng slice riêng lẻ
 */

// Products actions
export {
  setProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  selectProduct,
  clearSelectedProduct,
  setFilters,
  clearFilters,
  searchProducts,
  updateProductStock,
  setLoading as setProductsLoading,
  setError as setProductsError,
} from './slices/productsSlice';

// Cart actions
export {
  addToCart,
  removeFromCart,
  updateQuantity,
  updateCartItemProduct,
  clearCart,
  setCart,
  setCartLoading,
} from './slices/cartSlice';

// User actions
export {
  login,
  logout,
  updateUser,
  updateAddress,
  setLoading as setUserLoading,
  setError as setUserError,
} from './slices/userSlice';

// Orders actions
export {
  createOrder,
  updateOrderStatus,
  updatePaymentStatus,
  setOrders,
  selectOrder,
  clearCurrentOrder,
  setUserOrders,
  cancelOrder,
  setLoading as setOrdersLoading,
  setError as setOrdersError,
} from './slices/ordersSlice';

