import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TopProduct {
  productId: string;
  name: string;
  quantity: number;
  amount: number;
}

interface TopProductsChartProps {
  products: TopProduct[];
}

const TopProductsChart: React.FC<TopProductsChartProps> = ({ products }) => {
  const chartData: ChartData<'bar'> = {
    labels: products.map(p => p.name.length > 15 ? `${p.name.substring(0, 15)}...` : p.name),
    datasets: [
      {
        label: 'Sales Amount',
        data: products.map(p => p.amount),
        backgroundColor: '#84A98C',
        borderColor: '#6d8b74',
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.parsed.y;
            return `$${value.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return `$${value}`;
          }
        }
      }
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-100 p-6">
      <h3 className="text-lg font-medium text-neutral-900 mb-4">Top Selling Products</h3>
      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default TopProductsChart;