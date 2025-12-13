import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminDashboard(){
  const [data, setData] = useState(null);

  useEffect(()=> {
    (async ()=> {
      try {
        const res = await api.get("/stores/dashboard/summary");
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  },[]);

  if (!data) return <div>Loading...</div>;
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>Total Users: {data.totalUsers}</div>
      <div>Total Stores: {data.totalStores}</div>
      <div>Total Ratings: {data.totalRatings}</div>
    </div>
  );
}
