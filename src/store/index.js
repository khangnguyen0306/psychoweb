
// import { productAPI } from "../services/productAPI";
// import ProductReducer from "../slices/product.slice";
import { doctorAPI } from "../services/doctorAPI";
import doctorReducer from "../slices/doctor.slice";
import { authApi } from "../services/authAPI";
import AuthReducer from "../slices/auth.slice";
import { userAPI } from "../services/userAPI";
import userReducer from "../slices/user.slice";
// import { exchangeAPI } from "../services/exchangeAPI";
// import exchangeReducer from "../slices/exchange.slice";
// import { chatAPI } from "../services/chatAPI";
// import chatReducer from "../slices/chat.slice";
// import { appealApi } from "../services/appealAPI";
// import appealReducer from "../slices/appeal.slice";
// import NotiReducer from "../slices/notification.slice";

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import sessionStorage from 'redux-persist/lib/storage/session'

const persistConfig = {
  key: 'root',
  storage: sessionStorage, 
  whitelist: ['user', 'token'],
};
// const persistedReducer = persistReducer(persistConfig, flowerReducer);
// const ProductPerisReducer = persistReducer(persistConfig, ProductReducer);
const DoctorPerisReducer = persistReducer(persistConfig, doctorReducer);
const AuthPerisReducer = persistReducer(persistConfig, AuthReducer);
const UserPerisReducer = persistReducer(persistConfig, userReducer);
// const PostPerisReducer = persistReducer(persistConfig, postReducer);
// const ExchangePerisReducer = persistReducer(persistConfig, exchangeReducer);
// const ChatPerisReducer = persistReducer(persistConfig, chatReducer);
// const AppealPerisReducer = persistReducer(persistConfig, appealReducer);
// const NotificationReducer = persistReducer(persistConfig, NotiReducer);

export const store = configureStore({
  reducer: {
    // [flowerApi.reducerPath]: flowerApi.reducer,
    // flower: persistedReducer,
    // [productAPI.reducerPath]: productAPI.reducer,
    // product: ProductPerisReducer,
    [doctorAPI.reducerPath]: doctorAPI.reducer,
    user: DoctorPerisReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: AuthPerisReducer,
    [userAPI.reducerPath]: userAPI.reducer,
    user: UserPerisReducer,
    // [postAPI.reducerPath]: postAPI.reducer,
    // post: PostPerisReducer,
    // [exchangeAPI.reducerPath]: exchangeAPI.reducer,
    // exchange: ExchangePerisReducer,
    // chat: ChatPerisReducer,
    // [appealApi.reducerPath]: appealApi.reducer,
    // appeal: AppealPerisReducer,
    // notifications:NotificationReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // flowerApi.middleware,
      // productAPI.middleware,
      // userAPI.middleware,
      authApi.middleware,
      doctorAPI.middleware,
      userAPI.middleware
      // postAPI.middleware,
      // exchangeAPI.middleware,
      // appealApi.middleware,
    ),
});

export const Persister = persistStore(store);
