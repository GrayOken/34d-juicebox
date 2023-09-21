import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const storeApi = createApi({
    tagTypes:['purchases'],
    reducerPath: 'bigfredApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8081/'}),
    endpoints: (builder) => ({
        getPosts: builder.query({
          query: ()=> 'api/posts'
        }),
        getUserPosts: builder.query({
            query:(id)=>'api/posts/user/'+id
        }),
        deletePost:builder.mutation({
            query:(id)=>({
                url:'api/posts/'+id,
                method:'DELETE'
            })
        }),
        addPost: builder.mutation({
            query:(body)=>({
                url:'api/posts',
                method:"POST",
                body:body
            })
        }),

        addProduct: builder.mutation({
            query: (body)=>({
                url:'api/products',
                method:"POST",
                body:body
            })
        }),
        editPurchase: builder.mutation({
            query(data){
                const {id, ...body}=data;
                return {
                    url: 'api/purchases/'+id,
                    method:"PUT",
                    body
                }
            }
        }),

        editProduct : builder.mutation({
            query(data){
                const {id, ...body}=data;
                return {
                    url: 'api/products/'+id,
                    method:"PUT",
                    body
                }
            }
        })

    }),
})



export const { useGetUserPostsQuery, useAddPostMutation, useDeletePostMutation, useGetPostsQuery, useEditProductMutation, useAddProductMutation, useDeleteProductMutation, useGetProductsQuery, useGetProductByIdQuery, useEditPurchaseMutation, useAddPurchaseMutation, useGetPurchasesQuery, useGetPurchaseByIdQuery, useDeletePurchaseMutation} = storeApi