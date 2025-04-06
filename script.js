let model;
let imageElement = null;

async function loadModel() {
  model = await mobilenet.load();
  console.log("Modelo cargado correctamente");
}

window.onload = () => {
  loadModel();
};

function loadImage(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function () {
    const img = document.getElementById("preview");
    img.src = reader.result;
    imageElement = img;
  };
  reader.readAsDataURL(file);
}

async function predict() {
  if (!imageElement || !model) {
    alert("Sube una imagen y espera a que el modelo cargue.");
    return;
  }

  const predictions = await model.classify(imageElement);
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "<h3>Predicciones:</h3>";
  predictions.forEach(pred => {
    const percent = (pred.probability * 100).toFixed(2);
    resultDiv.innerHTML += `<p><strong>${pred.className}</strong>: ${percent}%</p>`;
  });
}
