// middleware/roles.js
export function requireAdminOrStatusOnly(req, res, next) {
  const role = (req.user?.role || req.user?.roles?.[0] || "")
    .toString()
    .toUpperCase();

  // Admins: full access
  if (role === "ADMIN" || req.user?.isAdmin === true) return next();

  // Non-admin: only allow "status" field
  const keys = Object.keys(req.body || {});
  if (keys.length === 0) {
    return res.status(400).json({ message: "No fields supplied." });
  }
  const onlyStatus = keys.every((k) => k === "status");
  if (!onlyStatus) {
    return res
      .status(403)
      .json({ message: "Only 'status' can be updated by non-admin users." });
  }

  // Normalize common variants
  if (typeof req.body.status === "string") {
    const s = req.body.status.trim().toUpperCase();
    req.body.status = s === "INPROGRESS" ? "IN_PROGRESS" : s === "COMPLETED" ? "DONE" : s;
  }

  next();
}
