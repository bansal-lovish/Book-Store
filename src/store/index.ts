import { configureStore } from '@reduxjs/toolkit';
import products from '@/store/products'
import activity from './activity';


export const store = configureStore({
  reducer: {
products:products,
activity:activity
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;