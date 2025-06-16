const Onboarding = require('../models/onboarding.js');
const User = require('../models/User.js');

exports.updateOnboardingStep = async (req, res) => {
  const userId = req.user.id;
  const updateData = req.body;

  try {
    let onboarding = await Onboarding.findOne({ userId });

    if (!onboarding) {
      onboarding = await Onboarding.create({ userId, ...updateData });
    } else {
      await Onboarding.updateOne({ userId }, { $set: updateData });
    }

    if (updateData.onboardingCompleted === true) {
      await User.findByIdAndUpdate(userId, { onboardingCompleted: true });
    }

    res.status(200).json({ message: 'Onboarding step saved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.saveOnboardingProgress = async (req, res) => {
  const { userId, completedStage, currentStep } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the completed stage to the user's list of completed stages
    if (!user.completedStages.includes(completedStage)) {
      user.completedStages.push(completedStage);
    }

      // ✅ Save current step
      if (currentStep) {
        user.currentStep = currentStep;
      }

    // Check if all stages are completed
    const allStagesCompleted = ['step1', 'step2', 'step3', 'step4', 'step5', ].every(stage => user.completedStages.includes(stage));

    if (allStagesCompleted) {
      user.onboardingStatus = true;
    } else {
      user.onboardingStatus = false;
    }

    await user.save();
    res.status(200).json({ message: 'Progress saved successfully', onboardingStatus: user.onboardingStatus, currentStep: user.currentStep });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getOnboardingStatus = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      onboardingStatus: user.onboardingStatus,
      completedStages: user.completedStages,
      currentStep: user.currentStep
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfileImage = async (req, res) => {
  try {
    
    const onboarding = await Onboarding.findOne({ userId: req.user._id });
    if (!onboarding) {
      return res.status(404).json({ message: "Onboarding record not found" });
    }

    onboarding.profileImage = req.file.path; // Save path
    await onboarding.save();

    res.status(200).json({ message: "Profile image updated", profileImage: onboarding.profileImage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update resume
exports.updateResume = async (req, res) => {
  try {
    const onboarding = await Onboarding.findOne({ userId: req.user._id });
    if (!onboarding) {
      return res.status(404).json({ message: "Onboarding record not found" });
    }

    onboarding.resume = req.file.path; // Save path
    await onboarding.save();

    res.status(200).json({ message: "Resume updated", resume: onboarding.resume });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// Edit onboarding fields (excluding profile image and resume)
exports.updateOnboardingFields = async (req, res) => {
  const userId = req.user._id;
  const updateData = req.body;

  try {
    let onboarding = await Onboarding.findOne({ userId });

    if (!onboarding) {
      return res.status(404).json({ message: "Onboarding record not found" });
    }

    // Filter out the profileImage and resume fields from the update data
    const { profileImage, resume, ...otherFields } = updateData;

    // Update only the fields other than profile image and resume
    onboarding = await Onboarding.findOneAndUpdate(
      { userId },
      { $set: otherFields },
      { new: true } // This ensures the updated object is returned
    );

    res.status(200).json({
      message: "Onboarding fields updated successfully",
      updatedOnboarding: onboarding
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
