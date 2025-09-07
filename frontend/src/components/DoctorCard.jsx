export default function DoctorCard({ name, specialty, experience }) {
  return (
    <div className="p-4 border rounded-lg shadow bg-white">
      <h2 className="text-lg font-bold text-blue-600">{name}</h2>
      <p className="text-gray-700">{specialty}</p>
      <p className="text-sm text-gray-500">{experience} years experience</p>
    </div>
  );
}
