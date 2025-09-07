import { useEffect, useState } from "react";
import HospitalCard from "../components/HospitalCard";
import API from "../api";

export default function Hospitals() {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    API.get("/hospitals")
      .then((res) => setHospitals(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Hospitals</h1>
      {hospitals.length === 0 ? (
        <p className="text-gray-500">Loading hospitals...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {hospitals.map((hosp) => (
            <HospitalCard
              key={hosp.id}
              name={hosp.name}
              location={hosp.location}
              beds={hosp.beds}
            />
          ))}
        </div>
      )}
    </div>
  );
}
