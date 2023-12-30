import React from 'react';
import { View , Text, StyleSheet} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AlimentoType from './types/AlimentoType';

const ComponenteAlimento = (props: AlimentoType) => (
    <View>
        <Text>Alimento: {props.nome}</Text>
        <Text>Calorias: {props.calorias}</Text>
        <Text>Proteínas: {props.proteinas}</Text>
        <Text>Gorduras: {props.gorduras}</Text>
    </View>
)

export default ComponenteAlimento

const styles = StyleSheet.create({
});