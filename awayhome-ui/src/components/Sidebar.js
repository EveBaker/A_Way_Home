import React, { useState } from 'react';

const Sidebar = () => {
  const [distance, setDistance] = useState(25);

  const handleSliderChange = (e) => {
    setDistance(e.target.value);
  };

  return (
    <div className="p-4 bg-[#61988E] text-white shadow-md border border-gray-400 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Showing Pets Within {distance} Miles</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="idOrName" className="block mb-2">ID or Name</label>
          <input id="idOrName" type="text" placeholder="EXAMPLE: Josie" className="w-full p-2 rounded-md border border-gray-300 text-gray-700" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Status</label>
          <div className="flex items-center mb-2">
            <input id="statusLost" type="radio" name="status" className="mr-2" />
            <label htmlFor="statusLost">Lost</label>
          </div>
          <div className="flex items-center mb-2">
            <input id="statusFound" type="radio" name="status" className="mr-2" />
            <label htmlFor="statusFound">Found</label>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block mb-2">Location</label>
          <input id="location" type="text" placeholder="City, zip or Address" className="w-full p-2 rounded-md border border-gray-300 text-gray-700" />
        </div>
        <div className="mb-4">
          <label htmlFor="distance" className="block mb-2">Distance</label>
          <input id="distance" type="range" min="0" max="50" value={distance} onChange={handleSliderChange} className="w-full" />
          <div className="text-center mt-2">{distance} Miles</div>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Animal</label>
          <div className="flex items-center mb-2">
            <input id="animalCat" type="radio" name="animal" className="mr-2" />
            <label htmlFor="animalCat">Cat</label>
          </div>
          <div className="flex items-center mb-2">
            <input id="animalDog" type="radio" name="animal" className="mr-2" />
            <label htmlFor="animalDog">Dog</label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Gender</label>
          <div className="flex items-center mb-2">
            <input id="genderAll" type="radio" name="gender" className="mr-2" />
            <label htmlFor="genderAll">All</label>
          </div>
          <div className="flex items-center mb-2">
            <input id="genderFemale" type="radio" name="gender" className="mr-2" />
            <label htmlFor="genderFemale">Female</label>
          </div>
          <div className="flex items-center mb-2">
            <input id="genderMale" type="radio" name="gender" className="mr-2" />
            <label htmlFor="genderMale">Male</label>
          </div>
          <div className="flex items-center mb-2">
            <input id="genderUnknown" type="radio" name="gender" className="mr-2" />
            <label htmlFor="genderUnknown">Unknown</label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Sort</label>
          <div className="flex items-center mb-2">
            <input id="sortRecentlyUpdated" type="radio" name="sort" className="mr-2" />
            <label htmlFor="sortRecentlyUpdated">Recently Updated</label>
          </div>
          <div className="flex items-center mb-2">
            <input id="sortOriginallyPosted" type="radio" name="sort" className="mr-2" />
            <label htmlFor="sortOriginallyPosted">Originally Posted</label>
          </div>
          <div className="flex items-center mb-2">
            <input id="sortNearestDistance" type="radio" name="sort" className="mr-2" />
            <label htmlFor="sortNearestDistance">Nearest Distance</label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Within Past</label>
          <div className="flex items-center mb-2">
            <input id="withinPast1Month" type="radio" name="withinPast" className="mr-2" />
            <label htmlFor="withinPast1Month">1 Month</label>
          </div>
          <div className="flex items-center mb-2">
            <input id="withinPast3Months" type="radio" name="withinPast" className="mr-2" />
            <label htmlFor="withinPast3Months">3 Months</label>
          </div>
          <div className="flex items-center mb-2">
            <input id="withinPast6Months" type="radio" name="withinPast" className="mr-2" />
            <label htmlFor="withinPast6Months">6 Months</label>
          </div>
          <div className="flex items-center mb-2">
            <input id="withinPast1Year" type="radio" name="withinPast" className="mr-2" />
            <label htmlFor="withinPast1Year">1 Year</label>
          </div>
        </div>
        <button type="submit" className="w-full bg-white text-[#61988E] font-bold py-2 rounded-md">Search</button>
      </form>
    </div>
  );
};

export default Sidebar;

