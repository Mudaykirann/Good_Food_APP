import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"


function ItemInfo() {
    const { idcategory = "" } = useParams();
    const [data, setdata] = useState();


    const fetchdata = () => {
        console.log(idcategory);
    }


    useEffect(() => {
        const fetchdata = async () => {
            console.log()
            if (idcategory !== " ") {
                try {
                    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=${idcategory}`);
                    const result = await response.json();
                    const items = result.meals;
                    console.log(items);
                    setdata(items);
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
        fetchdata();
    }, [idcategory])
    return (
        <>
            <div className="content mt-[50px] flex min-h-[70vh] flex-col justify-center items-center" onClick={fetchdata}>
                <div>
                    {
                        data ? (
                            <>
                                {
                                    data.map((ele) => {
                                        return (
                                            <h2 key={ele.idMeal}>{ele.strMeal}</h2>
                                        )
                                    })
                                }
                            </>
                        ) : (
                            <h2>NO items Found</h2>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default ItemInfo
