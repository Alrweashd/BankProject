import React, { useState } from "react";
import { login, me, balance, transactions } from "../api/auth";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Profile = () => {
  const queryClient = useQueryClient();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => me(),
  });

  const { mutate: meFun } = useMutation({
    mutationFn: () => login(),
    onSuccess: () => queryClient.invalidateQueries(["profile"]),
  });

  const { data: balanceData } = useQuery({
    queryKey: ["balance"],
    queryFn: () => balance(),
  });

  const { mutate: balanceFun } = useMutation({
    mutationFn: () => login(),
    onSuccess: () => queryClient.invalidateQueries(["transactions"]),
  });

  const { data: transactionsData } = useQuery({
    queryKey: ["profile"],
    queryFn: () => transactions(),
  });

  const { mutate: transactionsFun } = useMutation({
    mutationFn: () => login(),
    onSuccess: () => queryClient.invalidateQueries(["profile"]),
  });
  console.log("this is profile", profile);
  console.log("this is balance", balanceData);

  //   const profiles = profile.data?.map((item) => {
  //     <h1>{item}</h1>;
  //   });
  if (!profile) return <div>not found!</div>;
  //   if (!balanceData) return <div>not found!</div>;
  if (!transactionsData) return <div>not found!</div>;
  console.log("transactions", transactionsData);
  const { username, account, image } = profile;
  const {
    account: accountTransc,
    createdAt,
    username: usernameTransc,
  } = transactionsData;
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
        onClick={balanceFun}
        className="place-self-center h-20 w-[10vh] border-solid rounded bg-green-800 w-20 text-white"
      >
        {`Balance: ${balanceData}`}
      </button>
      <div className="border-gray-500 border-2 border-opacity-25 shadow m-10">
        <button onClick={transactionsFun}>Refresh transactions</button>
        <h1 className="m-2">{`account: ${accountTransc} `}</h1>
        <h1 className="m-2">{` Created At: ${createdAt} `}</h1>
        <h1 className="m-2"> {` Username: ${usernameTransc}`}</h1>
      </div>
    </div>
  );
};

export default Profile;
