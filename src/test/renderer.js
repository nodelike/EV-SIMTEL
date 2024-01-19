let chart1;
let chart1data = [];
let sliderVal;
let numPoints;

function generateSineWaveData(sliderVal) {
  const amplitude = Math.sin(sliderVal * Math.PI / 100);
  return Array.from({ length: numPoints }, (_, i) => {
      const xValue = i * (6 * Math.PI) / (numPoints - 1);
      
      const isOddCycle = Math.floor(xValue / Math.PI) % 2 === 0;

      const cutOffPercentage = Math.max(0, (sliderVal * 0.01));

      if (isOddCycle) {
          if (sliderVal < 50) {
              return amplitude * Math.sin(xValue);
          } else {
              console.log(cutOffPercentage);
              const positionInCycle = xValue % Math.PI;
              if (1 - (positionInCycle / Math.PI) > cutOffPercentage) {
                  return Math.sin(xValue);
              } else {
                  return 0;
              }
          }
      } else {
          return 0;
      }
  });
}

function updateChart(chartCanvas) {
  let chartColors = ['rgba(153, 102, 255, 1)', 'rgba(0, 123, 255, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 153, 0, 1)']
  const options = {
    plugins: {
      legend: {
          display: false
      },
      title: {
          display: true,
          text: 'Vg',
          color: 'black',
      }
  },
    animation: false,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        min: 0,
        max: 6 * Math.PI,
      },
      y: {
        type: 'linear',
        position: 'left',
        min: -1,
        max: 1,
      },
    },
    maintainAspectRatio: false,
    elements: {
      point:{
          radius: 0
      },
      line: {
          tension: 0.5
      }
    },
  }
  
  const chart1Ctx = chartCanvas.getContext('2d');
  chart1 = new Chart(chart1Ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: numPoints }, (_, i) => i * (6 * Math.PI) / (numPoints - 1)),
      datasets: [{
        data: chart1data,
        borderWidth: 2,
        borderColor: chartColors[0],
        fill: false,
      }]
    },
    options: options,
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const slider = document.getElementById('slider');
  const sliderValue = document.getElementById('sliderValue');
  const chartCanvas = document.getElementById('chart1');
  numPoints = chartCanvas.width;

  chart1data = generateSineWaveData(sliderVal);
  updateChart(chartCanvas);
  slider.addEventListener('input', () => {
    sliderVal = parseInt(slider.value);
    sliderValue.innerText = sliderVal;

    chart1data = generateSineWaveData(sliderVal);
    chart1.destroy();

    updateChart(chartCanvas);
  });
});
