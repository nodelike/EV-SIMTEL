const canvas = document.getElementById('oscilloscope');
const ctx = canvas.getContext('2d');
const highTimeSlider = document.getElementById('highTimeSlider');

let waveform = [];
let currentHighTime = parseInt(highTimeSlider.value);

// Generate a square wave with a specified high time
function generateSquareWave(highTime, amplitude, sampleRate) {
    const totalPeriods = 5;  // Total number of periods for the waveform
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
