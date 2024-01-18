function generateSineWaveData(sliderVal, numPoints, numCycles) {
    const amplitude = Math.sin(sliderVal * Math.PI / 100);
    return Array.from({ length: numPoints }, (_, i) => {
      const xValue = i * (numCycles * Math.PI) / (numPoints - 1);
      
      // Check if the current cycle is even or odd
      const isOddCycle = Math.floor(xValue / (Math.PI)) % 2 === 0;
      const isCuttingSin = Math.floor(xValue/ (Math.PI / 2)) % 2 === 0
    
      if(isOddCycle){
        if(sliderVal < 50){
            return amplitude * Math.sin(xValue);
        } else {
            if(isCuttingSin){
                return amplitude * Math.sin(xValue);
            } else {
                return 0;
            }
        }
      } else {
        return 0;
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('slider');
    const sliderValue = document.getElementById('sliderValue');
    const canvas = document.getElementById('vgGraphCanvas');
    const ctx = canvas.getContext('2d');
  
    // Decrease the size of the canvas
    canvas.width = 400;
    canvas.height = 200;
  
    // Initial slider value
    let sliderVal = parseInt(slider.value);
    sliderValue.innerText = sliderVal;
  
    // Update the chart with the Vg graph
    function updateChart() {
      sliderVal = parseInt(slider.value);
      sliderValue.innerText = sliderVal;
  
  
      const numCycles = 6;
      const numPoints = canvas.width;
      const data = {
        labels: Array.from({ length: numPoints }, (_, i) => i * (numCycles * Math.PI) / (numPoints - 1)),
        datasets: [{
          data: generateSineWaveData(sliderVal, numPoints, numCycles),
          borderWidth: 1,
          borderColor: 'blue',
          fill: false,
        }]
      };
  
      const options = {
        animation: false,
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            min: 0,
            max: numCycles * Math.PI,
          },
          y: {
            type: 'linear',
            position: 'left',
            min: -1,
            max: 1,
          },
        },
      };
  
      const config = {
        type: 'line',
        data: data,
        options: options
      };
  
      // Destroy the previous chart instance to avoid memory leaks
      if (window.myChart) {
        window.myChart.destroy();
      }
  
      // Create a new chart instance
      window.myChart = new Chart(ctx, config);
    }
  
    // Attach event listener to the slider
    slider.addEventListener('input', updateChart);
  
    // Initial chart creation
    updateChart();
  });
  