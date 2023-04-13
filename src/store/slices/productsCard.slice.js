import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig'

export const productsCardSlice = createSlice({
	name: 'productsCard',
    initialState: [],
    reducers: {
        setProductsCard : (state, action ) => {
            return action.payload
        }
    }
})

export const getProductsCardThunk = () => dispatch =>{

    axios.get("https://e-commerce-api-v2.academlo.tech/api/v1/cart", getConfig())
    .then(resp => dispatch(setProductsCard(resp.data)))
    .catch(error => console.error(error))

}


export const createProductsCardThunk = data => dispatch =>{
    
    axios
    .post("https://e-commerce-api-v2.academlo.tech/api/v1/cart", data, getConfig())
    .then(() => {
        dispatch(getProductsCardThunk())
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Tu producto fue agregado con exito al carrito de compra',
            showConfirmButton: false,
            timer: 2000
          })          
    }
    )
    .catch((error) => {
        if (error.response?.status === 403) {
          Swal.fire({
            icon: 'error',
            title: 'Uups...',
            text: 'Este Producto YA EXISTE en el carrito de compra'
          })          
        } else {
          console.log(error.response?.data);
        }
      });

    
}

export const checkoutProductsCardThunk = () => dispatch =>{
    
    axios 
    .post("https://e-commerce-api-v2.academlo.tech/api/v1/purchases", {}, getConfig())
    .then(() => dispatch(getProductsCardThunk()))
    .catch(error => console.error(error))
    
}

export const getPurchaseCardThunk = () => dispatch =>{

    axios
    .get("https://e-commerce-api-v2.academlo.tech/api/v1/purchases", getConfig())
    .then(resp => dispatch(setProductsCard(resp.data)))
    .catch(error => console.error(error))

}

export const { setProductsCard } = productsCardSlice.actions;

export default productsCardSlice.reducer;