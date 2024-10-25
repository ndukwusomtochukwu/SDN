import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";

const getPasswordStrength = (password) => {
  let strengthScore = 0;

  if (password.length >= 8) strengthScore += 1;
  if (/[A-Z]/.test(password)) strengthScore += 1;
  if (/[0-9]/.test(password)) strengthScore += 1;
  if (/[^A-Za-z0-9]/.test(password)) strengthScore += 1;

  if (strengthScore === 0) return { label: "Weak", color: "bg-red-500" };
  if (strengthScore === 1) return { label: "Weak", color: "bg-red-500" };
  if (strengthScore === 2) return { label: "Good", color: "bg-yellow-500" };
  if (strengthScore === 3) return { label: "Strong", color: "bg-green-500" };
  return { label: "Powerful", color: "bg-blue-500" };
};

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState({ label: "", color: "" });

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setStrength(getPasswordStrength(newPassword));
  };

  return (
    <div className="bg-[url('/images/sdn.png')]">
      <Header />
      <div className="p-4 w-full flex items-center justify-center bg-slate-800 min-h-[90svh]">
        <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg text-white text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Password Strength Checker
          </h2>

          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-indigo-500"
          />

          <div className="mt-4">
            <div className={`w-full p-2 rounded ${strength.color}`}>
              <span className="font-semibold">
                {strength.label || "Enter a password to check its strength"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PasswordStrengthChecker;
