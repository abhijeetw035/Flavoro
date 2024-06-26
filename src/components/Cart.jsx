import React from "react";
import { IoMdClose } from "react-icons/io";
import ItemCard from "./ItemCard";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [activeCart, setActiveCart] = useState(false);

  const cartItems = useSelector((state) => state.cart.cart);
  // console.log(cartItems);

  const navigate = useNavigate();

  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.qty * item.price,
    0
  );

  return (
    <>
      <div
        className={`fixed right-0 top-0 w-full lg:w-[20vw] bg-white p-5 h-full mb-3 ${
          activeCart ? "translate-x-0" : "translate-x-full"
        } transition-all duration-500 z-50`}
      >
        <div className="flex justify-between items-center my-3 lg:my-2">
          <span className="text-xl font-bold text-gray-800">My Order: </span>
          <IoMdClose
            onClick={() => setActiveCart(!activeCart)}
            className="border-2 border-gray-600 text-gray-600 font-bold  p-1 text-xl  rounded-md hover:text-red-300 hover:border-red-300 cursor-pointer"
          />
        </div>

        <div className="overflow-scroll no-scrollbar scroll-smooth lg:h-[426px] h-3/4">
          {cartItems.length > 0 ? (
            cartItems.map((food) => {
              return (
                <ItemCard
                  key={food.id}
                  id={food.id}
                  name={food.name}
                  price={food.price}
                  img={food.img}
                  qty={food.qty}
                />
              );
            })
          ) : (
            <h1 className="mt-[85%] text-center text-xl font-medium text-gray-800">
              Your Cart is Empty
            </h1>
          )}
        </div>
        {/* <ItemCard /> */}

        <div className="absolute bottom-0 ">
          <div className="">
            <h3 className="select-none font-semibold text-gray-800">
              Items: {totalQty}
            </h3>
            <h3 className="font-semibold select-none text-gray-800">
              Total Amount: {totalPrice}
            </h3>
          </div>
          <hr className="w-[90vw] lg:w-[18vw] my-2" />
          <button
            onClick={() => navigate("/success")}
            className="bg-green-500 font-bold px-3 text-white py-2 rounded-lg w-[90vw] lg:w-[18vw] mb-5"
          >
            Checkout
          </button>
        </div>
      </div>
      <FaShoppingCart
        onClick={() => setActiveCart(!activeCart)}
        className={`rounded-full bg-white shadow-md text-5xl p-3 fixed bottom-4 right-4 hover:cursor-pointer hover:text-orange-500 ${
          totalQty > 0 &&
          "animate-bounce delay-500 transition-all duration-1000"
        } `}
      />
    </>
  );
};

export default Cart;
