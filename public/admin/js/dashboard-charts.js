document.addEventListener("DOMContentLoaded", () => {
  // Total Accounts Chart
  const totalAccountsCtx = document
    .getElementById("totalAccountsChart")
    .getContext("2d");
  new Chart(totalAccountsCtx, {
    type: "doughnut",
    data: {
      labels: ["Active", "Inactive"],
      datasets: [
        {
          label: "Total Accounts",
          data: [activeUsers, inactiveUsers], // Dynamic data from backend
          backgroundColor: [
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 99, 132, 0.2)",
          ],
          borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
    },
  });

  // Total Products Chart
  const totalProductsCtx = document
    .getElementById("totalProductsChart")
    .getContext("2d");
  new Chart(totalProductsCtx, {
    type: "bar",
    data: {
      labels: ["Products"],
      datasets: [
        {
          label: "Total Products",
          data: [totalProducts], // Dynamic data from backend
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  // System Usage Chart
  const systemUsageCtx = document
    .getElementById("systemUsageChart")
    .getContext("2d");
  new Chart(systemUsageCtx, {
    type: "doughnut",
    data: {
      labels: ["Used Memory", "Free Memory"],
      datasets: [
        {
          label: "Memory Usage",
          data: [
            usedMemory / (1024 * 1024 * 1024),
            freeMemory / (1024 * 1024 * 1024),
          ], // Convert bytes to GB
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
    },
  });

  const ctx = document.getElementById("productCategoryChart").getContext("2d");
  new Chart(ctx, {
    type: "bar", // You can change this to 'doughnut', 'pie', etc.
    data: {
      labels: labels,
      datasets: [
        {
          label: "Số lượng sản phẩm",
          data: counts,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Số lượng sản phẩm",
          },
        },
        x: {
          title: {
            display: true,
            text: "Danh mục sản phẩm",
          },
        },
      },
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Danh mục sản phẩm và số lượng của chúng",
        },
      },
    },
  });
});
