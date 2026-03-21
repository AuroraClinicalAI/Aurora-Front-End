import { configureStore } from '@reduxjs/toolkit';
import userReducer from "@store/userSlice";
import { persistStore } from 'redux-persist';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['usuario', 'accessToken', 'refreshToken', 'isAuthenticated']
}

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    usuario: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
