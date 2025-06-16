const mongoose = require("mongoose");

const pastWorkSchema = new mongoose.Schema({
  companyName: String,
  location: String,
  position: String,
});

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    resume: { type: String, required: true }, // path to PDF
    experience: { type: Number, required: true }, // years
    pastWorkExperience: [pastWorkSchema],
    relocation: { type: Boolean, default: false },
    datesAvailable: [{ type: Date }],
    location: { type: String, required: true },
    status: { type: String, default: "pending" }, // default status is 'pending'
    rejectedAt: { type: Date }, // timestamp for when the application was rejected
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
