import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function AddStore() {
  const [owners, setOwners] = useState([]);
  const [form, setForm] = useState({ name: "", address: "", owner: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      const res = await api.get("/users");
      setOwners(res.data.filter(u => u.role === "owner"));
    })();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/stores/create", form);
      setMsg("Store added successfully");
      setForm({ name: "", address: "", owner: "" });
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm mx-auto" style={{ maxWidth: 500 }}>
        <div className="card-body">
          <h4 className="card-title mb-3">Add Store</h4>

          {msg && <div className="alert alert-info">{msg}</div>}

          <form onSubmit={submit}>
            <input
              className="form-control mb-3"
              placeholder="Store Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              className="form-control mb-3"
              placeholder="Address"
              value={form.address}
              onChange={e => setForm({ ...form, address: e.target.value })}
              required
            />

            <select
              className="form-select mb-3"
              value={form.owner}
              onChange={e => setForm({ ...form, owner: e.target.value })}
              required
            >
              <option value="">Select Owner</option>
              {owners.map(o => (
                <option key={o._id} value={o._id}>
                  {o.name} ({o.email})
                </option>
              ))}
            </select>

            <button className="btn btn-primary w-100">
              Add Store
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
