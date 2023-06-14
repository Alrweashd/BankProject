import React from "react";

const ProfileCard = ({ username, account, image, balance }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-500  mb-2 to-blue-500 rounded-lg p-6 shadow-2xl w-[60vh] xl:w-[35vh] ">
      <div className="flex justify-between items-center mb-4">
        <p className="text-white">Cardholder Name</p>
        <p className="text-white font-bold">{username}</p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-white">Balance</p>
        <p className="text-white font-bold">{balance} KD</p>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-white">Expiration Date</p>
          <p className="text-white">12/24</p>
        </div>
        <div>
          <p className="text-white">CVV</p>
          <p className="text-white">***</p>
        </div>
      </div>
      <div className="flex justify-center items-center mt-6">
        <p className="text-gray-50 opacity-60 text-center">
          Account Number: <span className="text-white">{account}</span>
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
