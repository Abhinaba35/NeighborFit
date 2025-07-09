import React, { useState, useEffect } from "react";
import axios from "axios";
import { isLoggedIn as checkIsLoggedIn } from "../utils/auth";

const ReviewSection = ({ cityId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`/api/reviews/${cityId}`);
      setReviews(res.data);
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/reviews",
        { cityId, rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRating(0);
      setComment("");
      fetchReviews();
    } catch (err) {
      console.error("Failed to post review", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [cityId]);

  const [isLoggedIn, setIsLoggedIn] = useState(checkIsLoggedIn());

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(checkIsLoggedIn());
    };
    window.addEventListener("authChanged", checkAuth);
    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("authChanged", checkAuth);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);
  return (
    <div className="p-4 bg-white rounded-xl shadow mt-4">
      <h2 className="text-lg font-semibold mb-2">Resident Reviews</h2>

      {isLoggedIn ? (
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-2">
            <label className="block font-medium">Rating (1 to 10)</label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border rounded px-2 py-1 w-full"
              min="1"
              max="10"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block font-medium">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border rounded px-2 py-1 w-full"
              required
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
            Submit
          </button>
        </form>
      ) : (
        <div className="mb-4 text-red-600 font-semibold">
          Please login to submit a review.
        </div>
      )}

      <div>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review, index) => (
            <div
              key={index}
              className="border-t border-gray-200 pt-2 mt-2 text-sm"
            >
              <p>
                <strong>Rating:</strong> {review.rating}/10
              </p>
              <p>{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
