"use client";
import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useGetLoggedInUser } from "@/utils/auth.api";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DonutChart = () => {
  const { data: userInfo } = useGetLoggedInUser();
  const [data, setData] = useState<any>([]);

  const options = {
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    labels: [
      "Available Balance",
      "Total Earnings",
      "Pending Amount",
      "Referral Earnings",
    ],
    dataLabels: {
      enabled: false,
    },
    value: {
      show: false,
    },
    colors: ["#87E9FF", "#FFA36B", "#FFE0BB", "#05A4A6"],
  };

  const pushData = (data: any) => {
    const tempArray = [];
    tempArray.push(data.availableBalance);
    tempArray.push(data.totalEarnings);
    tempArray.push(data.pendingBalance);
    tempArray.push(data.referralEarning);
    setData(tempArray);
  };

  useEffect(() => {
    pushData(userInfo);
  }, [userInfo]);

  return (
    <Box mx="auto">
      {data.length > 0 && (
        <ApexChart
          options={options}
          series={data}
          type="donut"
          width="190px"
          height={150}
        />
      )}
    </Box>
  );
};

export default DonutChart;
