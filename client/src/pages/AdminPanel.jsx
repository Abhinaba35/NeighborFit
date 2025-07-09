import { useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [form, setForm] = useState({
    name: "",
    state: "",
    country: "",
    overallScore: "",
    image: "",
    safety: { women: "", children: "", crimeRate: "" },
    transport: {
      busStandDistance: "",
      railStationDistance: "",
      airportDistance: "",
    },
    education: { schoolDistance: "", schoolQuality: "", collegeDistance: "" },
    financial: { bankDistance: "", avgSalary: "" },
    health: {
      hospitalDistance: "",
      hospitalQuality: "",
      gymDistance: "",
      gymQuality: "",
    },
    entertainment: {
      parkDistance: "",
      parkQuality: "",
      mallDistance: "",
      mallQuality: "",
    },
    fitness: {
      avgWakeTime: "",
      avgSleepTime: "",
      avgFoodQuality: "",
      yogaOrExerciseTime: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [section, field] = name.split(".");
      setForm((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${import.meta.env.VITE_API_URL}/admin/city`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("City added successfully.");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to add city.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 border-2 border-yellow-600 shadow-xl bg-white rounded-3xl">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-yellow-600 drop-shadow-lg tracking-tight">
        Admin Panel - Add City
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              City Name
            </label>
            <input
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              placeholder="City Name"
              className="p-3 border-2 border-yellow-600 rounded-xl w-full"
              aria-label="City Name"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="state"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              State
            </label>
            <input
              name="state"
              id="state"
              value={form.state}
              onChange={handleChange}
              placeholder="State"
              className="p-3 border-2 border-yellow-600 rounded-xl w-full"
              aria-label="State"
            />
          </div>
        </div>
        <h3 className="text-xl font-bold mt-6">Safety</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="safety.womenRating"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Women Safety Rating (1-10)
            </label>
            <input
              type="number"
              name="safety.womenRating"
              id="safety.womenRating"
              min="1"
              max="10"
              value={form.safety.womenRating || ""}
              onChange={handleChange}
              placeholder="Women Safety Rating"
              className="p-3 border-2 border-yellow-600 rounded-xl w-full"
              aria-label="Women Safety Rating"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="safety.childrenRating"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Children Safety Rating (1-10)
            </label>
            <input
              type="number"
              name="safety.childrenRating"
              id="safety.childrenRating"
              min="1"
              max="10"
              value={form.safety.childrenRating || ""}
              onChange={handleChange}
              placeholder="Children Safety Rating"
              className="p-3 border-2 border-yellow-600 rounded-xl w-full"
              aria-label="Children Safety Rating"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="safety.crimeRateRating"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Crime Rate Rating (1-10)
            </label>
            <input
              type="number"
              name="safety.crimeRateRating"
              id="safety.crimeRateRating"
              min="1"
              max="10"
              value={form.safety.crimeRateRating || ""}
              onChange={handleChange}
              placeholder="Crime Rate Rating"
              className="p-3 border-2 border-yellow-600 rounded-xl w-full"
              aria-label="Crime Rate Rating"
            />
          </div>
        </div>
        <h3 className="text-xl font-bold mt-6">Transport</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="transport.busStandDistance"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Bus Stand Distance (km)
            </label>
            <input
              name="transport.busStandDistance"
              id="transport.busStandDistance"
              value={form.transport.busStandDistance}
              onChange={handleChange}
              placeholder="Bus Stand Distance (km)"
              className="p-3 border-2 border-yellow-600 rounded-xl w-full"
              aria-label="Bus Stand Distance"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="transport.railStationDistance"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Rail Station Distance (km)
            </label>
            <input
              name="transport.railStationDistance"
              id="transport.railStationDistance"
              value={form.transport.railStationDistance}
              onChange={handleChange}
              placeholder="Rail Station Distance (km)"
              className="p-3 border-2 border-yellow-600 rounded-xl w-full"
              aria-label="Rail Station Distance"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="transport.airportDistance"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Airport Distance (km)
            </label>
            <input
              name="transport.airportDistance"
              id="transport.airportDistance"
              value={form.transport.airportDistance}
              onChange={handleChange}
              placeholder="Airport Distance (km)"
              className="p-3 border-2 border-yellow-600 rounded-xl w-full"
              aria-label="Airport Distance"
            />
          </div>
        </div>
        <h3 className="text-xl font-bold mt-6">Education</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="education.schoolDistance"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              School Distance (km)
            </label>
            <input
              name="education.schoolDistance"
              id="education.schoolDistance"
              value={form.education.schoolDistance}
              onChange={handleChange}
              placeholder="School Distance (km)"
              className="p-3 border-2 border-yellow-600 rounded-xl w-full"
              aria-label="School Distance"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="education.schoolQuality"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              School Quality (1-10)
            </label>
            <input
              type="number"
              name="education.schoolQuality"
              id="education.schoolQuality"
              min="1"
              max="10"
              value={form.education.schoolQuality}
              onChange={handleChange}
              placeholder="School Quality (1-10)"
              className="p-3 border-2 border-yellow-600 rounded-xl w-full"
              aria-label="School Quality"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="education.collegeDistance"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              College Distance (km)
            </label>
            <input
              name="education.collegeDistance"
              id="education.collegeDistance"
              value={form.education.collegeDistance}
              onChange={handleChange}
              placeholder="College Distance (km)"
              className="p-3 border-2 border-yellow-600 rounded-xl w-full"
              aria-label="College Distance"
            />
          </div>
        </div>
        <h3 className="text-xl font-bold mt-6">Health</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="health.hospitalDistance"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Hospital Distance (km)
            </label>
            <input
              name="health.hospitalDistance"
              id="health.hospitalDistance"
              value={form.health.hospitalDistance}
              onChange={handleChange}
              placeholder="Hospital Distance (km)"
              className="p-3 border-2 border-yellow-600 rounded-xl w-full"
              aria-label="Hospital Distance"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="health.hospitalQuality"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Hospital Quality (1-10)
            </label>
            <input
              type="number"
              name="health.hospitalQuality"
              id="health.hospitalQuality"
              min="1"
              max="10"
              value={form.health.hospitalQuality}
              onChange={handleChange}
              placeholder="Hospital Quality (1-10)"
              className="p-3 border-2 border-yellow-600 rounded-xl w-full"
              aria-label="Hospital Quality"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="health.gymDistance"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Gym Distance (km)
            </label>
            <input
              name="health.gymDistance"
              id="health.gymDistance"
              value={form.health.gymDistance}
              onChange={handleChange}
              placeholder="Gym Distance (km)"
              className="p-3 border-2 border-yellow-600 rounded-xl w-full"
              aria-label="Gym Distance"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="health.gymQuality"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Gym Quality (1-10)
            </label>
            <input
              type="number"
              name="health.gymQuality"
              id="health.gymQuality"
              min="1"
              max="10"
              value={form.health.gymQuality}
              onChange={handleChange}
              placeholder="Gym Quality (1-10)"
              className="p-3 border-2 border-yellow-600 rounded-xl w-full"
              aria-label="Gym Quality"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-3 rounded-xl font-bold text-lg shadow hover:bg-yellow-600 transition"
          name="submit"
          aria-label="Add City"
        >
          Add City
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;
