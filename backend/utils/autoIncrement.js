const Counter = require("../models/Counter");

async function getNextSequence(name) {
  const counter = await Counter.findByIdAndUpdate(
    name, // _id = tên bộ đếm
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
}

module.exports = getNextSequence;
