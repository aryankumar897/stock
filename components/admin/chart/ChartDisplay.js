import { useEffect, useRef, useState } from "react";
// Import React hooks:
// - `useEffect`: Perform side effects such as data fetching or interacting with the DOM.
// - `useRef`: Create a mutable reference that persists across re-renders (used for chart instances).
// - `useState`: Manage state within the component.

import { Chart } from "chart.js/auto";
// Import Chart.js library with automatic registration of required chart types, controllers, and plugins.

const ChartDisplay = () => {
  const [data, setData] = useState(null);
  // `data` stores the fetched data from the API; initialized as `null`.
  // `setData` is the function to update the `data` state.

  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const lineChartRef = useRef(null);
  // Create references for chart instances. These will be used to manage chart instances (e.g., destroy or update them).

  useEffect(() => {
    // This useEffect runs once when the component mounts (due to the empty dependency array).

    const fetchData = async () => {
      // Define an asynchronous function to fetch data from the server.
      try {
        const response = await fetch(`${process.env.API}/admin`);
        // Send a GET request to the API endpoint defined in the environment variable `API`.
        const result = await response.json();
        // Parse the JSON response from the API.
        setData(result);
        // Store the API response in the `data` state.
      } catch (error) {
        console.error("Error fetching data:", error);
        // Log an error message if the API call fails.
      }
    };

    fetchData();
    // Call the `fetchData` function to initiate the data fetch.
  }, []);
  // Dependency array is empty, so this effect will only run when the component is first rendered.

  useEffect(() => {
    // This useEffect runs every time the `data` state changes.

    if (data) {
      // If `data` exists (i.e., the API call was successful):

      // Destroy existing chart instances if they exist to avoid duplication when re-rendering.
      if (barChartRef.current) barChartRef.current.destroy();
      if (pieChartRef.current) pieChartRef.current.destroy();
      if (lineChartRef.current) lineChartRef.current.destroy();

      // Bar Chart
      const barCtx = document.getElementById("barChart").getContext("2d");
      // Get the 2D drawing context for the canvas with id "barChart".
      barChartRef.current = new Chart(barCtx, {
        // Create a new Bar chart and store its instance in `barChartRef.current`.
        type: "bar",
        // Specify the type of chart as "bar".
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
          // Define labels for the X-axis (categories being represented in the bar chart).
          datasets: [
            {
              label: "Counts",
              // Label for the dataset (this appears in the chart legend).
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
              // Data points for each category; dynamically fetched from the API response.
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
              // Define a unique background color for each bar.
            },
          ],
        },
      });

      // Pie Chart
      const pieCtx = document.getElementById("pieChart").getContext("2d");
      // Get the 2D drawing context for the canvas with id "pieChart".
      pieChartRef.current = new Chart(pieCtx, {
        // Create a new Pie chart and store its instance in `pieChartRef.current`.
        type: "pie",
        // Specify the type of chart as "pie".
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
          // Define labels for each section of the pie chart (categories).
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
              // Data values for each category in the pie chart.
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
              // Define unique colors for each section of the pie chart.
            },
          ],
        },
      });

      // Line Chart
      const lineCtx = document.getElementById("lineChart").getContext("2d");
      // Get the 2D drawing context for the canvas with id "lineChart".
      lineChartRef.current = new Chart(lineCtx, {
        // Create a new Line chart and store its instance in `lineChartRef.current`.
        type: "line",
        // Specify the type of chart as "line".
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
          // Define labels for the X-axis (categories being represented in the line chart).
          datasets: [
            {
              label: "Trend",
              // Label for the dataset (this appears in the chart legend).
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
              // Data points for the line chart; dynamically fetched from the API response.
              borderColor: "#FF6384",
              // Set the color of the line.
              backgroundColor: "rgba(255,99,132,0.2)",
              // Set the background color below the line (translucent fill).
              fill: true,
              // Enable fill below the line for visual emphasis.
            },
          ],
        },
      });
    }
  }, [data]);
  // Dependency array includes `data`, so this effect runs whenever `data` changes.

  return (
    <div style={{ padding: "20px" }}>
      {/* Add padding around the entire chart container */}
      <h2>Bar Chart</h2>
      {/* Heading for the bar chart */}
      <canvas id="barChart"></canvas>
      {/* Canvas element where the bar chart will be rendered */}
      <h2>Pie Chart</h2>
      {/* Heading for the pie chart */}
      <div style={{ height: "900px" }}>
        {/* Container with fixed height to ensure proper rendering of the pie chart */}
        <canvas id="pieChart"></canvas>
        {/* Canvas element where the pie chart will be rendered */}
      </div>
      <h2>Line Chart</h2>
      {/* Heading for the line chart */}
      <canvas id="lineChart"></canvas>
      {/* Canvas element where the line chart will be rendered */}
    </div>
  );
};

export default ChartDisplay;
// Export the component so it can be imported and used in other parts of the app.
