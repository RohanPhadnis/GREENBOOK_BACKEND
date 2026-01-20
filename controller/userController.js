import crypto from "crypto";
import Users from "../model/userModel.js";
import Sessions from "../model/sessionModel.js";

const LOCK_TIME = 15 * 60 * 1000; // 15 minutes

const createSession = async (email) => {
  const sessionId = crypto.randomUUID();
  await Sessions.create({ sessionId, email, timestamp: Date.now() });
  return sessionId;
};

/**
 * Register a new user
 * @param {*} req
 * @param {*} res
 * @return {Object} - JSON response with registration status
 *
 * Creates a new user in the User database with the provided details. If the email already exists, returns an error (status code 400). Else, store the new user in the user database and also create a new session in the session database.
 */
export const register = async (req, res) => {
  try {
    const { name, email, password, type, farmerInfo = {}, corporateInfo = {} } =
      req.body || {};

    if (!name || !email || !password || !type) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const existing = await Users.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: "Email already registered" });
    }

    console.log("User type:", type);

    const newUser = await Users.create({
      name,
      email,
      password,
      type,
      farmerInfo,
      corporateInfo,
    });

    const sessionId = await createSession(newUser.email);

    return res.status(200).json({
      success: true,
      message: "Registration successful",
      sessionId,
      type: newUser.type,
    });
  } catch (error) {
    console.error("Register error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Registration failed" });
  }
};

/**
 * Login a user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {Object} - JSON response with login status
 *
 * checks user credentials as in the User database. If valid, creates a session in the session database. Else, returns error (status code 401).
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password required" });
    }

    const user = await Users.findOne({ email: email.toLowerCase().trim() });
    if (!user || user.password !== password) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const sessionId = await createSession(user.email);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      sessionId,
      type: user.type,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Login failed" });
  }
};


/**
 * Check if a session is valid
 * @param {*} data - body of a request containing sessionId and email 
 * @return {boolean} - true if session is valid, false otherwise
 *
 * Verifies if the provided sessionId and email correspond to a valid session in the Sessions database. A session is considered valid if it exists and has not expired (i.e., within the LOCK_TIME).
 */
export const checkSession = async (data) => {
  try {
    const { sessionId, email } = data;
    const session = await Sessions.findOne({ sessionId, email });
    if (!session) {
      return false;
    }
    const now = Date.now();
    if (now - session.timestamp > LOCK_TIME) {
      await Sessions.deleteOne({ sessionId });
      return false;
    }
    return true;
  } catch (error) {
    console.error("Session check error:", error);
    return false;
  }
};


export const checkSessionEndpoint = async (req, res) => {
    try {
        const { sessionId, email } = req.body || {};
        const isValid = await checkSession({ sessionId, email });
        if (!isValid) {
            return res.status(401).json({ message: "Invalid or expired session" });
        }
        res.status(200).json({ message: "Session is valid" });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};
