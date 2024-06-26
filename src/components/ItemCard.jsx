import React from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import { useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQty,
  decrementQty,
} from "../redux/slice/CartSlice";

import { toast } from "react-hot-toast";

const ItemCard = ({ id, name, qty, price, img }) => {
  const dispatch = useDispatch();

  return (
    <>
      {id && (
        <div className="">
          <div className="flex gap-2 shadow-md rounded-lg p-2 mb-3">
            <img
              src={img}
              alt=""
              className="w-[50px] object-contain select-none h-[50px] "
            />
            <div className="leading-5 w-full">
              <div className="flex justify-between w-full">
                <h2 className="font-bold text-gray-800">{name}</h2>
                <MdDelete
                  onClick={() => {
                    dispatch(removeFromCart({ id, name, qty, price, img }));
                    toast(`${name} Removed!`, {
                      icon: "🗑️",
                    });
                  }}
                  className="right-7 text-gray-600 cursor-pointer hover:text-red-600"
                />
              </div>
              <div className="flex justify-between ">
                <span className="text-green-500 font-bold">₹{price}</span>
                <div className="flex justify-center items-center gap-2 right-7">
                  <AiOutlineMinus
                    onClick={() =>
                      dispatch(qty > 1 ? decrementQty({ id }) : (qty = 0))
                    }
                    className="border-2 border-gray-600 text-gray-600 hover:text-white hover:bg-green-500 hover:border-none rounded-md p-1 text-xl transition-all ease-linear cursor-pointer"
                  />
                  <span className="select-none">{qty}</span>
                  <AiOutlinePlus
                    onClick={() => dispatch(incrementQty({ id }))}
                    className="border-2 border-gray-600 text-gray-600 hover:text-white hover:bg-green-500 hover:border-none rounded-md p-1 text-xl transition-all ease-linear cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemCard;
