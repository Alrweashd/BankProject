import React, { useContext, useState } from "react";
import { login, me, balance, deposit, withdrawal } from "../api/auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import ProfileCard from "../component/ProfileCard";

const Profile = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);

  //For Tabs
  const [selectedTab, setSelectedTab] = useState("tab1");
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  // Get profile data
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => me(),
  });

  // Get balance data
  const { data: balanceData } = useQuery({
    queryKey: ["balance"],
    queryFn: () => balance(),
  });

  // Deposit funds

  const { mutate: depositFun, isLoading: depositLoading } = useMutation({
    mutationFn: () => deposit(amount),
    onSuccess: () => {
      queryClient.invalidateQueries(["balance"]);
      setAmount(0);
      document.getElementById("amount").value = "";
    },
  });

  // Withdraw funds
  const [amountWit, setAmountWit] = useState(0);
  const { mutate: withdrawalFun, isLoading: withdrawalLoading } = useMutation({
    mutationFn: () => withdrawal(amountWit),
    onSuccess: () => {
      queryClient.invalidateQueries(["balance"]);
      setAmountWit(0);
      document.getElementById("amountWit").value = "";
    },
  });
  const [amount, setAmount] = useState(0);
  const handleBalanceSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target.amount.value);
  };

  if (!user) return <Navigate to="/" />;
  if (!profile) return <div>not found!</div>;

  const { username, account, image } = profile;

  return (
    <div className="flex flex-col justify-center items-center  bg-gradient-to-r from-blue-300 to-indigo-400 min-h-screen">
      {/* <div
        onClick={() => {
          navigate("/transactions");
        }}
      > */}
      <ProfileCard
        username={username}
        account={account}
        image={image}
        balance={balanceData}
      />
      {/* </div> */}
      <button
        onClick={() => {
          navigate("/transactions");
        }}
        className="h-20 w-80 mt-4 mb-2 bg-gray-800 text-white rounded-full mt-5 flex items-center justify-center hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
      >
        {`Balance: ${balanceData} KD `}
      </button>

      {/* Tabs Starts */}

      <div className="flex flex-col bg-gradient-to-br from-gray-50 to-indigo-200 rounded-md p-4 shadow-xl mt-4">
        <div className="flex flex-col ">
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handleTabClick("tab1")}
              className={`px-4 py-2 mr-2 rounded ${
                selectedTab === "tab1"
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              Deposit
            </button>
            <button
              onClick={() => handleTabClick("tab2")}
              className={`px-4 py-2 rounded ${
                selectedTab === "tab2"
                  ? "bg-red-500 hover:bg-red-600  text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              Withdraw
            </button>
          </div>
          <div>
            {selectedTab === "tab1" && (
              <form onSubmit={handleBalanceSubmit} className="mt-8">
                <label htmlFor="amount" className="mr-2">
                  Amount:
                </label>
                <input
                  className="bg-gray-100  px-2 py-1 rounded"
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="amount"
                  required
                  onChange={(e) => setAmount(e.target.value)}
                />
                <button
                  type="submit"
                  onClick={depositFun}
                  disabled={depositLoading}
                  className="w-40 h-9  bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out ml-4"
                >
                  {depositLoading ? "Adding Funds..." : "Add Funds"}
                </button>
              </form>
            )}
            {selectedTab === "tab2" && (
              <form onSubmit={handleBalanceSubmit} className="mt-8">
                <label htmlFor="amount" className="mr-2">
                  Amount:
                </label>
                <input
                  className="bg-gray-100 px-2 py-1 rounded"
                  placeholder="amount"
                  type="number"
                  id="amountWit"
                  name="amountWit"
                  required
                  onChange={(e) => setAmountWit(e.target.value)}
                />

                <button
                  type="submit"
                  onClick={withdrawalFun}
                  disabled={withdrawalLoading}
                  className="w-40 h-9  bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out ml-4"
                >
                  {withdrawalLoading ? "Withdrawing..." : "Witdrawal"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Tab Ends */}

      {/* <label htmlFor="amount" className="mr-2">
          Amount:
        </label>
        <input
          className="bg-gray-100 px-2 py-1 rounded"
          type="number"
          id="amount"
          name="amount"
          required
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          type="submit"
          onClick={depositFun}
          disabled={depositLoading}
          className="w-40 h-9  bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out ml-4"
        >
          {depositLoading ? "Adding Funds..." : "Add Funds"}
        </button> */}

      {/* <form onSubmit={handleBalanceSubmit} className="mt-4 mb-24">
        <label htmlFor="amount" className="mr-2">
          Amount:
        </label>
        <input
          className="bg-gray-100 px-2 py-1 rounded"
          type="number"
          id="amountWit"
          name="amountWit"
          required
          onChange={(e) => setAmountWit(e.target.value)}
        />

        <button
          type="submit"
          onClick={withdrawalFun}
          disabled={withdrawalLoading}
          className="w-40 h-9  bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out ml-4"
        >
          {withdrawalLoading ? "Withdrawing..." : "witdrawal"}
        </button>
      </form> */}
    </div>
  );
};

export default Profile;
