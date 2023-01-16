import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import {
  listProductDetails,
  updateProduct,
} from '../actions/productActions'

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const [idDelete, setidDelete] = useState(0);


  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }

    if (idDelete != 0) {
      dispatch(listProductDetails(productId));
    }

  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {

    if (product) {


      if (product._id) { var productId = product._id; }

      if (productId && cartItems) {
        var item_qty;
        cartItems.map((item) => {
          if (productId === item.product) {
            item_qty = item.qty;
            console.log(item_qty);
          }
        })
      }
      if (item_qty) { var countInStock = product.countInStock + item_qty }
      console.log(product.countInStock);
      console.log(item_qty);
      var name = product.name;
      var price = product.price;
      var image = product.image;
      var brand = product.brand;
      var category = product.category;
      var description = product.description;
      var expiryDate = product.expiryDate;
      dispatch(
        updateProduct({
          _id: productId,
          name,
          price,
          image,
          brand,
          category,
          description,
          expiryDate,
          countInStock,
        })
      )
    }
    dispatch(removeFromCart(id));
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={18}>
        <h1>MY Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>₹{item.price}</Col>
                  <Col md={2}>
                    {/* <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control> */}
                    <p>{item.qty}</p>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => {

                        removeFromCartHandler(item.product);
                        setidDelete(item.product);
                      }
                      }
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>
              Order Details
            </h2>
            ₹
            {cartItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)
              .toFixed(2)}
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              type='button'
              className='btn-block'
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Col>
      {/* <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
              Order Details
              </h2>
              ₹
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col> */}
    </Row>
  )
}

export default CartScreen
