import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setSearchQuery } from "../Store/CartSlice";
import { IoCartOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import Cart from "./Cart";

function Navbar() {
  const dispatch = useDispatch();
  const [localQuery, setLocalQuery] = useState("");
  const [activeCart, setActiveCart] = useState(false);

  const foodItems = useSelector((state) => state.Food.item);

  const handleChange = (e) => {
    const value = e.target.value;
    setLocalQuery(value);
    dispatch(setSearchQuery(value));
  };

  return (
    <>
      <div>
        <nav className="bg-gray-600 fixed top-0 w-full z-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex-1 flex items-center justify-between sm:justify-start">
                <div className="flex-shrink-0">
                  <a
                    href="#"
                    className="rounded-full bg-orange-500 text-black px-3 py-2 w-32 text-center text-sm font-medium"
                    aria-current="page"
                  >
                    ZWIGATO
                  </a>
                </div>
                <div className="hidden sm:ml-6 sm:block"></div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="relative flex items-center">
                  <input
                    value={localQuery}
                    onChange={handleChange}
                    type="text"
                    placeholder="Search foods"
                    className="px-2 py-3 text-sm border rounded-md outline-none bg-slate-100 border-none w-30 sm:w-40"
                  />
                  <CiSearch className="h-8 w-8 rounded-md absolute right-0 top-0 mt-2 mr-2" />
                </div>

                <IoCartOutline
                  onClick={() => setActiveCart(!activeCart)}
                  className="h-10 w-10 ms-2 relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 cursor-pointer"
                />
                {foodItems.length > 0 && (
                  <span className="absolute top-4 left-full transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                    {foodItems.length}
                    <span className="sr-only">unread messages</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </nav>
        <Cart activeCart={activeCart} setActiveCart={setActiveCart} />
      </div>
    </>
  );
}

export default Navbar;
