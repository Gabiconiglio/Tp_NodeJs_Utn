function registerController(req, res) {
    res.status(200).json({ success: true, message: "User registered successfully" });
}

function loginController(req, res) {
    res.status(200).json({ success: true, message: "User logged in successfully" });
}

module.exports = { registerController, loginController };