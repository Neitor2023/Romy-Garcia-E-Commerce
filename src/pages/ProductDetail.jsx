import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './ProductDetail.css'
import { useDispatch, useSelector } from "react-redux";
import { filterCategoriesThunk } from "../store/slices/products.slice";
import { setIsLoading } from '../store/slices/isLoading.slice'
import { createProductsCardThunk } from '../store/slices/productsCard.slice';


const ProductDetail = () => {
  const { id } = useParams()
  const [detail, setDetail] = useState({})
  const [btn_i, setBtn_i] = useState(1)
  const [swBntLeft, setSwBntLeft] = useState(true)
  const [swBntRight, setSwBntRight] = useState(true)
  const [quatity, setQuatity] = useState(1)
  const [idCategory, setIdCategory] = useState(10)

  const dispatch = useDispatch()
  const products = useSelector(state => state.products)

  useEffect(() => {
    dispatch( setIsLoading( true ) )
    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
      .then(resp => {
        setDetail(resp.data)
        setIdCategory(resp.data.categoryId)
      })
      .catch(error => console.error(error))
      .finally( () =>  dispatch( setIsLoading( false ) ) )
  }, [id])

  useEffect(() => {
    dispatch(filterCategoriesThunk(idCategory))
  }, [detail.categoryId])

  const addProduct = () => {
    const data ={
        quantity: quatity,
        productId: id
    }
    dispatch(createProductsCardThunk(data))
  }

  return (
    <div>
      <div className='container_0_column'>
        <div className="title">
          <h1>{detail.title}</h1>
        </div>
        <div className='container_1_row'>
          <div className='container2_left_column'>
            <div className='container3_row'>
              <div className='container4_arrow_left'>
                {swBntLeft &&
                  <i className='bx bxs-chevron-left-circle bx-lg'
                    onClick={() => {
                      if (btn_i > 0) {
                        setBtn_i(btn_i - 1)
                      }
                      if (btn_i == 1) {
                        setSwBntLeft(false)
                      }
                      if (!swBntRight) {
                        setSwBntRight(true)
                      }
                    }}
                  ></i>
                }
              </div>
              <div className='container4_img01_center'>
                <p>{detail[0]?.category.name}</p>
                <img className="img" src={detail.images?.[btn_i].url} />
              </div>
              <div className='container4_arrow_right'>
                {swBntRight && <i className='bx bxs-chevron-right-circle bx-lg'
                  onClick={() => {
                    if (btn_i < 2) {
                      setBtn_i(btn_i + 1)
                    }
                    if (!swBntLeft) {
                      setSwBntLeft(true)
                    }
                    if (btn_i == 1) {
                      setSwBntRight(false)
                    }
                  }}
                ></i>
                }
              </div>
            </div>
            <div className='container5_arrow'>
              <img onClick={() => {
                setSwBntRight(true)
                setSwBntLeft(false)
                setBtn_i(0)
              }} className="img_mini" src={detail.images?.[0].url} />
              <img onClick={() => {
                setSwBntRight(true)
                setSwBntLeft(true)
                setBtn_i(1)
              }} className="img_mini" src={detail.images?.[1].url} />
              <img onClick={() => {
                setSwBntRight(false)
                setSwBntLeft(true)
                setBtn_i(2)
              }} className="img_mini" src={detail.images?.[2].url} />
            </div>
          </div>
          <div className='container2_right_column'>
            <div className='container6_column'>
              <div className='container7_brand_left'>
                <h3>{detail.brand}</h3>
                <p>{detail.description}</p>
              </div>
              <div className='price_quantity_row'>
                <div className='price_column'>
                  <p>Price:</p>
                  <h5>$ {detail.price}</h5>
                </div>
                <div className='quantity_column'>
                <p>Quantity:</p>
                <div className="quatity">
                <button onClick={() => setQuatity(quatity + 1)} className="btn_qua">
                  <h2 className="txt_qua"> + </h2>
                </button>
                <h5 className="txt_qua"> {quatity} </h5>
                <button onClick={() => quatity == 0 ? quatity : setQuatity(quatity - 1)} className="btn_qua">
                  <h2 className="txt_qua"> - </h2>
                </button>
              </div>                
                </div>
              </div>
            </div>
            <div className="btn_add">
            <button
            className="btn_add"
            onClick={addProduct}
            >
              <h2 className="add_text">Add to Card  </h2><i className='bx bx-cart-add bx-md'></i>
            </button>
          </div>            
          </div>
        </div>
      </div>      
      <br />
      <h2 className='discover'>Discover similar items</h2>
      <Container>
        <Row xs={1} md={2} lg={3} className='py-3'>
          {products.map(product => (
            <Col className='mb-3' key={product.id}>
              <Card
                as={Link}
                to={`/product/${product.id}`}
              >
                <Card.Img
                  onClick={() => `/product/${product.id}`}
                  variant="top"
                  src={product.images[0].url}
                  style={{ height: 200 }} // , objectFit: "cover"
                />
                <Card.Body>
                  <Card.Text>
                    {product.brand}
                  </Card.Text>
                  <Card.Title>{product.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))
          }
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetail;