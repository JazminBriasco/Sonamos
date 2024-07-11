import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTSIZE } from '../Const/_styles';
import { PagesConst } from '../Const/_const';
import { useEffect, useState } from 'react';
import Rooms from '../Screens/Rooms';
import { UserActions } from '../Redux/Actions/userAction';
import { connect } from 'react-redux';
import { StatusBar } from 'expo-status-bar';

const Home = ({loggedUser, route}) => {
  const navigation = useNavigation();
  console.log('HOME');
  
  /*const [userLog, setUserLog] = useState(undefined);
  
  
  useEffect(() => {
    console.log('loggedUser Home: ', loggedUser);
    setUserLog(loggedUser);
    console.log('userLog Home: ', userLog);
    }),[];*/

    return (
        <View style={styles.container} >
        <StatusBar style='default' />
          {loggedUser ? (
            <Rooms />
          ) : (
            <View style={styles.body}>
              {route?.params !== 'fromRegister' ? (
                <View> 
                  <Text style={styles.header}>¡Bienvenido a SONAMOS!</Text>
                  <Text style={styles.text}>Si tu objetivo es alquilar tus salas a los músicos de Mar del Plata regístrate </Text>
                  <Button title={'AQUÍ!'} onPress={() => navigation.navigate(PagesConst.OWNERREGISTER)} />
                  
                  <Text style={styles.text}>Si tu objetivo es buscar lugar donde ensayar en Mar del Plata regístrate </Text>
                  <Button title={'AQUÍ!'} onPress={() => navigation.navigate(PagesConst.USERREGISTER)} />
                  
                  <Text style={styles.text}>Si ya tienes cuenta, inicia sesión </Text>
                  <Button title={'AQUÍ!'} onPress={() => navigation.navigate(PagesConst.LOGIN)} />
                </View>
              ):
              <View style={styles.textLogin}>
                <Text style={styles.text}>Por favor inicia sesión ♫ </Text>
                <Button title={'AQUÍ!'} onPress={() => navigation.navigate(PagesConst.LOGIN)} />
              </View>
              }
            </View>
          )}
        </View>
    );
  };
  
  
  const styles = StyleSheet.create({
    container: {
        display:'flex',
        flex:1,
        backgroundColor: COLORS.bbkgColor1,
        padding: 10,
    },
    body: {
      backgroundColor: COLORS.bbkgColor1,
      marginVertical: '10%',
      paddingVertical: '20%',
      paddingHorizontal:10
    },
    header: {
        fontSize: FONTSIZE.header1,
        textAlign:'center',
        marginVertical: 10
    },
    text: {
        fontSize: FONTSIZE.text,
        marginTop: 50,
        marginBottom:20,
        textAlign: 'center',
    },
    textLogin: {
      marginVertical:'50%'
    }
  });

  
const mapStateToProps = (state) => (
  {
    loggedUser: state.userOwnerReducer.loggedUser
  });

  

export default connect(mapStateToProps)(Home);
  