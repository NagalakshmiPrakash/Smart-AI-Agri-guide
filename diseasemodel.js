// Simple mock ML logic
function predictDisease() {
  const diseases = ["Leaf Spot", "Blight", "Healthy"];
  return diseases[Math.floor(Math.random() * diseases.length)];
}

module.exports = { predictDisease };