# 📊 grafico-mdb

Componente React reutilizable que muestra un gráfico de barras horizontal con la cantidad de recetas por categoría, consultadas desde [TheMealDB](https://www.themealdb.com/api.php). Utiliza **Plotly.js** para la visualización y aplica técnicas de **caching local** para optimizar el rendimiento.

---

## 🚀 Instalación

```bash
npm install grafico-mdb
🧩 Uso básico
tsx
Copiar
Editar
import Grafico from 'grafico-mdb';

function App() {
  return <Grafico />;
}
El componente se monta automáticamente, consulta los datos desde la API, aplica cacheo y muestra el gráfico sin necesidad de props ni configuración adicional.

🧠 Funcionalidades
Visualización clara y responsive de datos por categoría

Colores dinámicos personalizados para cada barra

Animación de carga mientras se renderiza el gráfico

Caching inteligente con localStorage (válido por 10 minutos)

Gráfico sin herramientas interactivas de Plotly (modo limpio)

🔒 Caching local
Este componente implementa un sistema de caché en localStorage para reducir el número de llamadas a la API:

🔁 Si ya existen datos y tienen menos de 10 minutos de antigüedad, se reutilizan.

🌐 Si no hay caché válido, se consulta la API y se actualiza el almacenamiento local automáticamente.

🆕 Actualización
Para asegurarse de tener la última versión instalada en su proyecto:

bash
Copiar
Editar
npm install grafico-mdb@latest
📦 Requisitos
Este componente depende de:

react v18 o superior

react-dom

plotly.js-dist-min

styled-components

Estas dependencias se declaran como peerDependencies.

📚 Documentación en Storybook
El componente cuenta con documentación interactiva en Storybook para su visualización y prueba en aislamiento.

Puede desplegarse públicamente usando GitHub Pages, Vercel o Chromatic.

👨‍💻 Autores
Sebastián Navarro

Fabián Guzmán

Amanda Chaves

