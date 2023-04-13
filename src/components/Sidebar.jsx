import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsCardThunk, checkoutProductsCardThunk } from '../store/slices/productsCard.slice';
import axios from 'axios';
import getConfig from '../utils/getConfig'
import './Sidebar.css'

const Sidebar = ({ show, handleClose }) => {
    const [total, setTotal] = useState(0)
    const dispatch = useDispatch()
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) dispatch(getProductsCardThunk());
    }, [token]);

    const productsCard = useSelector(state => state.productsCard)

    useEffect(() => {
        totalProduct()
    }, [productsCard]);

    const totalProduct = () => {
        let totalPrice = productsCard.reduce((acc, product) => acc + product.product?.price * product.quantity, 0)
        setTotal(totalPrice)
    }

    const Quantit = (id_op, id, Qua) => {
        const data = {
            quantity: Qua,
        }
        axios
            .put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id_op}`, data, getConfig())
            .then(() => {
                dispatch(getProductsCardThunk())
            })
            .catch(error => console.error(error))
    }

    const delet = (id_op, id, Qua) => {
        console.log(id_op)
        const data = {
            quantity: Qua,
        }
        axios
            .delete(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id_op}`, getConfig())
            .then(() => {
                dispatch(getProductsCardThunk())
            })
            .catch(error => console.error(error))
    }


    return (
        <Offcanvas show={show} onHide={handleClose} placement={"end"}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Carrito de Compra</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {productsCard.map(item => (
                    <div key={item.id}>
                        <div className='container_row'>
                            <div className='img'>
                                <img src={item.product?.images[0].url} style={{ width: 55, objectFit: "contain" }} alt="" />
                            </div>
                            <div className='detail_0_column'>
                                <div className='title_dele_row'>
                                    <div className='title'>
                                        {item.product?.title}
                                    </div>
                                    <div 
                                    onClick={()=> delet(item.id)}                                    
                                    className='dele'>
                                        <i className='bx bx-trash bx-sm'></i>
                                    </div>
                                </div>
                                <div className='btns_row'>
                                    <button
                                        className='btns'
                                        onClick={() => Quantit(item.id, item.product?.id, (item.quantity + 1))}
                                    >+</button>
                                    <div className='quantit'>
                                        {item.quantity}
                                    </div>
                                    <button
                                        className='btns'
                                        onClick={() => item.quantity > 0 ? Quantit(item.id, item.product?.id, (item.quantity - 1)) : item.quantity}
                                    >-</button>
                                </div>
                            </div>
                        </div>
                        <div className='total'>
                            Total: <strong>$ {item.product.price * item.quantity} </strong>
                        </div>
                    </div>
                ))
                }

                <div className='total'>
                    Total Card : <strong>$ {total} </strong>
                </div>
                <br />
                <Button
                    onClick={() => dispatch(checkoutProductsCardThunk())}
                >Checkout</Button>
                <br />
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default Sidebar;