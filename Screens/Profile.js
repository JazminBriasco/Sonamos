import { Button, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTSIZE } from '../Const/_styles';
import { PagesConst, TypeCard } from '../Const/_const';
import React, { useEffect, useState } from 'react';
import { UserActions } from '../Redux/Actions/userAction';
import { connect } from 'react-redux';
import Card from '../Components/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({loggedUser, getLoggedUser, addLoggedUser}) => {
  console.log('PROFILE');
  const [user, setUser] = useState({});

  const navigation = useNavigation();

  useEffect(() => {
    getLoggedUser(); 
  }, [getLoggedUser]); 

  useEffect(() => {
    if (loggedUser) {
      setUser(loggedUser); 
    } else {
      navigation.navigate(PagesConst.HOME);
    }
  }, [loggedUser, navigation]); 



  const exit = () => {
    addLoggedUser(undefined);
    AsyncStorage.removeItem('userLogged');
    navigation.navigate(PagesConst.SONAMOS)
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>¡Hola {user?.name}!</Text>
        <Text style={styles.legend}>{user?.id} - {user?.contactNumber} - {user?.mail} </Text>
        <Text style={styles.text}>Aquí se encontrarían tus salas y las opciones de administrador</Text>
        <Text style={styles.subHeader}>Tus salas</Text>
        <View>
        {user?.rooms && user.rooms.length > 0 ? 
            user.rooms.map((room, index) => (
              <Card key={room.id ? room.id.toString() : index.toString()} type={TypeCard.CARDMYROOM} item={room} />
            ))
          : 
            <Text >Aún no tienes salas agregadas</Text>}
        </View>
        <Text style={styles.subHeader}>Tus reservas</Text>
        <Text >Tus reservas</Text>
        <Text >Tus reservas</Text>
        <Text >Tus reservas</Text>
        <Button title='Agregar sala' onPress={() => navigation.navigate(PagesConst.ADDROOM, { loggedUser: loggedUser })}></Button>
        <Button title='Modificar perfil'></Button>
        <Button title='Ver estadísticas (Salas reservadas, dinero ganado, pago realizado, mercado pago)'></Button>
        <Button title='Cerrar sesión' color={COLORS.fail} onPress={exit} ></Button>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
      flex: 1,
      margin:10
  },
  header: {
    fontSize: FONTSIZE.header1,
    textAlign:'center',
    marginVertical:10
  },
  subHeader: {
    fontSize: FONTSIZE.subHeaders,
    marginVertical:10,
    marginTop:20, 
    textAlign:'center',
  },
  text: {
      fontSize: FONTSIZE.text,
  },
  legend: {
    fontSize: 10,
    textAlign:'center',
    marginBottom:10
  },
});

const mapStateToProps = (state) => ({
  loggedUser: state.userOwnerReducer.loggedUser,
});

const mapDispatchToProps = {
  addLoggedUser: UserActions.addLoggedUser,
  getLoggedUser: UserActions.getLoggedUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Profile));