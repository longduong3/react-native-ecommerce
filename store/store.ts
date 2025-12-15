import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import ordersReducer from './slices/ordersSlice';

// Middleware để liên kết các nghiệp vụ
import { cartMiddleware } from './middleware/cartMiddleware';
import { ordersMiddleware } from './middleware/ordersMiddleware';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
    orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Cho phép các giá trị không serializable (như Date, function) trong một số trường hợp
        ignoredActions: ['orders/createOrder'],
      },
    }).concat(cartMiddleware, ordersMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

