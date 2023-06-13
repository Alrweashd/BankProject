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
  return (
    <div>
      <div className="border-gray-500 border-2 border-opacity-25 shadow m-10">
        {/* <button onClick={transactionsFun}>Refresh transactions</button>
        <h1></h1>
        <h1 className="m-2">{`account: ${accountTransc} `}</h1>
        <h1 className="m-2">{` Created At: ${createdAt} `}</h1>
        <h1 className="m-2"> {` Username: ${usernameTransc}`}</h1> */}
      </div>
    </div>
  );
};

export default Transactions;
