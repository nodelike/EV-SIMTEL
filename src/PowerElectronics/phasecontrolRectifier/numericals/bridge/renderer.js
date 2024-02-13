// Function to calculate Vs based on the provided formula
function calculateValues() {
  // Get input values and parse them as numbers
  const Em = parseFloat(document.getElementById('EmInput').value);
  const alphaDegrees = parseFloat(document.getElementById('alphaInput').value);

  const alphaRadians = alphaDegrees * (Math.PI / 180);


  // Calculate Vs based on the provided formula 
  const Edc = (2 * Em * Math.cos(alphaRadians)) / Math.PI;

  // Display the calculated value of Vs

  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = `
    <p><b>Edc: ${Edc.toFixed(4)}</b></p>
    `;
  
}

// Function to reset input values and output
function resetValues() {
  // Reset input values
  document.getElementById('EmInput').value = '';
  document.getElementById('alphaInput').value = '';

  // Disable previous output
  document.getElementById("output").innerHTML = '';

  // Disable all input fields
  const inputs = document.querySelectorAll('input[type="number"]');
  inputs.forEach(input => input.disabled = false);
}