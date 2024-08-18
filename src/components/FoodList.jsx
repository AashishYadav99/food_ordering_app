import { useDispatch, useSelector } from "react-redux";
import FoodData from "../Food Data/foodData";
import { add } from "../Store/CartSlice";
import { useState } from "react";

function FoodList() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.Food.searchQuery);

  const handleClick = (item) => {
    dispatch(
      add({
        id: item.id,
        name: item.name,
        img: item.img,
        price: item.price,
      })
    );
  };

  const [filter, setFilter] = useState("All");
  const filterData =
    filter === "All"
      ? FoodData
      : FoodData.filter((item) => item.category === filter);

  const handleFilter = (type) => {
    setFilter(type);
  };

  const searchResults = filterData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <div className="my-20 mx-4 sm:mx-6 lg:mx-8">
  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Find the best food</h1>

  <div className="my-5 flex flex-wrap justify-center gap-2">
    <button
      onClick={() => handleFilter("All")}
      className="rounded-md bg-gray-300 px-3 py-2 font-medium text-base sm:text-lg hover:bg-green-600"
    >
      All
    </button>
    <button
      onClick={() => handleFilter("Lunch")}
      className="rounded-md bg-gray-300 px-3 py-2 font-medium text-base sm:text-lg hover:bg-green-600"
    >
      Lunch
    </button>
    <button
      onClick={() => handleFilter("Breakfast")}
      className="rounded-md bg-gray-300 px-3 py-2 font-medium text-base sm:text-lg hover:bg-green-600"
    >
      Breakfast
    </button>
    <button
      onClick={() => handleFilter("Dinner")}
      className="rounded-md bg-gray-300 px-3 py-2 font-medium text-base sm:text-lg hover:bg-green-600"
    >
      Dinner
    </button>
    <button
      onClick={() => handleFilter("Snacks")}
      className="rounded-md bg-gray-300 px-3 py-2 font-medium text-base sm:text-lg hover:bg-green-600"
    >
      Snacks
    </button>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {searchResults.length > 0 ? (
      searchResults.map((food) => (
        <div
          key={food.id}
          className="border-2 p-2 rounded-md shadow-lg"
        >
          <div className="flex justify-center">
            <img
              src={food.img}
              alt=""
              className="h-40 w-40 align-middle hover:scale-110 transition-transform duration-300 ease-in-out"
            />
          </div>
          <div className="flex justify-between px-5">
            <h1 className="text-lg font-medium">{food.name}</h1>
            <h1 className="text-lg text-green-500 font-medium ">
              ₹{food.price}
            </h1>
          </div>
          <div>
            <p className="text-md px-5 line-clamp-2">{food.desc}</p>
          </div>
          <div className="flex justify-between px-5">
            <p>
              ⭐ <span>{food.rating}</span>
            </p>
            <button
              className="bg-green-600 p-1 rounded-lg"
              onClick={() => handleClick(food)}
            >
              Add to cart
            </button>
          </div>
        </div>
      ))
    ) : (
      <p>No items found</p>
    )}
  </div>
</div>

    </>
  );
}

export default FoodList;
