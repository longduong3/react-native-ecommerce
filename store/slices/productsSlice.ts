import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductCategory, ProductFilter } from '../../interfaces/product.interface';

interface ProductsState {
  products: Product[];
  filteredProducts: Product[];
  selectedProduct: Product | null;
  filters: ProductFilter;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  selectedProduct: null,
  filters: {},
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
      state.loading = false;
      state.error = null;
    },
    
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
      state.filteredProducts.push(action.payload);
    },
    
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
        const filteredIndex = state.filteredProducts.findIndex(p => p.id === action.payload.id);
        if (filteredIndex !== -1) {
          state.filteredProducts[filteredIndex] = action.payload;
        }
      }
    },
    
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
      state.filteredProducts = state.filteredProducts.filter(p => p.id !== action.payload);
    },
    
    selectProduct: (state, action: PayloadAction<string>) => {
      const product = state.products.find(p => p.id === action.payload);
      state.selectedProduct = product || null;
    },
    
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    
    setFilters: (state, action: PayloadAction<ProductFilter>) => {
      state.filters = { ...state.filters, ...action.payload };
      applyFilters(state);
    },
    
    clearFilters: (state) => {
      state.filters = {};
      state.filteredProducts = state.products;
    },
    
    searchProducts: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.toLowerCase();
      if (!searchTerm) {
        applyFilters(state);
        return;
      }
      
      state.filteredProducts = state.products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.brand?.toLowerCase().includes(searchTerm)
      );
    },
    
    updateProductStock: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const product = state.products.find(p => p.id === productId);
      if (product) {
        product.stock = Math.max(0, product.stock - quantity);
        const filteredProduct = state.filteredProducts.find(p => p.id === productId);
        if (filteredProduct) {
          filteredProduct.stock = product.stock;
        }
      }
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

function applyFilters(state: ProductsState) {
  let filtered = [...state.products];
  
  if (state.filters.category) {
    filtered = filtered.filter(p => p.category === state.filters.category);
  }
  
  if (state.filters.minPrice !== undefined) {
    filtered = filtered.filter(p => p.price >= state.filters.minPrice!);
  }
  
  if (state.filters.maxPrice !== undefined) {
    filtered = filtered.filter(p => p.price <= state.filters.maxPrice!);
  }
  
  if (state.filters.brand) {
    filtered = filtered.filter(p => p.brand === state.filters.brand);
  }
  
  state.filteredProducts = filtered;
}

export const {
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
  setLoading,
  setError,
} = productsSlice.actions;

export default productsSlice.reducer;

