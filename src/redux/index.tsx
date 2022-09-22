import {configureStore} from '@reduxjs/toolkit'
import { coinGeckoApi } from './coinGecko/coinGecho.api'
import {selectReducer } from './slices'
import {setupListeners} from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
        [coinGeckoApi.reducerPath]: coinGeckoApi.reducer,
        select: selectReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(coinGeckoApi.middleware)
})
setupListeners(store.dispatch)


export type RootState = ReturnType<typeof store.getState>
