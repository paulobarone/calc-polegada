import { useState } from "react";
import "./App.css";

interface FormDataType {
  width: string;
  height: string;
  pixelPitch: string;
}

function App() {
  const [formData, setFormData] = useState<FormDataType>({
    width: "",
    height: "",
    pixelPitch: "",
  });
  const [result, setResult] = useState<number | null>(null);

  const getInchesFromResolution = () => {
    const width = Number(formData.width);
    const height = Number(formData.height);
    const pixelPitch = Number(formData.pixelPitch);

    if (
      typeof width !== "number" ||
      typeof height !== "number" ||
      typeof pixelPitch !== "number" ||
      isNaN(width) ||
      isNaN(height) ||
      isNaN(pixelPitch)
    ) {
      alert(
        "Por favor, preencha todos os campos com valores numéricos válidos.",
      );
      setFormData({ width: "", height: "", pixelPitch: "" });
      return;
    }

    const widthMM = width * pixelPitch;
    const heightMM = height * pixelPitch;
    console.log("Width in mm:", widthMM);
    console.log("Height in mm:", heightMM);

    const diagonalMM = Math.sqrt(Math.pow(widthMM, 2) + Math.pow(heightMM, 2));
    console.log("Diagonal in mm:", diagonalMM);

    const inches = diagonalMM / 25.4;
    setResult(inches);
  };

  return (
    <div className="container">
      <h1 className="title">Calculadora de polegadas</h1>
      <form
        className="calc-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="resolution-inputs-container">
          <label className="label" htmlFor="width">
            Resolução em Pixels
          </label>
          <div className="resolution-inputs">
            <input
              className="input"
              autoComplete="off"
              id="width"
              placeholder="Horizontal"
              type="text"
              pattern="^\d+$"
              title="Digite apenas números"
              value={formData.width}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  width: e.target.value.replace(/\D/g, ""),
                }));
              }}
            />
            <input
              className="input"
              autoComplete="off"
              placeholder="Vertical"
              type="text"
              pattern="^\d+$"
              title="Digite apenas números"
              value={formData.height}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  height: e.target.value.replace(/\D/g, ""),
                }));
              }}
            />
          </div>
        </div>
        <div className="resolution-inputs">
          <label className="label" htmlFor="pixel-pitch">
            Pixel Pitch
          </label>
          <input
            className="input"
            autoComplete="off"
            placeholder="Ex: 3.5"
            id="pixel-pitch"
            type="text"
            pattern="^\d+(\.\d+)?$"
            title="Digite um número válido (ex: 3.5, 3, 1.25)"
            value={formData.pixelPitch}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                pixelPitch: e.target.value.replace(/[^\d.]/g, ""),
              }));
            }}
          />
        </div>
        <button className="calc-button" onClick={getInchesFromResolution}>
          Calcular
        </button>
      </form>
      {result && (
        <div className="result-inch">
          <h2>Resultado em Polegadas: {result.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
