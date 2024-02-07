import Navbar from "./Navbar"
import img from '../assets/istockphoto-1399768737-612x612.jpg'
import { MdStars } from "react-icons/md";

import { useEffect, useState } from "react";
import { ClockLoader } from "react-spinners";


function Popular() {


    const [data, setdata] = useState();
    const [loading, setloading] = useState(false)



    useEffect(() => {
        const fetchdata = async () => {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
            if (response) {
                const result = await response.json();
                const items = result.categories;
                setdata(items);
                setloading(false);
                console.log(items)
            }
            else {
                setloading(true);
            }
        }
        fetchdata();
    }, [])




    return (
        <>
            <Navbar />
            <div className="container">
                <div className="imgbox relative">
                    <img src={img} className='' alt="" />
                    <h2 id="text" className="flex items-center text-white text-5xl"> <MdStars /> Popular</h2>
                </div>
                <div className="items-content">
                    <div className="cards" >
                        {data && !loading ? (
                            data.map((ele) => {
                                return (
                                    <div key={ele.idCategory} className="card">
                                        <div className="img-box"><img src={ele.strCategoryThumb} className="" alt="" /></div>
                                        <div className="title text-xl pb-[14px] text-red-800"><h3>{ele.strCategory}</h3></div>
                                    </div>
                                );
                            })
                        ) : (
                            <ClockLoader className="mt-36" color="green" size={50} loading />
                        )}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Popular
