import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";

const ChartDisplay = () => {
  const [data, setData] = useState(null);

  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const lineChartRef = useRef(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.API}/admin`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      // Destroy existing charts to avoid duplication
      if (barChartRef.current) barChartRef.current.destroy();
      if (pieChartRef.current) pieChartRef.current.destroy();
      if (lineChartRef.current) lineChartRef.current.destroy();

      // Bar Chart
      const barCtx = document.getElementById("barChart").getContext("2d");
      barChartRef.current = new Chart(barCtx, {
        type: "bar",
        data: {
          labels: [
            "Category",
            "Customer",
            "Invoice",
            "Invoice Details",
            "Payment",
            "Product",
            "Supplier",
            "Unit",
          ],
          datasets: [
            {
              label: "Counts",
              data: [
                data.categorycount,
                data.customercount,
                data.invoicecount,
                data.invoicedetailscount,
                data.paymentcount,
                data.productcount,
                data.suppliercount,
                data.unitcount,
              ],
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
                "#C9CBCF",
                "#36A2EB",
              ],
            },
          ],
        },
      });

      // Pie Chart
      const pieCtx = document.getElementById("pieChart").getContext("2d");
      pieChartRef.current = new Chart(pieCtx, {
        type: "pie",
        data: {
          labels: [
            "Category",
            "Customer",
            "Invoice",
            "Invoice Details",
            "Payment",
            "Product",
            "Supplier",
            "Unit",
          ],
          datasets: [
            {
              data: [
                data.categorycount,
                data.customercount,
                data.invoicecount,
                data.invoicedetailscount,
                data.paymentcount,
                data.productcount,
                data.suppliercount,
                data.unitcount,
              ],
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
                "#C9CBCF",
                "#36A2EB",
              ],
            },
          ],
        },
      });

      // Line Chart
      const lineCtx = document.getElementById("lineChart").getContext("2d");
      lineChartRef.current = new Chart(lineCtx, {
        type: "line",
        data: {
          labels: [
            "Category",
            "Customer",
            "Invoice",
            "Invoice Details",
            "Payment",
            "Product",
            "Supplier",
            "Unit",
          ],
          datasets: [
            {
              label: "Trend",
              data: [
                data.categorycount,
                data.customercount,
                data.invoicecount,
                data.invoicedetailscount,
                data.paymentcount,
                data.productcount,
                data.suppliercount,
                data.unitcount,
              ],
              borderColor: "#FF6384",
              backgroundColor: "rgba(255,99,132,0.2)",
              fill: true,
            },
          ],
        },
      });
    }
  }, [data]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Bar Chart</h2>
      <canvas id="barChart"></canvas>
      <h2>Pie Chart</h2>
<div style={{height:"900px",}} >  
      <canvas id="pieChart"></canvas>
      </div>
      <h2>Line Chart</h2>
      <canvas id="lineChart"></canvas>
    </div>
  );
};

export default ChartDisplay;
