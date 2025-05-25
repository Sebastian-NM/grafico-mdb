# 📊 react-chart

**`grafico-mdb-grupo03`** es una biblioteca de componentes reutilizables para React que permite representar la cantidad de recetas de cada categoria registrada en The meal DB mediante un gráfico de barras horizontales, utilizando Plotly.js como motor de visualización.

Ideal para dashboards, reportes analíticos y paneles de administración.

---

## 🚀 Instalación

Instale el componente ejecutando el siguiente comando en su proyecto React:

```bash
npm install grafico-mdb-grupo03
```
---

## 🧩 Uso básico

```tsx
import React from "react";
import { Grafico } from "grafico-mdb-grupo03";

function App() {
  return (
    <div>
      <h1>Ejemplo usando el componente</h1>
      <Grafico />
    </div>
  );
}

export default App;
```