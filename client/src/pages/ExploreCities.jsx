import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReviewSection from "../components/ReviewSection";

const ExploreCities = () => {
  const [cities, setCities] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/admin/cities`).then((res) => {
      setCities(res.data);
    });
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) setUser(JSON.parse(userInfo));
  }, []);

  const [open, setOpen] = useState({});

  const toggle = (cityId, section) => {
    setOpen((prev) => ({
      ...prev,
      [cityId]: {
        ...prev[cityId],
        [section]: !prev[cityId]?.[section],
      },
    }));
  };

  const getAverageRating = (reviews = []) => {
    if (reviews.length === 0) return "No reviews yet";
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  return (
    <div className="p-4 min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-blue-700 drop-shadow-lg tracking-tight">
        Explore Cities
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {cities.map((city) => (
          <div
            key={city._id}
            className="relative border-0 rounded-3xl shadow-xl bg-white hover:shadow-2xl transition duration-200 flex flex-col items-center overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-cyan-400 to-blue-200" />
            <img
              src={city.imageUrl || `/images/city.jpg`}
              alt="City"
              className="w-full h-48 object-cover rounded-t-3xl mb-4 shadow-sm"
              style={{ objectPosition: "center" }}
            />
            <div className="w-full flex flex-col items-start mb-4 px-6">
              <p className="text-xl font-bold text-blue-700 mb-2 tracking-wide">
                {city.name}
              </p>

              <p className="text-base font-medium text-gray-600 mb-2">
                State:
                <span className="font-normal text-gray-800">{city.state}</span>
              </p>

              <p className="text-sm text-gray-700 mb-2">
                Average Rating:
                <span className="text-blue-600 font-semibold">
                  {getAverageRating(city.reviews)}
                </span>
              </p>
            </div>
            <div className="flex gap-2 w-full px-6 mb-4">
              <Link to={`/city/${city._id}`} className="flex-1">
                <button className="w-full text-center text-white font-semibold py-2 rounded-xl bg-blue-500 hover:bg-blue-600 transition shadow-sm">
                  View Details
                </button>
              </Link>

              <button
                onClick={() => toggle(city._id, "review")}
                className="flex-1 text-center text-blue-700 font-semibold py-2 rounded-xl bg-blue-100 hover:bg-blue-200 transition shadow-sm"
              >
                Review
              </button>
            </div>
            {open[city._id]?.review && user && (
              <div className="w-full px-6 pb-4">
                <ReviewSection cityId={city._id} />
              </div>
            )}
            {open[city._id]?.review && !user && (
              <p className="text-sm text-red-500 px-6 pb-4">
                Please login to submit a review.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreCities;
