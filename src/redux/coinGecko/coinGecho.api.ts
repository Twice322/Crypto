import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


const BASE_API_RUL = 'https://api.coingecko.com/api/v3/coins/'

export const coinGeckoApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_RUL
    }),
    endpoints: build => ({
        getMostPopularCoins: build.query<any, { currency: string; page: number; time: string }>({
            query: ({currency, page, time}) => ({
                url: `markets/`, 
                method: "GET",
                params: { 
                    vs_currency: currency, 
                    page, 
                    price_change_percentage: time, 
                    sparkline: true,
                 },
            }),
        }),
        getCoinDetails: build.query<any, string | undefined>({
            query: (id : string) => ({
                url: `${id}`, 
                method: "GET",
                params: { 
                    tickers: true,
                    market_data: true, 
                    community_data: true, 
                    developer_data: true,
                    sparkline: true,
                 },
            }),
        }),
        getCoinHistory: build.query<any, { id: string; days: number; }>({
            query: ({id, days}) => ({
                url: `${id}/market_chart?vs_currency=${'usd'}&days=${days}`, 
                method: "GET",
                params: { 
                    tickers: true,
                    market_data: true, 
                    community_data: true, 
                    developer_data: true,
                    sparkline: true,
                 },
            }),
        })
    })
})

export const {useGetMostPopularCoinsQuery, useGetCoinDetailsQuery, useGetCoinHistoryQuery} = coinGeckoApi
