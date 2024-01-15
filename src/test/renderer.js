const canvas = document.getElementById('oscilloscope');
const ctx = canvas.getContext('2d');
const highTimeSlider = document.getElementById('highTimeSlider');

let waveform = [];
let currentHighTime = parseInt(highTimeSlider.value);

// Generate a square wave with a specified high time
function generateSquareWave(highTime, amplitude, sampleRate) {
    const totalPeriods = 5;  // Total number of periods for the waveform
    const lowTime = totalPeriods - highTime;
    const samplesPerPeriod = Math.floor(sampleRate / totalPeriods);

    waveform = [];
    for (let i = 0; i < totalPeriods * samplesPerPeriod; i++) {
        const isHigh = i % samplesPerPeriod < highTime * samplesPerPeriod / totalPeriods;
        waveform.push(isHigh ? amplitude : 0);
    }
}

function drawOscilloscope() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let i = 0; i < waveform.length; i++) {
        const y = (waveform[i] / 255.0) * canvas.height;
        const x = (i / waveform.length) * canvas.width;

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }

    ctx.stroke();
}

// Update the waveform and redraw when the slider changes
highTimeSlider.addEventListener('input', function () {
    currentHighTime = parseInt(highTimeSlider.value);
    generateSquareWave(currentHighTime, 255, 1000);
    drawOscilloscope();
});

// Initial draw
generateSquareWave(currentHighTime, 255, 1000);
drawOscilloscope();

function drawDiodeGraph() {
    var ctx = document.getElementById('diodeGraph').getContext('2d');

    var diodeGraph = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Vmin', 'Forward Bias', 'Reverse Bias', 'Vmax'],
            datasets: [{
                label: 'Diode Characteristics',
                data: [0, 0, 0, 0], // Add your data points here
                borderColor: 'blue',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'category',
                    labels: ['Vmin', 'Forward Bias', 'Reverse Bias', 'Vmax']
                },
                y: {
                    beginAtZero: true
                }
            },
            annotation: {
                annotations: [{
                    type: 'line',
                    mode: 'horizontal',
                    scaleID: 'y',
                    value: 0,
                    borderColor: 'red',
                    borderWidth: 2,
                    label: {
                        content: 'Zero Current'
                    }
                }, {
                    type: 'line',
                    mode: 'vertical',
                    scaleID: 'x',
                    value: 2,
                    borderColor: 'green',
                    borderWidth: 2,
                    label: {
                        content: 'Forward Bias'
                    }
                }, {
                    type: 'line',
                    mode: 'vertical',
                    scaleID: 'x',
                    value: 3,
                    borderColor: 'orange',
                    borderWidth: 2,
                    label: {
                        content: 'Reverse Bias'
                    }
                }]
            }
        }
    });
}
