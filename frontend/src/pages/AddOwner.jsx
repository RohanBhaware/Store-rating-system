import React, { useState } from "react";
import api from "../api/axios";

export default function AddOwner() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users/create", {
        ...form,
        role: "owner"
      });
      setMsg("Owner added successfully");
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm mx-auto" style={{ maxWidth: 450 }}>
        <div className="card-body">
          <h4 className="card-title mb-3">Add Store Owner</h4>

          {msg && <div className="alert alert-info">{msg}</div>}

          <form onSubmit={submit}>
            <input
              className="form-control mb-3"
              placeholder="Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              className="form-control mb-3"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              className="form-control mb-3"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />

            <button className="btn btn-primary w-100">
              Add Owner
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
