import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import Plotly from "plotly.js-dist-min";
import type { PlotData, Layout } from "plotly.js";

const CACHE_KEY = "grafico_recetas_por_categoria";
const CACHE_TTL_MS = 1000 * 60 * 10;

const Grafico: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerDatos = async () => {
      const cache = localStorage.getItem(CACHE_KEY);
      const ahora = Date.now();

      if (cache) {
        const {
          timestamp,
          nombresCategorias,
          recetasPorCategoria,
          coloresVerde,
        } = JSON.parse(cache);
        if (ahora - timestamp < CACHE_TTL_MS) {
          generarGrafico(nombresCategorias, recetasPorCategoria, coloresVerde);
          return;
        }
      }

      try {
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        const data = await res.json();
        const categorias = data.categories;

        const nombresCategorias: string[] = categorias.map(
          (c: any) => c.strCategory
        );
        const coloresVerde = generarColoresVerde(categorias.length);

        const promesas = categorias.map(async (categoria: any) => {
          try {
            const res = await fetch(
              `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria.strCategory}`
            );
            const data = await res.json();
            return data.meals ? data.meals.length : 0;
          } catch {
            console.error(
              `Error al obtener recetas para ${categoria.strCategory}`
            );
            return 0;
          }
        });

        const recetasPorCategoria: number[] = await Promise.all(promesas);

        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            timestamp: ahora,
            nombresCategorias,
            recetasPorCategoria,
            coloresVerde,
          })
        );

        generarGrafico(nombresCategorias, recetasPorCategoria, coloresVerde);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    const generarGrafico = (
      categorias: string[],
      recetas: number[],
      colores: string[]
    ) => {
      if (!chartRef.current) return;

      const trace: Partial<PlotData> = {
        y: categorias,
        x: recetas,
        type: "bar",
        text: recetas.map(String),
        textposition: "auto",
        hoverinfo: "skip",
        orientation: "h",
        marker: {
          color: colores,
          opacity: 0.8,
          line: {
            color: "rgb(0, 0, 0)",
            width: 2,
          },
        },
      };

      const layout: Partial<Layout> = {
        margin: { t: 40 },
        yaxis: { tickangle: 0 },
        barmode: "stack",
      };

      const config = {
        responsive: true,
        scrollZoom: true,
        displayModeBar: "hover",
      };

      Plotly.newPlot(chartRef.current, [trace], layout, config).then(() => {
        setCargando(false);
      });
    };

    const generarColoresVerde = (cantidad: number): string[] => {
      const colores: string[] = [];
      const base = [26, 86, 31];
      for (let i = 0; i < cantidad; i++) {
        const factor = 50 + i * 12;
        const verde = `rgb(${Math.min(base[0] + factor, 255)}, ${Math.min(
          base[1] + factor,
          255
        )}, ${Math.min(base[2] + factor, 255)})`;
        colores.push(verde);
      }
      return colores;
    };

    obtenerDatos();
  }, []);

  return (
    <Wrapper>
      <Title>Cantidad de recetas por categoría en The Meal DB</Title>
      <ChartArea>
        {cargando && (
          <Overlay>
            <Spinner />
            <LoadingText>Cargando gráfico...</LoadingText>
          </Overlay>
        )}
        <Graph ref={chartRef} $cargando={cargando} />
      </ChartArea>
    </Wrapper>
  );
};

export default Grafico;

const Wrapper = styled.section`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #1a561f;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const ChartArea = styled.div`
  position: relative;
  width: 100%;
  padding: 1rem;
  background-color: #fafafa;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  border-bottom: 2px solid #ddd;
  box-sizing: border-box;
  min-height: 300px;

  @media (min-width: 768px) {
    aspect-ratio: 16 / 9;
    max-height: 700px;
  }

  @media (max-width: 767px) {
    height: auto;
  }
`;

const Graph = styled.div<{ $cargando: boolean }>`
  width: 100%;
  height: 100%;
  opacity: ${({ $cargando }) => ($cargando ? 0 : 1)};
  transition: opacity 0.5s ease-in;
`;

const Overlay = styled.div`
  position: absolute;
  z-index: 10;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.85);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #ccc;
  border-top-color: #1a561f;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  margin-top: 12px;
  font-size: 1.1rem;
  font-weight: bold;
  color: #1a561f;
`;
