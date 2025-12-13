import React, { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function StoreDetails(){
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(()=> {
    (async ()=> {
      try {
        const res = await api.get(`/stores/${id}`);
        setStore(res.data);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed");
      }
    })();
  },[id]);

  const submit = async () => {
    try {
      await api.post("/ratings", { storeId: id, rating });
      // reload
      const res = await api.get(`/stores/${id}`);
      setStore(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || "Error");
    }
  };

  if (!store) return <div>Loading...</div>;
  return (
    <div>
      <h2>{store.store.name}</h2>
      <div>Address: {store.store.address}</div>
      <div>Average: {store.averageRating}</div>

      <h3>Ratings</h3>
      <ul>
        {store.ratings.map(r => <li key={r._id}>{r.user.name} ({r.user.email}) - {r.rating}</li>)}
      </ul>

      {user && user.role === "user" && (
        <div>
          <h4>Submit/Update Your Rating</h4>
          <select value={rating} onChange={e=>setRating(Number(e.target.value))}>
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <button onClick={submit}>Submit Rating</button>
        </div>
      )}
    </div>
  );
}

