import { ApiError } from "../utills/ApiError.js";
import { ApiResponse } from "../utills/ApiResponse.js";
import geoip from "geoip-lite"; // for IP-based location
import useragent from "useragent"; // for device info
import { Transaction } from "../models/transaction.model.js";

export const fraudDetector = (req, res, next) => {
  const { amount } = req.body;

  let fraudScore = 0;

  // 🧠 Get client IP
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const geo = geoip.lookup(ip) || {};
  const currentLocation = `${geo.city}, ${geo.country}`;

  // 📱 Device Info
  const agent = useragent.parse(req.headers["user-agent"]);
  const isTrustedDevice = agent.os.family.includes("Windows") || agent.device.family.includes("Chrome");

  // 🔐 Custom logic (example only)
  if (amount > 50000) fraudScore += 0.4;
  if (currentLocation !== "New Delhi, IN") fraudScore += 0.3; // Replace with known location if available
  if (!isTrustedDevice) fraudScore += 0.2;

  const student = req.user; // assuming student is attached by JWT middleware

  if (student?.failedAttempts > 3) fraudScore += 0.1;

  if (fraudScore >= 0.7) {
    Transaction.isFraud = true;
    return next(
      new ApiError(
        403,
        "Transaction flagged as potential fraud",
        new ApiResponse(false, null, { fraudScore, ip, currentLocation, agent: agent.toString() })
      )
    );
  }

  next();
};
