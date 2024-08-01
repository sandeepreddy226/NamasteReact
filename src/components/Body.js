import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body =  () =>
{

 const [listOfRestaurants, setListOfRestraunt]  = useState([]);
 const [filteredRestaurant, setFilteredRestaurant] = useState([]);
 const[searchText, setSearchText] = useState("");


 


 useEffect(()=> 
 {
    fetchData();
 },[]);

 const fetchData = async () => {
    const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.3270709&lng=78.6053386&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json= await data.json();
        
      //optional chaining
      setListOfRestraunt( json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      setFilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };

     const onLineStatus = useOnlineStatus();
     if(onLineStatus == false)
      return (
    <h1>
      Looks like you're offline!! please check your internet connection
      </h1>
      ); 
      return listOfRestaurants.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="body">
          <div className="filter flex">
            <div className="search m-4 p-4">
              <input
                type="text"
                data-testid="searchInput"
                className="border border-solid border-black"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
              <button
                className="px-4 py-2 bg-green-100 m-4 rounded-lg"
                onClick={() => {
                  // Filter the restraunt cards and update the UI
                  // searchText
                  console.log(searchText);
    
                  const filteredRestaurant = listOfRestaurants.filter((res) =>
                    res.info.name.toLowerCase().includes(searchText.toLowerCase())
                  );
    
                  setFilteredRestaurant(filteredRestaurant);
                }}
              >
                Search
              </button>
            </div>
            <div className="search m-4 p-4 flex items-center">
              <button
                className="px-4 py-2 bg-blue-100 rounded-lg"
                onClick={() => {
                  const filteredList = listOfRestaurants.filter(
                    (res) => res.info.avgRating > 4.3
                  );
                  setFilteredRestaurant(filteredList);
                }}
              >
                Top Rated Restaurants
              </button>
            </div> 
            </div> 
            <div className="flex flex-wrap">
                    {filteredRestaurant.map((restaurant) =>(
                        <Link  
                        key={restaurant.info.id}
                        to={"/restaurants/" + restaurant.info.id}
                        >
                          <RestaurantCard resData={restaurant} />
                          </Link>
                    ))}
                </div>
            </div>
    );
};

export default Body;