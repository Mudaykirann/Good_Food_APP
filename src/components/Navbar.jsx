import { NavLink } from 'react-router-dom';
import { LuHome } from "react-icons/lu";
import { IoFastFoodSharp } from "react-icons/io5";
import { MdStars } from "react-icons/md";
import logo from '../assets/Premium_Vector___Good_food_logo_design-removebg-preview.png';
import { useEffect, useState } from 'react';
import '../components/css/responsive.css'
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";

function Navbar() {
    const [isfloating, setisfloating] = useState(false);
    const [isopening, setisopening] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const shouldFloat = scrollPosition > 0;

            setisfloating(shouldFloat);
        }

        window.addEventListener('scroll', handleScroll);
        return () => { window.removeEventListener('scroll', handleScroll) }
    }, [])
    const toggle = () => {
        document.querySelector('#nav-items').classList.toggle('active')
        setisopening(!isopening)
    }
    return (
        <div className='navs'>
            <nav id='navbar' className={isfloating ? 'floating-number text-black  flex justify-evenly items-center' : 'regular-navbar text-black  flex justify-evenly items-center '}>
                <div>
                    <img src={logo} id='logo' className='p-2 m-2' alt="" />
                </div>
                <ul className=" flex  border rounded-[35px] py-[14px] px-[40px] text-white bg-black hover:shadow-4 transition duration-300 gap-x-8" id='nav-items'>
                    <NavLink id='nav-item' className="xl:text-[17px]  hover:text-blue-800 transition duration-300 flex flex-col justify-center items-center" to='/' exact activeClassName="active"><LuHome /> Home</NavLink>
                    <NavLink id='nav-item' className="xl:text-[17px]  hover:text-blue-800 transition duration-300 flex flex-col justify-center items-center" to='/items' activeClassName="active"> <IoFastFoodSharp /> Items</NavLink>
                    <NavLink id='nav-item' className="xl:text-[17px]  hover:text-blue-800 transition duration-300 flex flex-col justify-center items-center" to='/popular' activeClassName="active"> <MdStars /> Populars</NavLink>
                </ul>
                <button className="rounded bg-red-500 py-2 px-[20px] mr-[10px] text-white hover:bg-red-900 transition duration-300">API</button>
                {
                    !isopening ? <RxHamburgerMenu size={36} onClick={toggle} color="black" id='hamburger' className='hidden' /> : <RxCross1 size={36} onClick={toggle} color="black" id='cross' className='cursor-pointer' />
                }
            </nav>
        </div>
    )
}

export default Navbar;
