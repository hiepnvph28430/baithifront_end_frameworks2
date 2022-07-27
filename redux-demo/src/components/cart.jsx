import React from "react"
import { useSelector } from "react-redux"

const Cart = () => {
  const {cart, total} = useSelector(store => store)
  console.log(cart)
  return (
    <div className='cart-container'>
      <h3>Cart</h3>
      {cart?.map(item => (
        <div className="cart-item">
          <h4>{item.name}</h4>
          <img style={{width: "20%"}} src={item.image} alt="" />
          <p>{item.saleOffPrice}</p>
        </div>
      ))}
      <div className="total">
        <div>Total</div>
        <h2>{total}</h2>
      </div>
    </div>
  )
}

export default Cart