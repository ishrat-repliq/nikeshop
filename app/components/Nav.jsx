"use client"
import Image from "next/image";
import { hamburger } from "../assets/icons";
import { headerLogo } from "../assets/images";
import { navLinks } from "../constants";
import Link from "next/link";
import SearchBar from "./search-bar";
import { Cart } from "./Cart";
import { useState } from "react";
import { ShoppingBag, User } from "lucide-react";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [cartItemCount, setCartItemCount] = useState(1)
  return (
    <header className='padding-x py-4 absolute z-10 w-full'>
      <nav className='flex justify-between items-center max-container'>
        <a href='/'>
          <Image
            src={headerLogo}
            alt='logo'
            width={129}
            height={29}
            className='m-0 w-[129px] h-[29px]'
          />
        </a>
        <ul className='flex-1 flex justify-center items-center gap-16 max-lg:hidden'>
          {navLinks.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className='font-montserrat leading-normal text-lg text-slate-gray'
              >
                {item.label}
              </Link>
            </li>
            
          ))}
          <li>
            {/* search peram */}
            
          </li>
        </ul>
        <div className='flex gap-2 text-lg leading-normal font-medium font-montserrat max-lg:hidden wide:mr-24'>
          <Link href='/auth/signup'>Sign in</Link>
          <span>/</span>
          <Link href='/'>
          <ShoppingBag  />
          {cartItemCount > 0 && (
                <span className=" absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  {cartItemCount}
                </span>
              )}
          </Link>
          {/* <Cart/> */}
        </div>
        <div className='hidden max-lg:block'>
          <button onClick={() => setIsOpen(!isOpen)}>
         { isOpen?<h2>close</h2>: <Image src={hamburger} alt='hamburger icon' width={25} height={25} />}
          </button>
          
        </div>
        {isOpen && (
        <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
         
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-5">
            <Link href="/account" className="text-gray-600 hover:text-gray-800 p-2">
              <User className="h-6 w-6" />
            </Link>
            <Link href="/cart" className="text-gray-600 hover:text-gray-800 p-2 relative">
              <ShoppingBag className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div> )}
      </nav>
    </header>
  );
};

export default Nav;


// import { useState } from "react"
// import Link from "next/link"
// import { Menu, X, Search, ShoppingCart, User } from "lucide-react"

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [cartItemCount, setCartItemCount] = useState(0)

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
//   const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

//   return (
//     <nav className="padding-x py-8 absolute z-10 w-full">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <Link href="/" className="text-2xl font-bold text-gray-800">
//               ShopLogo
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:block">
//             <div className="ml-10 flex items-baseline space-x-4">
//               <Link href="/" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
//                 Home
//               </Link>
//               <div className="relative group">
//                 <button className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
//                   Categories
//                 </button>
//                 <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
//                   <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
//                     <Link
//                       href="/category/electronics"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       Electronics
//                     </Link>
//                     <Link href="/category/clothing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                       Clothing
//                     </Link>
//                     <Link href="/category/books" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                       Books
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//               <Link
//                 href="/deals"
//                 className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
//               >
//                 Deals
//               </Link>
//               <Link
//                 href="/contact"
//                 className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
//               >
//                 Contact
//               </Link>
//             </div>
//           </div>

//           {/* Search, User, and Cart Icons */}
//           <div className="hidden md:flex items-center">
           
//             <Link href="/account" className="text-gray-600 hover:text-gray-800 p-2">
//               <User className="h-6 w-6" />
//             </Link>
//             <Link href="/cart" className="text-gray-600 hover:text-gray-800 p-2 relative">
//               <ShoppingCart className="h-6 w-6" />
//               {cartItemCount > 0 && (
//                 <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
//                   {cartItemCount}
//                 </span>
//               )}
//             </Link>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden flex items-center">
//             <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-800 p-2">
//               {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>
//         {/* <button
//           onClick={() => setCartItemCount((prev) => prev + 1)}
//           className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Add to Cart
//         </button> */}
//       </div>

//       {/* Mobile menu */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-black absolute top-16 left-0 w-full bg-white shadow-md p-4">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 ">
//             <Link
//               href="/"
//               className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium"
//             >
//               Home
//             </Link>
//             <Link
//               href="/categories"
//               className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium"
//             >
//               Categories
//             </Link>
//             <Link
//               href="/deals"
//               className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium"
//             >
//               Deals
//             </Link>
//             <Link
//               href="/contact"
//               className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium"
//             >
//               Contact
//             </Link>
//           </div>
//           <div className="pt-4 pb-3 border-t border-gray-200">
//             <div className="flex items-center px-5">
//               <Link href="/account" className="text-gray-600 hover:text-gray-800 p-2">
//                 <User className="h-6 w-6" />
//               </Link>
//               <Link href="/cart" className="text-gray-600 hover:text-gray-800 p-2 relative">
//                 <ShoppingCart className="h-6 w-6" />
//                 {cartItemCount > 0 && (
//                   <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
//                     {cartItemCount}
//                   </span>
//                 )}
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}

   
//     </nav>
//   )
// }

// export default Navbar

