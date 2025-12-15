import { RootState } from './store';

// Products selectors
export const selectAllProducts = (state: RootState) => state.products.products;
export const selectFilteredProducts = (state: RootState) => state.products.filteredProducts;
export const selectSelectedProduct = (state: RootState) => state.products.selectedProduct;
export const selectProductsLoading = (state: RootState) => state.products.loading;
export const selectProductsError = (state: RootState) => state.products.error;
export const selectProductById = (productId: string) => (state: RootState) =>
  state.products.products.find(p => p.id === productId);

// Cart selectors
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotal = (state: RootState) => state.cart.total;
export const selectCartItemCount = (state: RootState) => state.cart.itemCount;
export const selectCartLoading = (state: RootState) => state.cart.isLoading;
export const selectIsCartEmpty = (state: RootState) => state.cart.items.length === 0;
export const selectCartItemById = (productId: string) => (state: RootState) =>
  state.cart.items.find(item => item.productId === productId);

// User selectors
export const selectUser = (state: RootState) => state.user.user;
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;
export const selectUserToken = (state: RootState) => state.user.token;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;

// Orders selectors
export const selectAllOrders = (state: RootState) => state.orders.orders;
export const selectCurrentOrder = (state: RootState) => state.orders.currentOrder;
export const selectOrdersLoading = (state: RootState) => state.orders.loading;
export const selectOrdersError = (state: RootState) => state.orders.error;
export const selectOrderById = (orderId: string) => (state: RootState) =>
  state.orders.orders.find(o => o.id === orderId);
export const selectUserOrders = (userId: string) => (state: RootState) =>
  state.orders.orders.filter(o => o.userId === userId);

