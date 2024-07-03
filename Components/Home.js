import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTSIZE } from '../Const/_styles';
import { PagesConst } from '../Const/_const';

const Home = () => {
    const navigation = useNavigation();

    return (
      <View style={styles.container}>
        <Text style={styles.header}>¡Bienvenido a SONAMOS!</Text>
        <Text style={styles.text}>Si tu objetivo es alquilar tus salas a los músicos de Mar del Plata registrate </Text>
        <Button title={ 'AQUÍ!'} onPress={() => navigation.navigate(PagesConst.OWNERREGISTER)}></Button>
        
        <Text style={styles.text}>Si tu objetivo es buscar lugar donde ensayar de Mar del Plata registrate </Text>
        <Button title={ 'AQUÍ!'} onPress={() => navigation.navigate(PagesConst.USERREGISTER)}></Button>

        <Text style={styles.text}>Si ya tenes cuenta logeate </Text>
        <Button title={ 'AQUÍ!'} onPress={() => navigation.navigate(PagesConst.LOGIN)}></Button>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bbkgColor1,
        padding: 20
    },
    header: {
        fontSize: FONTSIZE.header1,
        textAlign:'center',
        marginTop: 20,
        marginBottom: 20
    },
    text: {
        fontSize: FONTSIZE.text,
        marginTop: 50,
    }
  });

  export default Home;
  