import { useEffect, useState } from "react";
import API from "../api";

export default function Insurance() {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    API.get("/insurance")
      .then((res) => setPolicies(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Insurance</h1>
      {policies.length === 0 ? (
        <p className="text-gray-500">No policies available</p>
      ) : (
        <ul className="space-y-3">
          {policies.map((p) => (
            <li key={p.id} className="p-3 border rounded bg-white shadow">
              <h2 className="font-bold">{p.company}</h2>
              <p className="text-gray-600">Plan: {p.plan}</p>
              <p className="text-sm text-gray-500">
                Coverage: {p.coverage} | Premium: ₹{p.premium}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
