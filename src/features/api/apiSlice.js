
import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const rowApiSlice = createApi({
    reducerPath: 'api',
    tagTypes: ["Fetched Rows"],
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:3000/api"}),
    endpoints: builder => ({
        getRows: builder.query({
            query: ()=> "/topics",
            providesTags: ["Fetched Rows"]
        }),
        addRows: builder.mutation({
            query: (row) => ({url:'/topics', method:'POST',body: row}),
            invalidatesTags:['Fetched Rows']
        })
    })
})


export const {useGetRowsQuery, useAddRowsMutation} = rowApiSlice