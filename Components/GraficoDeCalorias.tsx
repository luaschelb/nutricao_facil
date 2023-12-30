import React from 'react';
import { View } from 'react-native';
import { PieChart, ProgressChart } from 'react-native-chart-kit';

type graficoProps = {
  quantidadeAtingida: number,
  meta: number
}

const GraficoDeCalorias = () => {
  let quantidadeAtingida = 1500
  let meta = 2000

  const data = [
    {
      name: 'Quantidade Atingida',
      calories: quantidadeAtingida,
      color: '#FF6347',
      legendFontColor: '#7F7F7F',
      legendFontSize: 6,
    },
    {
      name: 'Meta',
      calories: meta - quantidadeAtingida, // Calcula a diferença para completar a meta
      color: '#D3D3D3',
      legendFontColor: '#7F7F7F',
      legendFontSize: 6,
    },
  ];
  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#ffffff",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(26, 25, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  return (
      <ProgressChart
        data={{
          labels: ["Swim"], // optional
          data: [quantidadeAtingida/meta]
        }}
        width={100}
        height={100}
        strokeWidth={10}
        radius={40}
        chartConfig={chartConfig}
        hideLegend={true}
      />
  );
};

export default GraficoDeCalorias;