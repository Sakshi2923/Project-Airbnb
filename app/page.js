import
"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    fetch(`${API_URL}/api/listings/`)
      .then((res) => res.json())
      .then((json) => {
        console.log("Data from backend:", json);
        setData(json);
      })
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Listings</h1>
      {data.length === 0 ? (
        <p>No data available</p>
      ) : (
        <ul className="space-y-2">
          {data.map((item, index) => (
            <li key={index} className="border p-2 rounded">
              {JSON.stringify(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
