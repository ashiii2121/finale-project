// Create token and save in httpOnly cookie
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();

    // Cookie options
    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true, // Prevents XSS attacks
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
        sameSite: 'strict', // CSRF protection
    };

    // Remove password from output
    const userObject = user.toObject();
    delete userObject.password;

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user: userObject,
    });
};

export default sendTokenResponse;
