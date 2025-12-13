import Rating from "../models/Rating.js";

export const submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;
    if (!storeId || !rating) return res.status(400).json({ message: "Missing fields" });
    if (rating < 1 || rating > 5) return res.status(400).json({ message: "Rating must be 1-5" });

    // Use upsert: if rating exists by user for store, update; else create
    const existing = await Rating.findOne({ user: req.user._id, store: storeId });
    if (existing) {
      existing.rating = rating;
      await existing.save();
      return res.json(existing);
    }
    const newRating = await Rating.create({ user: req.user._id, store: storeId, rating });
    res.status(201).json(newRating);
  } catch (err) { console.error(err); res.status(500).json({ message: "Server error" }); }
};

export const getRatingsByStore = async (req, res) => {
  try {
    const ratings = await Rating.find({ store: req.params.storeId }).populate("user", "name email");
    res.json(ratings);
  } catch (err) { res.status(500).json({ message: "Server error" }); }
};

export const getRatingsByUser = async (req, res) => {
  try {
    const ratings = await Rating.find({ user: req.params.userId }).populate("store", "name address");
    res.json(ratings);
  } catch (err) { res.status(500).json({ message: "Server error" }); }
};
