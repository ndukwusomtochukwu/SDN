import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

function generatePassword(length, includeNumbers, includeSpecialCharacters) {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";
  let characterSet = lowercaseChars + uppercaseChars;

  if (includeNumbers) characterSet += numbers;
  if (includeSpecialCharacters) characterSet += specialChars;

  let generatedPassword = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterSet.length);
    generatedPassword += characterSet[randomIndex];
  }

  return generatedPassword;
}

const PasswordGenerator = () => {
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialCharacters, setIncludeSpecialCharacters] =
    useState(false);
  const [password, setPassword] = useState("");

  const handleGeneratePassword = () => {
    const newPassword = generatePassword(
      length,
      includeNumbers,
      includeSpecialCharacters
    );
    setPassword(newPassword);
  };

  return (
    <div className="bg-[url('/images/sdn.png')]">
      <Header />
      <div className="p-4 w-full flex items-center justify-center bg-slate-800 min-h-[90svh]">
        <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg text-white text-center">
          <h2 className="text-2xl font-semibold mb-4">Password Generator</h2>

          <div className="mb-4">
            <label className="block text-left mb-1">Password Length:</label>
            <input
              type="number"
              min="6"
              max="32"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="text-indigo-600 focus:ring-indigo-500 rounded"
              />
              <span>Include Numbers</span>
            </label>
          </div>

          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={includeSpecialCharacters}
                onChange={(e) => setIncludeSpecialCharacters(e.target.checked)}
                className="text-indigo-600 focus:ring-indigo-500 rounded"
              />
              <span>Include Special Characters</span>
            </label>
          </div>

          <button
            onClick={handleGeneratePassword}
            className="w-full py-2 px-4 bg-indigo-600 rounded-md text-white font-semibold hover:bg-indigo-700 focus:outline-none"
          >
            Generate Password
          </button>

          <div className="mt-6">
            <strong>Generated Password:</strong>
            <p className="mt-2 p-2 bg-gray-700 rounded-md text-indigo-400 break-all">
              {password}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PasswordGenerator;
