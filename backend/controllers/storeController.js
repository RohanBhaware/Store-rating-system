// backend/controllers/storeController.js
import Store from "../models/Store.js";
import Rating from "../models/Rating.js";
import User from "../models/User.js";

/**
 * Create a store (admin only)
 */
export const createStore = async (req, res) => {
  try {
    const { name, address, owner } = req.body;
    if (!name || !address || !owner) {
      return res.status(400).json({ message: "Missing name, address or owner" });
    }
    // optional: validate owner exists
    const ownerExists = await User.findById(owner);
    if (!ownerExists) return res.status(400).json({ message: "Owner not found" });

    const store = await Store.create({ name, address, owner });
    res.status(201).json(store);
  } catch (err) {
    console.error("createStore error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get stores with optional search, filter, sort, pagination
 */
export const getStores = async (req, res) => {
  try {
    const { q, owner, minRating, maxRating, sort, page = 1, limit = 10 } = req.query;
    const filters = {};
    if (owner) filters.owner = owner;
    if (q) {
      const regex = new RegExp(q, "i");
      filters.$or = [{ name: regex }, { address: regex }];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const stores = await Store.find(filters)
      .populate("owner", "name email role")
      .skip(skip)
      .limit(Number(limit));

    // compute avg rating per store
    const storesWithAvg = await Promise.all(
      stores.map(async (s) => {
        const agg = await Rating.aggregate([
          { $match: { store: s._id } },
          { $group: { _id: "$store", avg: { $avg: "$rating" }, count: { $sum: 1 } } },
        ]);
        const avg = agg.length ? Number(agg[0].avg.toFixed(2)) : 0;
        const count = agg.length ? agg[0].count : 0;
        return { ...s.toObject(), averageRating: avg, ratingsCount: count };
      })
    );

    // rating filters
    let filtered = storesWithAvg;
    if (minRating) filtered = filtered.filter((s) => s.averageRating >= Number(minRating));
    if (maxRating) filtered = filtered.filter((s) => s.averageRating <= Number(maxRating));

    // sorting
    if (sort) {
      const key = sort.replace("-", "");
      const dir = sort.startsWith("-") ? -1 : 1;
      filtered.sort((a, b) => {
        if (key === "rating") return (a.averageRating - b.averageRating) * dir;
        if (key === "name") return a.name.localeCompare(b.name) * dir;
        if (key === "createdAt") return (new Date(a.createdAt) - new Date(b.createdAt)) * dir;
        return 0;
      });
    }

    res.json({ data: filtered, page: Number(page), limit: Number(limit) });
  } catch (err) {
    console.error("getStores error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get a single store by id with its ratings and average
 */
export const getStoreById = async (req, res) => {
  try {
    const { id } = req.params;
    const store = await Store.findById(id).populate("owner", "name email role");
    if (!store) return res.status(404).json({ message: "Store not found" });

    const ratings = await Rating.find({ store: store._id }).populate("user", "name email role");
    const avg = ratings.length ? Number((ratings.reduce((a,b)=>a+b.rating,0)/ratings.length).toFixed(2)) : 0;

    res.json({ store, ratings, averageRating: avg });
  } catch (err) {
    console.error("getStoreById error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Dashboard summary for admin
 */
export const dashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStores = await Store.countDocuments();
    const totalRatings = await Rating.countDocuments();
    res.json({ totalUsers, totalStores, totalRatings });
  } catch (err) {
    console.error("dashboard error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
