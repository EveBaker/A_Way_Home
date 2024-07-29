import React, { useState } from 'react';

const Sidebar = ({ filters, setFilters }) => {
  const [distance, setDistance] = useState(filters.distance);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleSliderChange = (e) => {
    setDistance(e.target.value);
    setFilters(prevFilters => ({
      ...prevFilters,
      distance: e.target.value
    }));
  };

  return (
    <div className="relative p-4">
      <div className="sticky top-0 p-4 bg-[#61988E] text-white shadow-md border border-gray-400 rounded-lg h-screen">
        <h2 className="text-xl font-bold mb-4">Showing Pets Within {distance} Miles</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="idOrName" className="block mb-2">ID or Name</label>
            <input
              id="idOrName"
              name="idOrName"
              type="text"
              placeholder="EXAMPLE: 1 or Josie"
              className="w-full p-2 rounded-md border border-gray-300 text-gray-700"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block mb-2">Location</label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="City, zip or Address"
              className="w-full p-2 rounded-md border border-gray-300 text-gray-700"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="distance" className="block mb-2">Distance</label>
            <input
              id="distance"
              type="range"
              min="0"
              max="50"
              value={distance}
              onChange={handleSliderChange}
              className="w-full"
            />
            <div className="text-center mt-2">{distance} Miles</div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Animal</label>
            <div className="flex items-center mb-2">
              <input
                id="animalAll"
                name="type"
                type="radio"
                value=""
                className="mr-2"
                onChange={handleInputChange}
              />
              <label htmlFor="animalAll">All</label>
            </div>
            <div className="flex items-center mb-2">
              <input
                id="animalCat"
                name="type"
                type="radio"
                value="cat"
                className="mr-2"
                onChange={handleInputChange}
              />
              <label htmlFor="animalCat">Cat</label>
            </div>
            <div className="flex items-center mb-2">
              <input
                id="animalDog"
                name="type"
                type="radio"
                value="dog"
                className="mr-2"
                onChange={handleInputChange}
              />
              <label htmlFor="animalDog">Dog</label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Gender</label>
            <div className="flex items-center mb-2">
              <input
                id="genderAll"
                name="gender"
                type="radio"
                value=""
                className="mr-2"
                onChange={handleInputChange}
              />
              <label htmlFor="genderAll">All</label>
            </div>
            <div className="flex items-center mb-2">
              <input
                id="genderFemale"
                name="gender"
                type="radio"
                value="female"
                className="mr-2"
                onChange={handleInputChange}
              />
              <label htmlFor="genderFemale">Female</label>
            </div>
            <div className="flex items-center mb-2">
              <input
                id="genderMale"
                name="gender"
                type="radio"
                value="male"
                className="mr-2"
                onChange={handleInputChange}
              />
              <label htmlFor="genderMale">Male</label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Size</label>
            <div className="flex items-center mb-2">
              <input
                id="sizeAll"
                name="size"
                type="radio"
                value=""
                className="mr-2"
                onChange={handleInputChange}
              />
              <label htmlFor="sizeAll">All</label>
            </div>
            <div className="flex items-center mb-2">
              <input
                id="sizeSmall"
                name="size"
                type="radio"
                value="small"
                className="mr-2"
                onChange={handleInputChange}
              />
              <label htmlFor="sizeSmall">Small</label>
            </div>
            <div className="flex items-center mb-2">
              <input
                id="sizeMedium"
                name="size"
                type="radio"
                value="medium"
                className="mr-2"
                onChange={handleInputChange}
              />
              <label htmlFor="sizeMedium">Medium</label>
            </div>
            <div className="flex items-center mb-2">
              <input
                id="sizeLarge"
                name="size"
                type="radio"
                value="large"
                className="mr-2"
                onChange={handleInputChange}
              />
              <label htmlFor="sizeLarge">Large</label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Sort</label>
            <div className="flex items-center mb-2">
              <input
                id="sortDatePost"
                name="sort"
                type="radio"
                value="datePost"
                className="mr-2"
                onChange={handleInputChange}
                checked={filters.sort === 'datePost'}
              />
              <label htmlFor="sortDatePost">Recently Updated</label>
            </div>
            <div className="flex items-center mb-2">
              <input
                id="sortName"
                name="sort"
                type="radio"
                value="name"
                className="mr-2"
                onChange={handleInputChange}
                checked={filters.sort === 'name'}
              />
              <label htmlFor="sortName">Originally Posted</label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;