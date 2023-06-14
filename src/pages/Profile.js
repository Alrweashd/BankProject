import React, { useContext, useState } from "react";
import { login, me, balance, transactions, deposit } from "../api/auth";

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
  const { mutate: depositFun } = useMutation({
    mutationFn: () => {
      return deposit(1);
    },
    onSuccess: () => {
      console.log("first");
      queryClient.invalidateQueries(["balance"]);
    },
  });

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
  // const handleAddFunds = (event) => {
  //   event.preventDefault();
  //   const amount = event.target.amount.value;
  //   // depositFun(amount);
  // };
  console.table(balanceData);
  return (
    <div className="flex flex-col justify-center text-center m-10">
      <button
        className="place-self-center border-solid rounded-full bg-blue-800 w-20 text-white"
        onClick={meFun}
      >
        Refresh
      </button>
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
        className="place-self-center h-20 w-[10vh] border-solid rounded bg-green-800 w-20 text-white"
      >
        {`Balance: ${balanceData}`}
      </button>
      {/* <button onClick={depositFun}>Add 1 to Balance</button> */}
      {/* <button onClick={transactionsFun}>Refresh transactions Button</button>
      <form onSubmit={handleAddFunds}>
        <label htmlFor="amount">Amount:</label>
        <input
          className="bg-gray-400"
          type="number"
          id="amount"
          name="amount"
          required
        />
        <button type="submit" disabled={depositFun.isLoading}>
          Add Funds
        </button>
      </form> */}
      <button onClick={depositFun}>Add 1</button>
      {/* <h1 className="m-2">{`transactionsData: ${transactionsData} `}</h1> */}
    </div>
  );
};

export default Profile;
