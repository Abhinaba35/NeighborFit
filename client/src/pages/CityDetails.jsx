import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const CityDetails = () => {
  const { id } = useParams();
  const [city, setCity] = useState({});
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/admin/cities`).then((res) => {
      const found = res.data.find((c) => c._id === id);
      setCity(found || {});
    });
    axios.get(`${import.meta.env.VITE_API_URL}/review/${id}`).then((res) => {
      setReviews(res.data);
    });
  }, [id]);

  const renderSection = (title, content) => (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <div>{content}</div>
    </div>
  );

  // Pick a city image (cycle 1-5) if not present
  const cityImg =
    city.imageUrl ||
    `/images/city.jpg`;

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 relative mt-4">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-blue-300 rounded-t-3xl" />
        <img
          src={cityImg}
          alt="City"
          className="w-full h-56 object-cover rounded-2xl mb-6 shadow-md border border-blue-100"
          style={{ background: "#e0e7ef", objectPosition: "center" }}
        />
        <h2 className="text-4xl font-extrabold mb-4 text-blue-700 text-center drop-shadow-lg">
          {city.name}
        </h2>
        <p className="text-lg text-gray-700 mb-6 text-center">
          State:{" "}
          <span className="font-semibold text-blue-800">{city.state}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {renderSection(
            "Transport",
            <>
              <p>
                🚌 <span className="font-medium">Bus Stand:</span>{" "}
                {city.transport?.busStandDistance} km
              </p>
              <p>
                🚆 <span className="font-medium">Rail Station:</span>{" "}
                {city.transport?.railStationDistance} km
              </p>
              <p>
                ✈️ <span className="font-medium">Airport:</span>{" "}
                {city.transport?.airportDistance} km
              </p>
            </>
          )}

          {renderSection(
            "Education",
            <>
              <p>
                🏫 <span className="font-medium">School:</span>{" "}
                {city.education?.schoolDistance} km (
                {city.education?.schoolQuality}/10)
              </p>
              <p>
                🎓 <span className="font-medium">College:</span>{" "}
                {city.education?.collegeDistance} km
              </p>
            </>
          )}

          {renderSection(
            "Health",
            <>
              <p>
                🏥 <span className="font-medium">Hospital:</span>{" "}
                {city.health?.hospitalDistance} km (
                {city.health?.hospitalQuality}/10)
              </p>
              <p>
                💪 <span className="font-medium">Gym:</span>{" "}
                {city.health?.gymDistance} km ({city.health?.gymQuality}/10)
              </p>
            </>
          )}

          {renderSection(
            "Financial",
            <>
              <p>
                🏦 <span className="font-medium">Bank:</span>{" "}
                {city.financial?.bankDistance} km
              </p>
              <p>
                💰 <span className="font-medium">Avg Salary:</span> ₹
                {city.financial?.avgSalary}
              </p>
            </>
          )}

          {renderSection(
            "Entertainment",
            <>
              <p>
                🌳 <span className="font-medium">Park:</span>{" "}
                {city.entertainment?.parkDistance} km (
                {city.entertainment?.parkQuality}/10)
              </p>
              <p>
                🛍️ <span className="font-medium">Mall:</span>{" "}
                {city.entertainment?.mallDistance} km (
                {city.entertainment?.mallQuality}/10)
              </p>
            </>
          )}

          {renderSection(
            "Fitness & Lifestyle",
            <>
              <p>
                ⏰ <span className="font-medium">Avg Wake Time:</span>{" "}
                {city.fitness?.avgWakeTime}
              </p>
              <p>
                😴 <span className="font-medium">Avg Sleep Time:</span>{" "}
                {city.fitness?.avgSleepTime}
              </p>
              <p>
                🍽️ <span className="font-medium">Food Quality:</span>{" "}
                {city.fitness?.avgFoodQuality}/10
              </p>
              <p>
                🧘 <span className="font-medium">Yoga/Exercise:</span>{" "}
                {city.fitness?.yogaOrExerciseTime}
              </p>
            </>
          )}
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4 text-blue-700">
            User Reviews
          </h3>
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            <ul className="space-y-3">
              {reviews.map((review) => (
                <li
                  key={review._id}
                  className="border border-blue-100 p-4 rounded-xl bg-blue-50 shadow-sm"
                >
                  <p className="font-semibold text-blue-800 mb-1">
                    ⭐ {review.rating}/5
                  </p>
                  <p className="text-gray-700">{review.comment}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CityDetails;
