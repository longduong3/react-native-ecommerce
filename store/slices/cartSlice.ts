import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart, CartItem } from '../../interfaces/cart.interface';
import { Product } from '../../interfaces/product.interface';

interface CartState extends Cart {
  isLoading: boolean;
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  isLoading: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Thêm sản phẩm vào giỏ hàng
    addToCart: (state, action: PayloadAction<{ product: Product; quantity?: number }>) => {
      const { product, quantity = 1 } = action.payload;
      
      // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
      const existingItem = state.items.find(item => item.productId === product.id);
      
      if (existingItem) {
        // Cập nhật số lượng nếu đã có
        existingItem.quantity += quantity;
        // Cập nhật snapshot sản phẩm để lấy giá mới nhất
        existingItem.productSnapshot = product;
      } else {
        // Thêm mới vào giỏ hàng
        state.items.push({
          productId: product.id,
          quantity,
          productSnapshot: product,
        });
      }
      
      // Tính lại tổng tiền và số lượng
      calculateTotals(state);
    },
    
    // Xóa sản phẩm khỏi giỏ hàng
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.productId !== action.payload);
      calculateTotals(state);
    },
    
    // Cập nhật số lượng sản phẩm trong giỏ hàng
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.productId === productId);
      
      if (item) {
        if (quantity <= 0) {
          // Xóa nếu số lượng <= 0
          state.items = state.items.filter(item => item.productId !== productId);
        } else {
          // Kiểm tra tồn kho
          if (quantity <= item.productSnapshot.stock) {
            item.quantity = quantity;
          }
        }
        calculateTotals(state);
      }
    },
    
    // Cập nhật thông tin sản phẩm trong giỏ hàng (khi giá/sản phẩm thay đổi)
    updateCartItemProduct: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const item = state.items.find(item => item.productId === product.id);
      if (item) {
        item.productSnapshot = product;
        // Nếu số lượng vượt quá tồn kho, điều chỉnh lại
        if (item.quantity > product.stock) {
          item.quantity = product.stock;
        }
        calculateTotals(state);
      }
    },
    
    // Xóa toàn bộ giỏ hàng
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    },
    
    // Cập nhật giỏ hàng từ localStorage hoặc server (khi đăng nhập)
    setCart: (state, action: PayloadAction<Cart>) => {
      state.items = action.payload.items;
      state.total = action.payload.total;
      state.itemCount = action.payload.itemCount;
    },
    
    // Đặt trạng thái loading
    setCartLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

// Hàm helper để tính tổng tiền và số lượng
function calculateTotals(state: CartState) {
  state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  state.total = state.items.reduce(
    (sum, item) => sum + item.productSnapshot.price * item.quantity,
    0
  );
}

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  updateCartItemProduct,
  clearCart,
  setCart,
  setCartLoading,
} = cartSlice.actions;

export default cartSlice.reducer;

