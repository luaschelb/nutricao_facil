import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Painel from './screens/Painel'
import Configuracoes from './screens/Configuracoes'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import Refeicoes from './screens/Refeicoes';

const Tab = createBottomTabNavigator();

function TabGroup () {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: `rgba(100, 70, 255, 1)`,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
            tabBarStyle: { paddingBottom: 5, paddingTop: 5 },
            tabBarIcon: ({ focused, color, size }) => {
                let iconName = 'rocket'
      
                if (route.name === 'Painel') {
                  iconName = focused ? 'home' : 'home-outline';
                  return <Icon name={iconName} size={size} color={color} />;
                  // Retorna o ícone do Ionicons com base no nome e outras propriedades
                  return <Icon name={iconName} size={size} color={color} />;
                } else if (route.name === 'Configurações') {
                  iconName = focused ? 'settings' : 'settings-outline';
                  return <Icon name={iconName} size={size} color={color} />;
                  // Retorna o ícone do Ionicons com base no nome e outras propriedades
                } else if (route.name === 'Refeições') {
                  iconName = focused ? 'restaurant' : 'restaurant-outline';
                  return <Icon name={iconName} size={size} color={color} />;
                  // Retorna o ícone do Ionicons com base no nome e outras propriedades
                }
                return <Icon name={iconName} size={size} color={color} />;
            },
          })}
          >
            <Tab.Screen 
                name="Painel"
                component={Painel} 
                options={{ 
                  title: 'Nutrição fácil' ,
                  tabBarLabel:"Painel",
                }}
                />
            <Tab.Screen 
                name="Refeições" 
                component={Refeicoes} />
            <Tab.Screen 
                name="Configurações" 
                component={Configuracoes} />
        </Tab.Navigator>
    )
}

export default function Navigation () {
    return (
        <NavigationContainer>
            <TabGroup />
        </NavigationContainer>
    )
}