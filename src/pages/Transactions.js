import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { me, balance, transactions, login } from "../api/auth";

const Transactions = () => {
  const queryClient = useQueryClient();

  const [amountFilter, setAmountFilter] = useState("");
  const [dateFromFilter, setDateFromFilter] = useState("");
  const [dateToFilter, setDateToFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const { data: transactionsData, refetch } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => transactions(),
  });

  const handleFilter = () => {
    // Filter the transactions based on the provided filters (amount, date range, etc.)
    const filteredTransactions = transactionsData.filter((item) => {
      // Filter by amount (if amountFilter is not empty)
      if (amountFilter && item.amount !== Number(amountFilter)) {
        return false;
      }

      // Filter by date range (if both dateFromFilter and dateToFilter are not empty)
      if (dateFromFilter && dateToFilter) {
        const createdAt = new Date(item.createdAt);
        const fromDate = new Date(dateFromFilter);
        const toDate = new Date(dateToFilter);
        if (!(createdAt >= fromDate && createdAt <= toDate)) {
          return false;
        }
      }
      if (typeFilter && item.type !== typeFilter) {
        return false;
      }

      return true; // Include the transaction in the filtered result
    });

    // Update the data with filtered transactions

    queryClient.setQueryData(["transactions"], filteredTransactions);
  };

  const handleClearFilter = () => {
    // Clear filter values...
    setAmountFilter("");
    setDateFromFilter("");
    setDateToFilter("");

    // Refetch data to show all values
    refetch();
  };
  return (
    <>
      {/* //new Code */}
      <div className="flex justify-center mb-4 mt-4 items-center ">
        <label htmlFor="amount" className="mr-2 text-lg">
          Filter:
        </label>
        <div className="flex items-center sm:flex-col sm:mb-4 md:mb-0 md:flex-row">
          <input
            type="number"
            placeholder="Amount"
            value={amountFilter}
            onChange={(e) => setAmountFilter(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded h-10 mr-2 sm:mb-4 md:mb-0"
          />
          <label htmlFor="from" className="text-md mb-1 mr-2">
            From:
          </label>
          <input
            type="date"
            placeholder="From"
            value={dateFromFilter}
            onChange={(e) => setDateFromFilter(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded h-10 mr-2 sm:mb-2 md:mb-0"
          />
          <label htmlFor="to" className="text-md mb-1 mr-2">
            To:
          </label>
          <input
            type="date"
            placeholder="To"
            value={dateToFilter}
            onChange={(e) => setDateToFilter(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded h-10 mr-2"
          />
        </div>
        <div className="relative ">
          <label htmlFor="type" className="text-md mb-1 mr-2 ">
            Type:
          </label>
          <select
            id="type"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded w-24 h-10"
          >
            <option value="">All</option>
            <option value="transfer">Transfer</option>
            <option value="withdraw">Withdraw</option>
            <option value="deposit">Deposit</option>
          </select>
        </div>

        <button
          onClick={handleClearFilter}
          className="px-4 py-2 bg-red-500 text-white rounded h-10 ml-0 md:ml-2 "
        >
          Clear Filter
        </button>
      </div>
      <div className="flex justify-center mb-4 mt-4 ">
        <button
          onClick={handleFilter}
          className="px-8 py-2 bg-blue-500 text-white rounded mr-2 ml-2 "
        >
          Filter
        </button>
      </div>
      {/* // end of new code */}
      <h1 className="m-2">
        {/* {transactionsData &&
          transactionsData?.map((transaction) => (
            <h1 key={transaction.id}>{transaction.title}</h1>
          ))} */}
        {transactionsData && (
          <h1>
            <>
              <table className="min-w-full text-center bg-white border border-separate border-gray-300 rounded-lg shadow-md">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-r border-gray-300 ">
                      Type
                    </th>
                    <th className="py-2 px-4 border-r border-gray-300">
                      Amount
                    </th>
                    <th className="py-2 px-4 border-r border-gray-300">
                      Account
                    </th>
                    <th className="py-2 px-4 border-gray-300">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionsData.map((item) => (
                    <tr
                      className={`py-2 px-4 border-b border-r border-r-gray-300 ${
                        item.type == "withdraw" ? "bg-red" : "bg-green-200"
                      }`}
                    >
                      <td className="py-2 px-4 border-b border-r border-b-gray-300 border-r-gray-300">
                        {item.type}
                      </td>
                      <td className="py-2 px-4 border-b border-r border-b-gray-300 border-r-gray-300">
                        {item.amount}
                      </td>
                      <td className="py-2 px-4 border-b border-r border-b-gray-300 border-r-gray-300">
                        {item.account}
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-300">
                        {item.createdAt.replace(/T|Z/g, " ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          </h1>
        )}
      </h1>
    </>
  );
};

export default Transactions;
