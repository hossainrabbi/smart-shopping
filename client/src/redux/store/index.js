import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
import authSlice from './auth-slice';
import categoriesSlice from './categories-slice';
import productSlice from './product-slice';

const persistConfig = {
  keyPrefix: 'smart-shopping-',
  key: 'login',
  storage,
};

const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authSlice.reducer),
    categories: categoriesSlice.reducer,
    products: productSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

store.__persistor = persistStore(store);

export default store;
