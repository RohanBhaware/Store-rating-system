// backend/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Store from "./models/Store.js";
import Rating from "./models/Rating.js";

dotenv.config();

const MONGO = process.env.MONGO_URI;

const usersData = [
  { name: "Admin User", email: "admin@demo.com", password: "Admin@1234", role: "admin" },
  { name: "Owner One", email: "owner1@demo.com", password: "Owner@1234", role: "owner" },
  { name: "Owner Two", email: "owner2@demo.com", password: "Owner@1234", role: "owner" },
  { name: "User One", email: "user1@demo.com", password: "User@1234", role: "user" },
  { name: "User Two", email: "user2@demo.com", password: "User@1234", role: "user" },
];

const storesData = [
  { name: "Green Grocers", address: "12 Market St" },
  { name: "Cafe Blue", address: "45 River Rd" },
  { name: "Tech Shop", address: "88 Silicon Ave" },
];

async function seed(){
  try{
    await mongoose.connect(MONGO, { useNewUrlParser:true, useUnifiedTopology:true });
    console.log("Connected to Mongo");

    // Clear
    await Rating.deleteMany({});
    await Store.deleteMany({});
    await User.deleteMany({});

    // Create users
    const createdUsers = [];
    for (const u of usersData){
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(u.password, salt);
      const created = await User.create({ name: u.name, email: u.email, password: hash, role: u.role });
      createdUsers.push(created);
    }

    const owner1 = createdUsers.find(x=>x.email==="owner1@demo.com");
    const owner2 = createdUsers.find(x=>x.email==="owner2@demo.com");

    // Create stores - assign owners
    const store1 = await Store.create({ name: storesData[0].name, address: storesData[0].address, owner: owner1._id });
    const store2 = await Store.create({ name: storesData[1].name, address: storesData[1].address, owner: owner2._id });
    const store3 = await Store.create({ name: storesData[2].name, address: storesData[2].address, owner: owner1._id });

    // Create ratings
    const user1 = createdUsers.find(x=>x.email==="user1@demo.com");
    const user2 = createdUsers.find(x=>x.email==="user2@demo.com");

    await Rating.create({ user: user1._id, store: store1._id, rating: 5 });
    await Rating.create({ user: user2._id, store: store1._id, rating: 4 });
    await Rating.create({ user: user1._id, store: store2._id, rating: 3 });
    await Rating.create({ user: user2._id, store: store3._id, rating: 4 });

    console.log("Seed finished!");
    process.exit(0);
  } catch (err){
    console.error(err);
    process.exit(1);
  }
}

seed();
