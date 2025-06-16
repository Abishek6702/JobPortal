const express = require('express');
const { updateOnboardingStep, saveOnboardingProgress, getOnboardingStatus, updateProfileImage, updateResume, updateOnboardingFields } =require('../controllers/onboardingController.js');
const {verifyToken} = require('../middlewares/authMiddleware.js');
const upload = require('../middlewares/upload');

const router = express.Router();

router.post('/update', verifyToken, updateOnboardingStep);
router.post("/save-progress",verifyToken, saveOnboardingProgress);

// Route to get onboarding progress status
router.get("/onboarding-status/:userId",verifyToken, getOnboardingStatus);
router.put('/profile-image', verifyToken, upload.single('profileImage'), updateProfileImage);
// Route to update onboarding fields (excluding image and resume)
router.put('/onboarding/fields', verifyToken, updateOnboardingFields);

// Upload resume
router.put('/resume', verifyToken, upload.single('resume'), updateResume);

module.exports = router;
