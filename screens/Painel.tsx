import { StyleSheet, SafeAreaView, Text, View, Button, ScrollView } from "react-native";
import GraficoDeCalorias from "../Components/GraficoDeCalorias";
import GraficoDePeso from "../Components/GraficoDePeso";
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from "react";
import AnimalService from "../services/peso.service";
import RefeicoesService from "../services/refeicoes.service";
import { FlatList } from "react-native";
import { Refeicoes } from "../models/Refeicoes.model";
import MetaCaloriasService from "../services/metadecalorias.service";

export default function Painel() {
    const [data, setData] = useState({})
    const [refeicoes, setRefeicoes] = useState([])
    const [totalCalorias, setTotalCalorias] = useState(0)
    const [metaCalorias, setMetaCalorias] = useState(0)
    const [somaCaloriasPorRefeicao, setSomaCaloriasPorRefeicao] = useState([0,0,0,0])

    const updateRefeicoes = () => {
        RefeicoesService.findAll()
            .then((response: any) => {
                let data = response._array
                const initialValue = 0;
                let refeicoesDeHoje = data
                let cafeDaManha = refeicoesDeHoje.filter((refeicoes : any)=> refeicoes.tipo === 1).reduce(
                    (accumulator : number, refeicao : Refeicoes) => accumulator + refeicao.calorias,
                    initialValue,
                    );
                let almoco = refeicoesDeHoje.filter((refeicoes : any)=> refeicoes.tipo === 2).reduce(
                    (accumulator : number, refeicao : Refeicoes) => accumulator + refeicao.calorias,
                    initialValue,
                    );
                let cafeDaTarde = refeicoesDeHoje.filter((refeicoes : any)=> refeicoes.tipo === 3).reduce(
                    (accumulator : number, refeicao : Refeicoes) => accumulator + refeicao.calorias,
                    initialValue,
                    );
                let jantar = refeicoesDeHoje.filter((refeicoes : any)=> refeicoes.tipo === 4).reduce(
                    (accumulator : number, refeicao : Refeicoes) => accumulator + refeicao.calorias,
                    initialValue,
                    );
    
                setTotalCalorias(cafeDaManha + almoco + cafeDaTarde + jantar)
                setSomaCaloriasPorRefeicao([
                    cafeDaManha,
                    almoco,
                    cafeDaTarde,
                    jantar
                ])
                setRefeicoes(refeicoesDeHoje)
            })
    }    
    const updateMeta = () => {
        MetaCaloriasService.findAll()
        .then((response: any) => {
            let data = response._array
            console.log(data)
            setMetaCalorias(data[data.length-1].meta)
        })
    }
    useEffect(() => {
        updateRefeicoes();
    }, [])

    useEffect(() => {
        updateMeta();
    }, [])

    return (
        <ScrollView>
        <View style={styles.container}>
            <Button
            onPress={() => {
                updateMeta()
                updateRefeicoes()
            }}
            title="Atualizar dados"
            color="rgb(100,20,255)"
            accessibilityLabel="Atualizar dados"
            ></Button>
            <View style={styles.containerCardCalorias}>
                <Text style={{fontSize: 18, fontWeight: 'bold', paddingTop: 20, paddingLeft: 10, paddingBottom: 10}}>Calorias</Text>
                <View style={styles.cardCalorias}>
                    <GraficoDeCalorias />
                    <View style={{flex: 1, height: 100,alignItems: 'flex-start'}}>
                        <View style={styles.linhaCaloria}>
                            <Icon name="flag"color="grey" size={25}/>
                            <Text style={styles.legenda}>
                                Meta de calorias: {metaCalorias}
                            </Text>
                        </View>
                            <View style={styles.linhaCaloria}>
                            <Icon name="restaurant"color="green" size={25}/>
                            <Text style={styles.legenda}>
                                Calorias ingeridas: {totalCalorias}
                            </Text>
                        </View>
                            <View style={styles.linhaCaloria}>
                            <Icon name="flame"color="orange" size={25}/>
                            <Text style={styles.legenda}>
                                Calorias faltantes: {metaCalorias - totalCalorias}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.card}>
                <Text style={{fontSize: 18, fontWeight: 'bold', paddingTop: 20, paddingLeft: 40, paddingBottom: 10}}>Peso</Text>
                <GraficoDePeso />
            </View>
            <View style={styles.card2}>
                <Text style={styles.subtitulo}>Refeições</Text>
                <Text style={styles.textoRefeicoes}>Café da manhã: {somaCaloriasPorRefeicao[0]}kcal </Text>
                <Text style={styles.textoRefeicoes}>Almoço: {somaCaloriasPorRefeicao[1]}kcal</Text>
                <Text style={styles.textoRefeicoes}>Café da tarde: {somaCaloriasPorRefeicao[2]}kcal</Text>
                <Text style={styles.textoRefeicoes}>Jantar: {somaCaloriasPorRefeicao[3]}kcal</Text>
            </View>
        </View></ScrollView>
    )
}

const styles = StyleSheet.create({
    subtitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 20,
        paddingLeft: 40,
        paddingBottom: 10
    },
    textoRefeicoes: {
        paddingLeft: 20
    },
    container: {
        flex: 1,
        //backgroundColor: '#fff',
        marginHorizontal: 20,
        marginBottom: 20,
        marginTop: 20,
        padding: 16,
        rowGap: 10,
    },
    card: {
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: 15
    },
    card2: {
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: 15,
      paddingBottom: 20
    },
    legenda: {
        fontSize: 13,
        textAlignVertical: 'center',
    },
    cardCalorias: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
      },
    containerCardCalorias: {
        flex: 1, 
        flexDirection: 'column',
        backgroundColor: '#fff',
        paddingLeft: 20,
        borderRadius: 10,
        paddingBottom: 10
    },
    linhaCaloria: {
        flex: 1, 
        flexDirection: 'row',
    },
    medidorDeCalorias: {
      backgroundColor: '#fff',
      marginHorizontal: 40,
      marginBottom: 20,
      marginTop: 20,
      padding: 16,
      alignSelf: 'flex-end'
    },
  });
  