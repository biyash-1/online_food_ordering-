import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, DoughnutController, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, DoughnutController, Tooltip, Legend);

interface TopProduct {
  title: string;
  count: number;
}

const DoughnutChart = () => {
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/order/top-products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        setTopProducts(data.topProducts || []);
      } catch (error) {
        console.error("Failed to fetch top products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopProducts();
  }, []);

  const chartData = {
    labels: topProducts.map((product) => product.title),
    datasets: [
      {
        data: topProducts.map((item) => item.count),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  return (
    <div className="relative p-2 rounded-lg shadow-sm ">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-300">Loading data...</p>
        </div>
      ) : topProducts.length === 0 ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-200">No data available</p>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-end gap-8"> {/* Updated alignment */}
          {/* Chart Container */}
          <div className="relative h-72 w-72"> {/* Fixed dimensions */}
            <Doughnut
              data={chartData}
              options={{
                cutout: "70%",
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                  legend: { display: false },
                  tooltip: { enabled: true },
                },
              }}
            />
          </div>

          {/* Custom Legend */}
          <div className="flex-1 pl-4 border-l-2 border-gray-100">
            <div className="flex flex-col gap-4">
              <h1>Top Products</h1>
              {topProducts.map((product, index) => (
                <div
                  key={product.title}
                  className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded"
                >
                  <div
                    className="w-4 h-4 rounded-sm flex-shrink-0"
                    style={{
                      backgroundColor: chartData.datasets[0].backgroundColor[index],
                    }}
                  />
                  <span className="text-sm font-medium text-gray-400">{product.title}</span>
                  <span className="ml-auto text-sm text-gray-500">({product.count})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoughnutChart;
