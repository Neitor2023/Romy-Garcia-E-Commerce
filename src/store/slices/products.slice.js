import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice'

export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProducts: (state, action) => {
            return action.payload
        }
    }
})

export const getProductsThunk = () => dispatch => {

    dispatch(setIsLoading(true))

    axios.get("https://e-commerce-api-v2.academlo.tech/api/v1/products")
        .then(resp => dispatch(setProducts(resp.data)))
        .catch(error => console.error(error))
        .finally(() => dispatch(setIsLoading(false)))
}

export const filterCategoriesThunk = (id) => dispatch => {

    dispatch(setIsLoading(true))

    axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/?categoryId=${id}`)
        .then(resp => dispatch(setProducts(resp.data)))
        .catch(error => console.error(error))
        .finally(() => dispatch(setIsLoading(false)))
}

export const filterTitleThunk = (value) => dispatch => {

    dispatch(setIsLoading(true))

    axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/?title=${value}`)
        .then(resp => dispatch(setProducts(resp.data)))
        .catch(error => console.error(error))
        .finally(() => dispatch(setIsLoading(false)))
}

export const filterFromToThunk = (from,to) => dispatch => {
    
    console.log("from to", from, to)
    dispatch(setIsLoading(true))
    axios.get("https://e-commerce-api-v2.academlo.tech/api/v1/products")
        .then(resp => {
            let result = resp.data.filter(product => product.price >= from && product.price <= to )
            dispatch(setProducts(result))
        } )
        .catch(error => console.error(error))
        .finally(() => dispatch(setIsLoading(false)))
}

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;