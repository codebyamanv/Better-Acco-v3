import React from "react";

const Navbar = () => {
  return (
    <div className="h-[80px]">
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap  flex-col md:flex-row items-center">
          <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
            <a className="mr-4 p-1 rounded-2xl hover:bg-[#7BBCB0] hover:shadow-md">Home</a>
            <a className="mr-4 p-1 rounded-2xl hover:bg-[#7BBCB0] hover:shadow-md">About</a>
            <a className="mr-4 p-1 rounded-2xl hover:bg-[#7BBCB0] hover:shadow-md">Listings</a>
            <a className="mr-4 p-1 rounded-2xl hover:bg-[#7BBCB0] hover:shadow-md">Blogs</a>
          </nav>
          <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
            <img src="/assets/images/nav-log.png" alt="logo" className="pt-1" />
          </a>
          <div className="lg:w-2/5 inline-flex lg:justify-end  lg:ml-0">
            <button className="mr-2">Login/Register

            </button>

            <button className="theme-button">
              Add Listing
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};
export default Navbar;
