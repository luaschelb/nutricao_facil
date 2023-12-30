import React, { useState } from 'react';
import { SearchBar } from '@rneui/themed';
import { View, Text, StyleSheet, FlatList, Dimensions, Modal, Alert, Pressable } from 'react-native';
import { Button } from '@rneui/base';
import alimentosData from '../data/alimentos';
import ComponenteAlimento from './ComponenteAlimento';
import RefeicoesService from '../services/refeicoes.service';
import { Refeicoes } from '../models/Refeicoes.model';

type alimento = {
  nome: string,
  calorias: number,
  proteinas: number,
  gorduras: number
}

type SearchBarComponentProps = {};

const SwitchComponent: React.FunctionComponent<SearchBarComponentProps> = () => {
const [search, setSearch] = useState("");
const [queryResult, setQueryResult] = useState(<Text style={{padding: 15}}>Nenhum resultado encontrado</Text>);
const [alimentos, setAlimentos] = useState(alimentosData);
const [alimentoSelecionado, setAlimentoSelecionado] = useState({});
const [modalVisible, setmodalVisible] = useState(false);

const actionAdicionarAlimento = () => {
  setmodalVisible(!modalVisible);
}

const updateSearch = (search : string) => {
  setSearch(search);
  let resultado = alimentos.filter((alimento) =>  {
    let alimentoNome = alimento.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
    let searchNome = search.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
    return alimentoNome.includes(searchNome)
  })
  if(resultado.length)
  {
    setQueryResult(
    <View style={styles.container}>
      <FlatList
        data={resultado}
        renderItem={({item}) => 
        <View style={styles.cardAlimento}>
          <View style={styles.descricaoAlimento}>  
            <Text>Alimento: {item.nome}</Text>
            <Text>Calorias: {item.calorias}</Text>
            <Text>Proteínas: {item.proteinas}</Text>
            <Text>Gorduras: {item.gorduras}</Text>
          </View>
          <View style={{marginHorizontal: 15, marginTop: 15}}>
            <Button
              onPress={() => {
                setAlimentoSelecionado(item)
                actionAdicionarAlimento()
              }}
              title="Adicionar alimento"
              color="rgb(100,20,255)"
              accessibilityLabel="Adicionar alimento"
              style={{borderRadius: 20}}
            ></Button>
          </View>
        </View>
      }
      />
    </View>)
  }
  else
  {
    setQueryResult(<Text style={{padding: 15}}>Nenhum resultado encontrado</Text>)
  }
};

let salvaRefeicaoNoBD = (refeição : string, tipo: string) => {
  //Alert.alert(refeição + ' cadastrado com sucesso!');
  console.log("clicked")
  RefeicoesService.addData(new Refeicoes(2, alimentoSelecionado.nome, alimentoSelecionado.calorias, "2023-12-07", tipo)).then((item) => {
      Alert.alert('Refeicao cadastrada com sucesso!');
      setmodalVisible(false)
  })
}

return (
  <View style={{}}>
    <SearchBar
      placeholder="Busque um alimento aqui"
      onChangeText={updateSearch}
      value={search}
      platform ='android'
    />
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Cadastro cancelado.');
        setmodalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Selecione a refeição: </Text>
          <Pressable
            style={[styles.button, styles.buttonCreate]}
            onPress={() => salvaRefeicaoNoBD("Café da manhã", '1')}>
            <Text style={styles.textStyle}>Café da manhã</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonCreate]}
            onPress={() => salvaRefeicaoNoBD("Almoço", '2')}>
            <Text style={styles.textStyle}>Almoço</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonCreate]}
            onPress={() => salvaRefeicaoNoBD("Café da tarde", '3')}>
            <Text style={styles.textStyle}>Café da tarde</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonCreate]}
            onPress={() => salvaRefeicaoNoBD("Jantar", '4')}>
            <Text style={styles.textStyle}>Jantar</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose, {marginTop: 20, width: 100 }]}
            onPress={() => {
              Alert.alert('Cadastro cancelado.')
              setmodalVisible(!modalVisible)
            }}>
            <Text style={styles.textStyle}>Fechar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
    <Text style={{padding: 10}}>{queryResult}</Text>
  </View>
);
};

const styles = StyleSheet.create({
cardAlimento: {
  flex: 1,
  borderRadius: 15,
  marginVertical: 4,
  marginHorizontal: 15,
  padding: 10,
  flexDirection: 'row',
  backgroundColor: "#fff",
},
descricaoAlimento: {
  flex: 1,
  borderRadius: 15,
  //backgroundColor: "red",
  backgroundColor: "#fff",
},
container: {
  flex: 1,
  flexDirection: 'column',
  borderRadius: 15,
  paddingTop: 15,
  alignContent: 'center',
  //backgroundColor: "red",
  width: Dimensions.get('window').width
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
button: {
  width: 156,
  //height: 80,
  //color: 'black',
  padding: 10,
  elevation: 2,
  backgroundColor: '#F194FF',
},
buttonCreate: {
  backgroundColor: 'rgb(100,20,255)',
  marginBottom: 2
},
buttonClose: {
  backgroundColor: '#2196F3',
  borderRadius: 20,
},
textStyle: {
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
},
modalText: {
  marginBottom: 15,
  textAlign: 'center',
}
});

export default SwitchComponent;