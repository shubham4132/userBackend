const db = require("./db");
const User = require("./models/user");
const mongoose = require("mongoose");

//CREATE  A FUNCTION FOR USER SIGNUP
async function signup(userDetails) {
  try {
    const user = new User(userDetails);
    const newUser = await user.save();
    console.log("New User Created :", newUser);
  } catch (err) {
    throw err;
  }
}

// signup({
//   email: "shubham@gmail.com",
//   password: "1234@",
//   profilePictureUrl: "https://example.com/profile.jpg",
//   username: "exampleUser",
//   nickname: "examplenickname",
// });

//CREATE A FUNCTION FOR USER LOGIN
async function login(email, password) {
  try {
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      console.log("Logged in User", user);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    throw err;
  }
}

// try {
//   login("shubham@gmail.com", "1234@");
// } catch (error) {
//   console.error("Login failed:", error.message);
// }

//CREATE A FUNCTION TO CHANGE PASSWORD
async function changePassword(email, currentPassword, newPassword) {
  try {
    const user = await User.findOne({ email });
    if (user && user.password === currentPassword) {
      user.password = newPassword;
      const updatedUser = await user.save();
      console.log("Password change for user", updatedUser);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    throw err;
  }
}

// try {
//   changePassword("shubham@gmail.com", "1234@", "5678@");
// } catch (error) {
//   console.error("Password change failed:", error.message);
// }

//CREATE A FUNCTION TO UPDATE PROFILEPICTURE

async function updateProfilePicture(email, newProfilePicUrl) {
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.profilePictureUrl = newProfilePicUrl;
      const updatedUser = await user.save();
      console.log("profile picture updated for user", updatedUser);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    throw err;
  }
}
// CREATE A FUNCTION TO UPDATE A CONTACT DETAILS

async function updateContactDetails(email, updatedContactDetails) {
  try {
    const user = await User.findOne({ email });
    if (user) {
      Object.assign(user, updatedContactDetails); // Update fields like phoneNumber
      const updatedUser = await user.save({ strict: false }); // Allow additional fields like phoneNumber
      console.log("Contact details updated for User:", updatedUser);
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    throw err;
  }
}

// Example usage of the updateContactDetails function
try {
  // Use the correct email that exists in your database
  updateContactDetails("shubham@gmail.com", {
    phoneNumber: 9876543210, // Add phoneNumber
  });
} catch (error) {
  console.error("Contact details update failed:", error.message);
}
