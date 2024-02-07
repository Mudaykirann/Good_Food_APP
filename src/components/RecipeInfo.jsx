import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { IoPricetagsOutline } from "react-icons/io5";
import ScaleLoader from 'react-spinners/ScaleLoader';
import { AiOutlineMenuUnfold } from "react-icons/ai";

function RecipeInfo() {
    const { MealId } = useParams();
    const [item, setItem] = useState(null);
    const [tags, settags] = useState([]);
    const [loading, setloading] = useState(false);
    let vid = '';

    useEffect(() => {
        const fetchData = async () => {
            if (MealId !== "") {
                try {
                    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${MealId}`);
                    const result = await response.json();
                    const data = result.meals;
                    if (data && data.length > 0) {
                        setItem(data[0]);
                        settags(data[0].strTags.split(','));
                        console.log();
                        console.log(data);
                        setloading(s => !s);
                    } else {
                        setItem(null);
                        setloading(true)

                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchData();
    }, [MealId]);

    if (item) {
        const url = item.strYoutube;
        const str = url.split("=");
        vid = str[str.length - 1];
    }

    return (
        <>
            <Navbar />
            <div className="content mt-[50px] flex flex-col justify-center items-center">
                {!loading && item ? (
                    <>
                        <div className="first flex justify-center flex-wrap items-center   gap-x-[50px]">
                            <img src={item.strMealThumb} className="w-[30%] " id="item-img" alt="Item_Image" />
                            <div className="inner ">
                                <h2 className="xl:text-5xl md:text-4xl sm:text-2xl mb-[20px] text-red-700  font-semibold">{item.strMeal}</h2>
                                <p className="text-2xl mb-[10px]">Category: <span className="text-yellow-900">{item.strCategory}</span></p>
                                <p className="text-2xl mb-[10px]">Area: <span className="text-yellow-900">{item.strArea}</span></p>
                                <p className="text-2xl flex mb-[10px]">Tags: {
                                    tags ?
                                        tags.map((tag, i) => {
                                            return (
                                                <span key={i} className="text-yellow-900 px-[5px] text-xl flex gap-x-2 items-center rounded-[5px]  border border-red-900 mx-[3px]"> <span><IoPricetagsOutline size={18} /></span> {tag}</span>
                                            )
                                        }) : <h2 className="text-yellow-900 px-[5px] text-xl ">No tags</h2>
                                }</p>
                            </div>
                        </div>
                        {/*
                    <div className="box mt-12 bg-red-200 w-[70%] rounded-[25px] text-center">
                        <button title="TAG" className="text-black py-2 text-4xl">{item.strTags}</button>
                    </div>
                    */}

                        <div className="second mt-12 ">
                            <h2 className="text-4xl flex justify-center items-center text-center gap-x-2 my-8"> <AiOutlineMenuUnfold className="text-red-500" size={30} /> Ingredients</h2>
                            <div className="box-1 border px-[150px]">
                                <table className="w-full  mt-4">
                                    <thead className="pb-2">
                                        <tr className="border-b">
                                            <th className="text-left px-[80px] pb-2 text-xl">Ingredient</th>
                                            <th className="text-right px-[80px] pb-2 text-xl">Measurement</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.from({ length: 20 }, (_, i) => i + 1).map((index) => {
                                            const ingredient = item[`strIngredient${index}`];
                                            const measurement = item[`strMeasure${index}`];
                                            if (ingredient && measurement) {
                                                return (
                                                    <tr key={index} className="border-b">
                                                        <td className="py-2 px-[80px]">{ingredient}</td>
                                                        <td className="py-2 px-[80px]">{measurement}</td>
                                                    </tr>
                                                );
                                            }
                                            return null;
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="third w-[80%]">
                            <h2 className="my-8 text-center text-4xl">Instructions</h2>
                            <p className="instructions">{item.strInstructions}</p>
                        </div>
                        <div className="four w-[100%] my-4">
                            <h2 className="text-4xl text-center ">Youtube Link</h2>
                            <div id='link' className='video mt-12 mx-24'>
                                <iframe
                                    width="100%"
                                    height="515"
                                    title="recipeVideo"
                                    className='frame'
                                    src={`https://www.youtube.com/embed/${vid}`}
                                ></iframe>
                            </div>
                        </div>
                    </>
                ) : (
                    <ScaleLoader className="mt-64  flex justify-center items-center"
                        color="#FF6347"
                        loading={loading}
                        size={250}
                    />
                )}
            </div>
        </>
    );
}

export default RecipeInfo;
