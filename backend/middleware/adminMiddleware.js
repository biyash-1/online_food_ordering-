
import jwt from "jsonwebtoken"
export const authenticateAdmin = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) throw new Error("No token provided");

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);

        if (decoded.role !== "admin") {
            return res.status(403).json({ msg: "Access denied" });
        }

        req.user = decoded; // Attach user to request
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ msg: error.message || "Unauthorized" });
    }
};
