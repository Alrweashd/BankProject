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

  console.log(transactionsData);
  return (
    <>
      <h1 className="m-2">
        {/* {transactionsData &&
          transactionsData?.map((transaction) => (
            <h1 key={transaction.id}>{transaction.title}</h1>
          ))} */}
        {transactionsData && (
          <>
            <table className="min-w-full text-center bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Type</th>
                  <th className="py-2 px-4 border-b">Amount</th>
                  <th className="py-2 px-4 border-b">Account</th>
                </tr>
              </thead>
              <tbody>
                {transactionsData.map((item) => (
                  <tr>
                    <td className="py-2 px-4 border-b">{item.type}</td>
                    <td className="py-2 px-4 border-b">{item.amount}</td>
                    <td className="py-2 px-4 border-b">{item.account}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </h1>
    </>
  );
};

export default Transactions;
