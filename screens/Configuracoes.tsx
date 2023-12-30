import { StyleSheet, SafeAreaView, Text, View, TextInput, Button, Alert, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from '@rneui/themed';
import PesoService from "../services/peso.service";
import { Peso } from "../models/Peso.model";
import { useState } from "react";
import CadastrarMeta from "../Components/CadastrarMeta";
import MetaCaloriasService from "../services/metadecalorias.service";
import { MetaCalorias } from "../models/MetaCalorias.model";

export default function Configuracoes() {
    const [pesoInput, setPesoInput] = useState('text')
    const [meta, setMeta] = useState(0);
    const [dataInput, setDataInput] = useState('text')
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text>
                    Luana Schelb
                </Text>
            </View> 
            <View style={styles.container}>
                <Text>
                    Peso
                </Text>
                <View style={{width: 240}}>
                    <Input
                        style={{height: 40, width: 120, paddingTop:5}}
                        placeholder="Digite o valor da pesagem"
                        onChangeText={text => setPesoInput(text)}
                        //defaultValue={"oi"}
                    />
                    <Input
                        style={{height: 40, width: 120}}
                        placeholder="Insira a data"
                        onChangeText={text => setDataInput(text)}
                        //defaultValue={"oi"}
                    />
                    <Button
                    onPress={() => {
                        console.log("clicked")
                        PesoService.addData(new Peso(2, pesoInput, dataInput)).then((item) => {
                                Alert.alert('Peso cadastrado com sucesso!');
                            })
                    }}
                    title="Cadastrar Peso"
                    color="rgb(100,20,255)"
                    accessibilityLabel="Cadastrar Peso"
                    ></Button>
                </View>
            </View>
            <View style={styles.container}>
                <Text>
                    Meta de calorias
                </Text>
                <View style={{width: 250}}>
                    <Input
                        style={{height: 40, width: 250}}
                        placeholder="Digite sua meta de calórias"
                        onChangeText={(meta : string) => setMeta(parseInt(meta))}
                    />
                    <Button
                    onPress={() => {
                        console.log("clicked")
                        MetaCaloriasService.addData(new MetaCalorias(2, meta, "2023-12-07")).then((item) => {
                            Alert.alert('Meta cadastrada com sucesso!');
                        })
                    }}
                    title="Atualizar meta"
                    color="rgb(100,20,255)"
                    accessibilityLabel="Atualizar meta"
                    ></Button>
                </View>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
      //flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 40,
      marginBottom: 20,
      marginTop: 20,
      padding: 16
    },
  });