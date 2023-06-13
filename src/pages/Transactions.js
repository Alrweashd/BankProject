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
  // const { type } = transactionsData;
  const transactionsList = transactionsData?.map((transaction, index) => {
    <h1>{transaction.type}</h1>;
  });
  // console.log(type);
  return (
    <>
      <h1 className="m-2">
        {/* {transactionsData &&
          transactionsData?.map((transaction) => (
            <h1 key={transaction.id}>{transaction.title}</h1>
          ))} */}
        {transactionsData && (
          <h1>
            {transactionsData.map((item) => (
              <h1>{item.type}</h1>
            ))}
          </h1>
        )}
      </h1>
    </>
  );
};

export default Transactions;
