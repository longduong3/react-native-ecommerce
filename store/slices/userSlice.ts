import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, Address, AuthState } from '../../interfaces/user.interface';

interface UserState extends AuthState {
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  token: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Đăng nhập
    login: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    },
    
    // Đăng xuất
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    
    // Cập nhật thông tin người dùng
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    
    // Cập nhật địa chỉ
    updateAddress: (state, action: PayloadAction<Address>) => {
      if (state.user) {
        state.user.address = action.payload;
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
  login,
  logout,
  updateUser,
  updateAddress,
  setLoading,
  setError,
} = userSlice.actions;

export default userSlice.reducer;

