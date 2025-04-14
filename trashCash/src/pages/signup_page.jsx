import React, { useState } from "react";
// import Footer from "../components/footer/footer";
// import Header2_0 from "../components/header/header2_0";
import signupanimation from "../assets/sign-up-animation.svg";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  return (
    <div className={`bg-slate-50 font-sans`}>
      {/* <Header2_0 /> */}
      <MainSection />
      {/* <Footer /> */}
    </div>
  );
}

const MainSection = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate=useNavigate();


  // Function to handle sending OTP
  const handleGetOtp = async () => {
    setMessage(""); // Clear previous messages
    if (!email) {
      setMessage("Please enter your email address.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
          
      if (response.ok) {
        setMessage("OTP sent successfully. Please check your email.");
        setIsOtpSent(true);
      } else {
        const data = await response.json();
        setMessage(data.message || "Failed to send OTP.");
      }
    } catch (error) {
      setMessage("An error occurred while sending the OTP. Please try again.");
    }
  };

  // Function to handle verifying OTP
  const handleSignUp = async () => {
    
    setMessage(""); // Clear previous messages
    if (!otp) {
      setMessage("Please enter the OTP.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      console.log(otp);

      if (response.ok) {
        setMessage("User verified successfully. You can now log in.");
        navigate("/home");


      } else {
        const data = await response.json();
        setMessage(data.message || "Invalid OTP or OTP expired.");
      }
    } catch (error) {
      setMessage("An error occurred during verification. Please try again.");
    }
  };

  return (
    <section className="bg-slate-100">
      <div className="flex min-h-screen items-center justify-center px-6">
        {/* Left Section */}
        <div className="h-65 w-[400px] flex justify-center items-center">
          <img src={signupanimation} alt="Signup Animation" />
        </div>
        {/* Right Section */}
        <div className="ml-56">
          <div className="w-96 bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6">
              Get Your OTP to Start Earning from Your Scrap!
            </h1>
            <form id="signUpForm" className="space-y-4">
              {/* Email Input */}
              <div className="relative">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email ID
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block shadow-2xl focus:shadow-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-main focus:border-main"
                  placeholder="xyz@xyz.com"
                  required
                />
              </div>

              {/* Get OTP Button */}
              {!isOtpSent && (
                <div>
                  <button
                    type="button"
                    id="loginButton"
                    onClick={handleGetOtp}
                    className="w-full border shadow-2xl hover:shadow-black bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-main hover:text-[#E9EFEC] hover:font-bold"
                  >
                    Get OTP
                  </button>
                </div>
              )}

              {/* OTP Input */}
              {isOtpSent && (
                <div className="relative">
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium text-gray-700"
                  >
                    OTP
                  </label>
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="mt-1 block shadow-2xl focus:shadow-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-main focus:border-main"
                    placeholder="Enter the OTP"
                    required
                  />
                </div>
              )}

              {/* Sign Up Button */}
              {isOtpSent && (
                <div>
                  <button
                    type="button"
                    id="signUpButton"
                    onClick={handleSignUp}
                    className="w-full border shadow-2xl hover:shadow-black bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-main hover:text-[#E9EFEC] hover:font-bold"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </form>
            {message && (
              <p className="mt-4 text-center text-red-500">{message}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
