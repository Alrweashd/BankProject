import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { me, balance, transactions, login } from "../api/auth";

const Transactions = () => {
  const queryClient = useQueryClient();

  //   const {
  //     account: accountTransc,
  //     createdAt,
  //     username: usernameTransc,
  //   } = transactionsData;
  //   console.log(transactionsData);
  //   if (!transactionsData) return <div>not found!</div>;

  const { data: transactionsData } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => transactions(),
  });

  const transactionsList = transactionsData.map((transaction, index) => {
    <h1>{transaction[0]}</h1>;
  });

  return (
    <>
      <h1 className="m-2">{`transactionsData: ${transactionsList} `}</h1>
    </>
  );
};

export default Transactions;
