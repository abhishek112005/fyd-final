import { useEffect, useState } from "react";
import DoctorCard from "../components/DoctorCard";
import API from "../api";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    API.get("/doctors")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Doctors</h1>
      {doctors.length === 0 ? (
        <p className="text-gray-500">Loading doctors...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {doctors.map((doc) => (
            <DoctorCard
              key={doc.id}
              name={doc.name}
              specialty={doc.specialty}
              experience={doc.experience}
            />
          ))}
        </div>
      )}
    </div>
  );
}
