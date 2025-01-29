import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import analyticsData from '../app/data/analyticsdata';

const AnalyticsChart = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-semibold text-slate-400">
            Sales Trend
          </CardTitle>
          <CardDescription>Sales per month</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Add height to the div to ensure the chart renders properly */}
          <div >
            <ResponsiveContainer width={400} height={200}>
              <LineChart data={analyticsData}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AnalyticsChart;
