import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function getDataFromToken(request: NextRequest) {
  try {
    // Extract token from cookies
    const token = request.cookies.get("token")?.value || "";

    // Check if token exists before proceeding
    if (!token) {
      throw new Error("No token found");
    }

    // Verify token
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

    // Return the user ID from the decoded token
    return decodedToken.id;
  } catch (error: any) {
    // Handle errors (e.g., invalid token, expired token)
    if (error.name === "JsonWebTokenError") {
      throw new Error("Invalid token");
    } else if (error.name === "TokenExpiredError") {
      throw new Error("Token has expired");
    } else {
      throw new Error(error.message || "An error occurred while verifying the token");
    }
  }
}
