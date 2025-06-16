require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const cron = require("node-cron"); // Import node-cron
const Application = require("./models/JobApplication"); // Import the Application model
const User = require("./models/User");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const companyRoutes = require("./routes/companyRoutes");
const jobRoutes = require("./routes/jobRoutes");
// const resumeScoreRoutes = require("./routes/resumeScoreRoutes");
// const interviewPrepration = require("./routes/interviewPreprationRoutes");
// const courseRoutes = require("./routes/courseRoutes");
// const lessonRoutes = require("./routes/lessonRoutes");
// const videoRoutes = require("./routes/videoRoutes");
// const enrollmentRoutes = require("./routes/enrollmentRoutes");
const onboardingRoutes = require("./routes/onboardingRoutes");
const applicationRoutes = require("./routes/jobApplicationRoutes");

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

// Your other routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/jobs", jobRoutes);
// app.use("/api/templates", require("./routes/templateRoutes"));
// app.use("/api/themes", require("./routes/themeRoutes"));
// app.use("/api/resumes", require("./routes/resumeRoutes"));
// app.use("/api/resumes", resumeScoreRoutes);
// app.use("/api/interviews", interviewPrepration);
// app.use("/api/courses", courseRoutes);
// app.use("/api/lessons", lessonRoutes);
// app.use("/api/videos", videoRoutes);
// app.use("/api/enrollment", enrollmentRoutes);
app.use("/api/onboarding", onboardingRoutes);
app.use("/api/applications", applicationRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

console.log("Cron job started...");

cron.schedule("*/1 * * * *", async () => {
  // Runs every minute
  try {
    const cutoffDate = new Date();
    cutoffDate.setMinutes(cutoffDate.getMinutes() - 1); // 1 minute ago

    // Find rejected applications that are older than 1 minute
    const deletedApplications = await Application.find({
      status: "rejected" || "",
      rejectedAt: { $lt: cutoffDate },
    });

    if (deletedApplications.length > 0) {
      // Delete rejected applications older than 1 minute
      const deleteResult = await Application.deleteMany({
        status: "rejected",
        rejectedAt: { $lt: cutoffDate },
      });

      console.log(
        `Deleted ${deleteResult.deletedCount} rejected applications older than 1 minute`
      );

      // For each deleted application, remove the job ID from the corresponding user's appliedJobs
      for (const application of deletedApplications) {
        const userId = application.userId; // Directly access the userId field
        const jobId = application.jobId; // Directly access the jobId field

        // Update the User model by removing the jobId from appliedJobs
        await User.updateOne(
          { _id: userId },
          { $pull: { appliedJobs: jobId } }
        );

        console.log(`Removed job ${jobId} from user ${userId}'s appliedJobs`);
      }
    } else {
      console.log("No rejected applications older than 1 minute to delete.");
    }
  } catch (err) {
    console.error("Error in scheduled job:", err); // Log any errors
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
