import React, { useState } from 'react';
import { View , Text, StyleSheet, Button, Alert, Modal} from 'react-native';
import { Input } from '@rneui/themed';
import { MetaCalorias } from '../models/MetaCalorias.model';
import MetaCaloriasService from '../services/metadecalorias.service';

const CadastrarMeta = (props: {}) => {
    const [meta, setMeta] = useState(0);
    const [modalVisible, setmodalVisible] = useState(false);
  
    return (
        <View>
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
                        MetaCaloriasService.addData(new MetaCalorias(0, meta, "2023-12-07")).then((item) => {
                            Alert.alert('Meta cadastrada com sucesso!');
                        })
                    }}
                    title="Atualizar meta"
                    color="rgb(100,20,255)"
                    accessibilityLabel="Atualizar meta"
                    ></Button>
                </View>
            </View>
        </View>
    )
}


export default CadastrarMeta

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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
});