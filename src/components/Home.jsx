import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { RiSearchLine } from "react-icons/ri";
import MealItem from "./MealItem";
import { PulseLoader } from "react-spinners";
import '../components/css/responsive.css'


function Home() {
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [url, setUrl] = useState("https://www.themealdb.com/api/json/v1/1/search.php?f=a");

    useEffect(() => {
        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setData(data.meals || []);
                setShow(s => !s);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [url]);

    const searchRecipe = () => {
        if (search === "") {
            setUrl("https://www.themealdb.com/api/json/v1/1/search.php?f=a");
        } else if (search.length >= 2) {
            setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
        }
    };


    return (
        <>
            <Navbar />
            <div className="container">
                <div className="box flex flex-col justify-center items-center w-[100%]">
                    <div className="relative ">
                        <RiSearchLine className="absolute top-[32px] left-[10px] text-gray-500" />
                        <input
                            type="text"
                            className="border py-2 px-[30px] rounded-[10px] border-red-900"
                            placeholder="Search the recipe"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={(e) => e.key === searchRecipe()}
                        />
                    </div>
                    <div className="mt-28 flex flex-col justify-center items-center">
                        <div>
                            <h1 className="font-bold text-3xl text-red-500 ">Recipes</h1>
                        </div>
                        <div className="items">
                            {!show ? (<MealItem data={data} />) :
                                (
                                    <PulseLoader className="mt-24" size={20} color="red" loading={show} />

                                )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
