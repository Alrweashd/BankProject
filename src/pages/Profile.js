import React, { useContext, useState } from "react";
import {
  login,
  me,
  balance,
  transactions,
  deposit,
  withdrawal,
} from "../api/auth";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const Profile = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);

  //get profile
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => me(),
  });

  const { mutate: meFun } = useMutation({
    mutationFn: () => login(),
    onSuccess: () => queryClient.invalidateQueries(["profile"]),
  });

  //get balance data
  let { data: balanceData } = useQuery({
    queryKey: ["balance"],
    queryFn: () => balance(),
  });

  //do u
  const { mutate: balanceFun } = useMutation({
    mutationFn: () => login(),
    onSuccess: () => queryClient.invalidateQueries(["balance"]),
  });

  const [amountWit, setAmountWit] = useState(0);
  const handleWit = (event) => {
    event.preventDefault();
    const amountWit = event.target.amountWit.value;
    setAmountWit(amountWit);
  };

  const { mutate: withdrawalFun } = useMutation({
    mutationFn: () => {
      return withdrawal(amountWit);
    },
    onSuccess: () => queryClient.invalidateQueries(["balance"]),
  });
  // const { data: transactionsData } = useQuery({
  //   queryKey: ["transactions"],
  //   queryFn: () => transactions(),
  // });

  // const { mutate: transactionsFun } = useMutation({
  //   mutationFn: () => login(),
  //   onSuccess: () => queryClient.invalidateQueries(["transactions"]),
  // });

  // let { data: depositData } = useQuery({
  //   queryKey: ["deposit"],
  //   queryFn: () => deposit(),
  // });

  // const dData = useMutation({
  //   mutationFn: async () => {
  //     await deposit(1);
  //   },
  //   onSuccess: (data) => {
  //     console.log(dData);
  //     queryClient.invalidateQueries(["balance"]);
  //   },
  // });
  const [amount, setAmount] = useState(0);
  const handleAddFunds = (event) => {
    event.preventDefault();
    const amount = event.target.amount.value;
    setAmount(amount);
  };

  const { mutate: depositFun } = useMutation({
    mutationFn: () => {
      return deposit(amount);
    },
    onSuccess: () => {
      console.log("first");
      queryClient.invalidateQueries(["balance"]);
    },
  });

  // console.log(dData);
  // const depositFun = dData.mutate;
  // console.log("this is profile", profile);
  // console.log("this is transactions", transactionsData);
  // console.log("this is balance", balanceData);

  // console.log("this is balance", balanceData);
  // const { data: transactionsData } = useQuery({
  //   queryKey: ["transactions"],
  //   queryFn: () => transactions(),
  // });

  //   const profiles = profile.data?.map((item) => {
  //     <h1>{item}</h1>;
  //   });
  if (!user) return <Navigate to="/" />;
  if (!profile) return <div>not found!</div>;
  //   if (!balanceData) return <div>not found!</div>;
  // if (!transactionsData) return <div>not found!</div>;
  // const {
  //   account: accountTransc,
  //   createdAt,
  //   username: usernameTransc,
  // } = transactionsData;
  const { username, account, image } = profile;

  console.table(balanceData);
  return (
    <div className="flex flex-col justify-center text-center m-10">
      <h1 className="m-10 font-bold">{`Name: ${username}`}</h1>
      <h1>{`Account: ${account}`}</h1>
      <img
        className="place-self-center m-10 w-[280px] h-[280px]"
        src={`https://coded-projects-api.herokuapp.com${image}`}
        alt="img"
      />
      <button
        onClick={() => {
          balanceFun();
          navigate("/transactions");
        }}
        className="place-self-center h-20 w-[30vh] border-solid rounded bg-gray-800 text-white mb-5"
      >
        {`Balance: ${balanceData} KD`}
      </button>
      <form onSubmit={handleAddFunds} className="mb-4">
        <label htmlFor="amount">Amount:</label>
        <input
          className="bg-gray-300"
          type="number"
          id="amount"
          name="amount"
          required
        />
        <button
          type="submit"
          onClick={depositFun}
          disabled={depositFun.isLoading}
          className="w-[15vh] h-[3vh] border-solid rounded bg-green-800 mt-2 text-white"
        >
          Add Funds
        </button>
      </form>
      <form onSubmit={handleWit}>
        <label htmlFor="amount">Amount:</label>
        <input
          className="bg-gray-300"
          type="number"
          id="amount"
          name="amountWit"
          required
        />
        <button
          type="submit"
          onClick={withdrawalFun}
          disabled={withdrawalFun.isLoading}
          className="w-[15vh] h-[3vh] border-solid rounded bg-red-800 mt-2 text-white"
        >
          Withdrawal
        </button>
      </form>
      {/* <button onClick={withdrawalFun}>Reduce 1</button> */}
    </div>
  );
};

export default Profile;
