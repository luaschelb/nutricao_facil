import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import PesoService from '../services/peso.service';
import { Peso } from '../models/Peso.model';

const GraficoDePeso = () => {
  const [dadosDePeso, setDadosDePeso] = useState([])
  const [labels, setlabelsDePeso] = useState([])
  const [valoresDePeso, setvaloresDePeso] = useState([])

  useEffect(() => {
    PesoService.findAll()
        .then((response: any) => {
          setDadosDePeso(response._array)
          //console.log(response._array)
        })
  })

  const funcao = () => {
    if(dadosDePeso.length)
    {
      return ( <LineChart
        data={{
          labels: dadosDePeso.map((item : Peso) => item.data),
          datasets: [{
            data: dadosDePeso.map((item : Peso) => item.peso)
          }]
        }}
        width={280}
        height={160}
        chartConfig={{
          backgroundGradientFrom: "#FFFFFF",
          backgroundGradientTo: "#FFFFFF",
          backgroundGradientToOpacity: 1,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          strokeWidth: 2, // optional, default 3
          barPercentage: 1,
          useShadowColorFromDataset: false // optional
        }}
        //bezier
        style={{ paddingBottom: 10 }}
      />)
    }
    else
    {
      return (<Text>Nenhum peso cadastrado</Text>)
    }
  }

  const dadosRecentes = dadosDePeso
  return (
    <View>
      {funcao()}
    </View>
  );
};
const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};
export default GraficoDePeso;