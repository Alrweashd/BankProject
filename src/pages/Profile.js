import React, { useState } from "react";
import { login, me, balance, transactions } from "../api/auth";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => me(),
  });

  const { mutate: meFun } = useMutation({
    mutationFn: () => login(),
    onSuccess: () => queryClient.invalidateQueries(["profile"]),
  });

  let { data: balanceData } = useQuery({
    queryKey: ["balance"],
    queryFn: () => balance(),
  });

  const { mutate: balanceFun } = useMutation({
    mutationFn: () => login(),
    onSuccess: () => queryClient.invalidateQueries(["balance"]),
  });

  const { data: transactionsData } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => transactions(),
  });

  const { mutate: transactionsFun } = useMutation({
    mutationFn: () => login(),
    onSuccess: () => queryClient.invalidateQueries(["transactions"]),
  });

  const { mutate: depositFun } = useMutation({
    mutationFn: () => {
      balanceData += 1;
    },
    onSuccess: () => queryClient.invalidateQueries(["balance"]),
  });
  console.log("this is profile", profile);
  console.log("this is transactions", transactionsData);
  console.log("this is balance", balanceData);

  // console.log("this is balance", balanceData);
  // const { data: transactionsData } = useQuery({
  //   queryKey: ["transactions"],
  //   queryFn: () => transactions(),
  // });

  //   const profiles = profile.data?.map((item) => {
  //     <h1>{item}</h1>;
  //   });
  if (!profile) return <div>not found!</div>;
  //   if (!balanceData) return <div>not found!</div>;
  // if (!transactionsData) return <div>not found!</div>;
  // const {
  //   account: accountTransc,
  //   createdAt,
  //   username: usernameTransc,
  // } = transactionsData;
  const { username, account, image } = profile;

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
      <img className="place-self-center m-10" src={image} alt="img" />
      <button
        onClick={() => {
          balanceFun();
          navigate("/transactions");
        }}
        className="place-self-center h-20 w-[10vh] border-solid rounded bg-green-800 w-20 text-white"
      >
        {`Balance: ${balanceData}`}
      </button>
      <button onClick={depositFun}>Add 1</button>
      <button onClick={transactionsFun}>Refresh transactions</button>

      <h1 className="m-2">{`transactionsData: ${transactionsData} `}</h1>
    </div>
  );
};

export default Profile;
