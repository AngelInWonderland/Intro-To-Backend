import { User } from "../models/user.models.js";

const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    //basic validation
    if (!username || !password || !email) {
      return res.status(400).json({ message: "All fields are required!!." });
    }

    //check if user already exists

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "user already registered" });
    }

    // create user

    const user = await User.create({
      username,
      password,
      email: email.toLowerCase(),
      loggedIn: false,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error in user registration:", error);
    res.status(500).json({
      message: "Internal Server error. Please try again later.",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    // checking if the user already exists
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase()
    });
    if (!user)
      return res.status(400).json({
        message: "User not found. Please register first.",
      });

    // compare the password

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({
        message: "Invalid credentials. Please try again.",
      })
    

    // if everything is fine , we can log the user in

    res.status(200).json({
      message: "user logged in",
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    })

  } catch (error) {
   
    res.status(500).json({
      message: "Internal Server error. Please try again later."
    })
  }
}

const logoutUser = async (req, res) => {
    try{
        const { email } = req.body;

        const user = await User.findOne({
            email:email.toLowerCase()
        });

        if(!user) return res.status(404).json({
            message: "User not found. Please register first."
        });

        res.status(200).json({
            message: "User logged out successfully."
        });

    }catch(error){
        res.status(500).json({
            message: "Internal Server error. Please try again later.",
            error: error.message
        });

}
}
export { registerUser, loginUser , logoutUser };
