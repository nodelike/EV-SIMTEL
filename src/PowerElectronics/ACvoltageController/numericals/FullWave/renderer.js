
function updateAlphaPrime() {
  // Get the value of α in degrees from the input
  var alphaDegrees = parseFloat(document.getElementById("alphaInput").value);
  
  // Convert α from degrees to radians
  var alphaRadians = alphaDegrees * (Math.PI / 180);
  
  // Update the value of α' in radians
  document.getElementById("TonInput").value = alphaRadians.toFixed(4);
}

// Function to update α° when α' changes
function updateAlphaDegrees() {
  // Get the value of α' in radians from the input
  var alphaRadians = parseFloat(document.getElementById("TonInput").value);
  
  // Convert α' from radians to degrees
  var alphaDegrees = alphaRadians * (180 / Math.PI);
  
  // Update the value of α° in degrees
  document.getElementById("alphaInput").value = alphaDegrees.toFixed(4);
}

// Event listener for changes in α° input field
document.getElementById("alphaInput").addEventListener("input", updateAlphaPrime);

// Event listener for changes in α' input field
document.getElementById("TonInput").addEventListener("input", updateAlphaDegrees);

// Function to calculate Vs based on the provided formula
function calculateValues() {
  // Get input values and parse them as numbers
  const Vs = parseFloat(document.getElementById('EdcInput').value);
  const alphaDegrees = parseFloat(document.getElementById('alphaInput').value);
  const alphaRadians = alphaDegrees * (Math.PI / 180); // Convert α from degrees to radians
  const alphaPrime = parseFloat(document.getElementById('TonInput').value);

  // Calculate Vs based on the provided formula
  const Vo = Vs * Math.sqrt(1 /(Math.PI * ( Math.PI - alphaPrime + Math.sin(2 * alphaRadians) / 2)));

  const paragraph = document.createElement('p');
  paragraph.innerHTML = `<b>Calculated Vo: ${Vo.toFixed(4)}</b>`;

  // Append the new paragraph element to the output area
  document.getElementById("output").appendChild(paragraph);

  // Display the calculated value of Vs
  document.getElementById("output").innerHTML = `<p><b>Calculated Vo: ${Vo.toFixed(4)}</b></p>`;
  
}

// Function to reset input values and output
function resetValues() {
  // Reset input values
  document.getElementById('EdcInput').value = '';
  document.getElementById('alphaInput').value = '';
  document.getElementById('TonInput').value = '';
  document.getElementById('VsInput').value = '';

  // Clear output
  document.getElementById("output").innerHTML = '';
}

// Event listeners for Calculate and Reset buttons
document.querySelector('.viewcalculate').addEventListener('click', calculateValues);
document.querySelector('.viewcalculate').addEventListener('click', resetValues);

  
