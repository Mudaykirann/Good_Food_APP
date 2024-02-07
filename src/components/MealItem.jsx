import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function MealItem({ data }) {
    const navigate = useNavigate();

    return (
        <div className="cards">
            {data ? (
                data.map((item) => (
                    <div key={item.idMeal} className="card" onClick={() => navigate(`/${item.idMeal}`)}>
                        <div className="img-box"><img src={item.strMealThumb} className="" alt="" /></div>
                        <div className="title text-xl pb-[14px] text-red-800"><h3>{item.strMeal}</h3></div>
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
//Props validation
MealItem.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            idMeal: PropTypes.string.isRequired,
            strMealThumb: PropTypes.string.isRequired,
            strMeal: PropTypes.string.isRequired,
        })
    ),
};


export default MealItem;
