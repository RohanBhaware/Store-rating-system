import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Stores() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await api.get("/stores");
      const list = Array.isArray(res.data) ? res.data : res.data.data;
      setStores(list || []);
    })();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Stores</h2>

      <div className="row">
        {stores.map(store => (
          <div key={store._id} className="col-md-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex justify-content-between">
                <div>
                  <Link
                    to={`/store/${store._id}`}
                    className="h5 text-decoration-none"
                  >
                    {store.name}
                  </Link>
                  <p className="text-muted">{store.address}</p>
                </div>

                <div className="text-end">
                  <h4>{store.averageRating ?? 0}</h4>
                  <small className="text-muted">
                    {store.ratingsCount ?? 0} votes
                  </small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
