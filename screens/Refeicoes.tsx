import { StyleSheet, SafeAreaView, Text, View, Button, TextInput } from "react-native";
import SwitchComponent from "../Components/SwitchComponent";

export default function Refeicoes() {
    return (
        <View>
            <Text style={{padding: 10}}>Procure o nome da Refeições:</Text>
            <SwitchComponent
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#eee',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 40,
      marginBottom: 20,
      marginTop: 20,
      padding: 16
    },
    input: {
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 60
      },
  });
  