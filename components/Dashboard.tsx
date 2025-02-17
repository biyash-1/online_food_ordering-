import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DoughnutChart from "./DoughnutChart";
import AnalyticsChart from "./AnalyticsChart";
import { FcMoneyTransfer } from "react-icons/fc";
import  {FcPackage} from "react-icons/fc"
import { FcClock } from "react-icons/fc";
const Dashboard = () => {
  const [totalOrders, setTotalOrders] = useState<number | null>(null);
  const [totalIncome, setTotalIncome] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total orders
        const ordersResponse = await fetch("http://localhost:3001/api/order/total_order", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!ordersResponse.ok) {
          throw new Error("Failed to fetch total orders");
        }

        const ordersData = await ordersResponse.json();
        setTotalOrders(ordersData.total_orders || 0);

        // Fetch total income
        const incomeResponse = await fetch("http://localhost:3001/api/order/total_income", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!incomeResponse.ok) {
          throw new Error("Failed to fetch total income");
        }

        const incomeData = await incomeResponse.json();
        setTotalIncome(incomeData.total_income || 0);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        setTotalOrders(0);
        setTotalIncome(0); // Handle errors gracefully
      }
    };

    fetchData();
  }, []); // Single useEffect for both API calls
 // Empty dependency array ensures it runs once on mount

  return (
    <div>
      <div className="forcards flex items-center gap-5">
      <Card className="text-center w-full dark:hover:bg-slate-900 hover:bg-slate-300 bg-green-100 dark:bg-slate-800">
          <CardHeader>
            <div className="flex item-center justify-center gap-2">
              <CardTitle className="font-semibold text-slate-400 text-xl">Total income</CardTitle>
              <FcMoneyTransfer className="text-xl mt-1" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${totalIncome}</p>
          </CardContent>
        </Card>

        <Card className="text-center w-full dark:hover:bg-slate-900 hover:bg-slate-300 bg-pink-100 dark:bg-slate-800">
          <CardHeader>
            <div className="flex item-center justify-center gap-2">
              <CardTitle className="font-semibold text-slate-400 text-xl">Orders</CardTitle>
              <FcPackage className="text-xl mt-1" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {totalOrders !== null ? totalOrders : "Loading..."}
            </p>
          </CardContent>
        </Card>

        <Card className="text-center w-full dark:hover:bg-slate-900 hover:bg-slate-300 bg-yellow-100 dark:bg-slate-800">
          <CardHeader>
            <div className="flex item-center justify-center gap-2">
              <CardTitle className="font-semibold text-slate-400 text-xl">Pending Orders</CardTitle>
              <FcClock className="text-xl mt-1" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">100</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex items-center justify-between gap-2 mt-9">

      <div className="slaelinechart p-4">
         <AnalyticsChart />
      </div>
      <div className="doughnut chart  border p-2 rounded-xl relative left-[150px] ">
        <DoughnutChart />
      </div>
      </div>

    </div>
  );
};

export default Dashboard;
