let votesAP = parseInt(localStorage.getItem("AP_value")) || 0;
let votesH = parseInt(localStorage.getItem("H_value")) || 0;
let votesSP = parseInt(localStorage.getItem("SP_value")) || 0;
let votesFRP = parseInt(localStorage.getItem("FRP_value")) || 0;
let votesMDG = parseInt(localStorage.getItem("MDG_value")) || 0;

//local storage får informasjon som at det holder det
function loadpage() {
    const labels = ["AP", "H", "SP", "FRP", "MDG"];
    labels.forEach((label) => {
        const val = document.getElementById(`countLabel${label}`);
        if (!val) {
            console.error(`Element with id "countLabel${label}" not found`);
            return;
        }
        window[`votes${label}`] = parseInt(localStorage.getItem(`${label}_value`)) || 0;
        val.innerText = window[`votes${label}`];
    });
}

["AP", "H", "SP", "FRP", "MDG"].forEach((party) => {
    document.getElementById(`${party}_Btn`).onclick = function () {
        window[`votes${party}`] += 1;
        localStorage.setItem(`${party}_value`, window[`votes${party}`]);
        loadpage();
    };
});

document.getElementById("resetButton").onclick = function () {
    ["AP", "H", "SP", "FRP", "MDG"].forEach((party) => {
        window[`votes${party}`] = 0;
        localStorage.setItem(`${party}_value`, 0);
    });
    loadpage();
};

let chartInstance = null; // Declare a variable to hold the chart instance

// Initialize the chart
const ctx = document.getElementById('myChart');
chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['AP', 'H', 'SP', 'FRP', 'MDG'],
        datasets: [{
            backgroundColor: [
                'rgba(255, 132, 150, 0.5)',
                'rgba(230, 10, 132, 0.5)',
                'rgba(80, 50, 0, 0.5)',
                'rgba(50, 1, 100, 0.5)',
                'rgba(255, 99, 20, 0.5)'
            ],
            label: '# of Votes',
            data: [votesAP, votesH, votesSP, votesFRP, votesMDG],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Update the chart data when a vote is cast
["AP", "H", "SP", "FRP", "MDG"].forEach((party) => {
    document.getElementById(`${party}_Btn`).onclick = function () {
        window[`votes${party}`] += 1;
        localStorage.setItem(`${party}_value`, window[`votes${party}`]);
        loadpage();

        // Update the chart data
        chartInstance.data.datasets[0].data = [votesAP, votesH, votesSP, votesFRP, votesMDG];
        chartInstance.update();
    };
});

// Update the chart data when the reset button is clicked
document.getElementById("resetButton").onclick = function () {
    ["AP", "H", "SP", "FRP", "MDG"].forEach((party) => {
        window[`votes${party}`] = 0;
        localStorage.setItem(`${party}_value`, 0);
    });
    loadpage();

    // Reset the chart data
    chartInstance.data.datasets[0].data = [0, 0, 0, 0, 0];
    chartInstance.update();
};

loadpage()



function redirect() {
    location.href = "stemme.html"
}