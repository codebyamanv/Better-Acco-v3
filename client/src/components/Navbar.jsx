import React from "react";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';

const Navbar = () => {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Listings", href: "/listings" },
    { name: "Blogs", href: "/blogs" },
  ];

  return (
    <div className="h-[80px]">
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="mr-2 pl-2 pr-2 rounded-2xl hover:bg-[#7BBCB0] hover:shadow-md text-bold text-gray-900 hover:text-white transition duration-300 ease-in-out"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <a
            href="/"
            className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0"
          >
            <img src="/assets/images/nav-log.png" alt="Better Acco Logo" className="pt-1" />
          </a>
          <div className="lg:w-2/5 inline-flex lg:justify-end lg:ml-0">
            <button className="mr-2 pr-3 " > <AccountCircleOutlinedIcon/>
              Login/Register
            </button>
            <button className="theme-button pr-3 text-white"> <AddHomeOutlinedIcon/>
              Add Listing
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;