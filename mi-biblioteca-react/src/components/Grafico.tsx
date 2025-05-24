import React from "react";

export interface GraficoProps {
  texto?: string;
}

const Grafico: React.FC<GraficoProps> = ({ texto = "Este es un componente gráfico" }) => {
  return <div>{texto}</div>;
};

export default Grafico;
