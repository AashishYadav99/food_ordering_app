import { useDispatch, useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import SweetAlert2 from "react-sweetalert2";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { AiOutlineMinusSquare } from "react-icons/ai";


import {
  decreaseQuantity,
  increaseQuantity,
  deleteItem,
  clearCart,
} from "../Store/CartSlice";

function Cart({ activeCart, setActiveCart }) {
  const [swalProps, setSwalProps] = useState({});

  const dispatch = useDispatch();

  const cartItem = useSelector((state) => state.Food.item);

  const totalAmount = cartItem
    .map((item) => item.price)
    .reduce((total, price) => total + price, 0);

  return (
    <>
     <div
  className={`fixed right-0 top-16 w-full sm:w-[40vw] md:w-[30vw] lg:w-[20vw] h-full rounded-sm bg-gray-100 flex flex-col overflow-hidden ${
    activeCart ? "translate-x-0" : "translate-x-full"
  } transition-all duration-500 z-50`}
>
  <div className="flex justify-between items-center px-4 py-2 bg-gray-200">
    <h1 className="text-lg font-medium">My Order</h1>
    <IoMdClose
      onClick={() => setActiveCart(!activeCart)}
      className="cursor-pointer border-2 rounded-md border-black text-lg font-bold p-1 hover:bg-red-400"
    />
  </div>
  <div className="flex-1 overflow-y-auto px-4 py-2">
    <ul>
      {cartItem.length > 0 ? (
        cartItem.map((item, index) => (
          <li
            key={index}
            className="bg-white p-2 rounded-md shadow-lg mb-2 flex justify-between items-center"
          >
            <img
              src={item.img}
              alt="failed"
              className="h-14 w-14 rounded-md mr-4"
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <h1 className="text-sm font-medium">{item.name}</h1>
                <MdDelete
                  onClick={() => dispatch(deleteItem(item.id))}
                  className="text-lg ml-4 cursor-pointer text-red-600"
                />
              </div>
              <div className="flex justify-between items-center mt-2">
                <h1 className="text-green-500 font-bold text-sm">₹{item.price}</h1>
                <div className="flex items-center">
                  {/* <button
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    className="bg-white text-black rounded-md w-6 h-6 flex items-center justify-center border-2 border-gray p-2"
                  >
                     -
                     </button> */}
                    <AiOutlineMinusSquare onClick={() => dispatch(decreaseQuantity(item.id))}
                    className="bg-white text-black rounded-md w-6 h-6 flex items-center justify-center " />

                   
                  <span className="mx-2">{item.quantity}</span>
                  {/* <button
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    className="bg-white text-black rounded-md w-6 h-6 flex items-center justify-center border-2 border-gray text-center "
                  >
                    +
                    </button> */}
                    <AiOutlinePlusSquare onClick={() => dispatch(increaseQuantity(item.id))}
                    className="bg-white text-black rounded-md w-6 h-6 flex items-center justify-center  text-center "/>
                  
                </div>
              </div>
            </div>
          </li>
        ))
      ) : (
        <h1 className="text-center text-lg font-bold">Your cart is empty.</h1>
      )}
    </ul>
  </div>
  <div className="bg-gray-200 p-4">
    <h2 className="mb-2 text-sm">Items: {cartItem.length}</h2>
    <h2 className="mb-4 text-sm">
      Total Amount:{" "}
      <span className="font-bold text-green-600">₹{totalAmount}</span>
    </h2>
    <button
      className="bg-green-600 rounded-md w-full h-10 mb-14 font-medium"
      onClick={() => {
        dispatch(clearCart());
        setSwalProps({
          show: true,
          title: "Congratulations!",
          text: "Your order has been successfully placed.",
        });
      }}
    >
      Checkout
    </button>
    <SweetAlert2 {...swalProps} />
  </div>
</div>


    </>
  );
}

export default Cart;
