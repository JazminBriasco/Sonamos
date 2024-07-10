import { Button, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTSIZE } from '../Const/_styles';
import { PagesConst, TypeCard } from '../Const/_const';
import { useEffect, useState } from 'react';
import { UserActions } from '../Redux/Actions/userAction';
import { connect } from 'react-redux';
import Card from '../Components/Card';

const Profile = ({loggedUser, getLoggedUser}) => {
  const [user, setUser] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      await getLoggedUser();
    };
    
    //if(user?.name === undefined || user === null) fetchData();
  }, [getLoggedUser]);

  useEffect(() => {
    if(user?.name === undefined || user === null) setUser(loggedUser);
  }, [loggedUser]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>¡Hola {loggedUser?.name}!</Text>
        <Text style={styles.legend}>{loggedUser?.id} - {loggedUser?.contactNumber} - {loggedUser?.mail} </Text>
        <Text style={styles.text}>Aquí se encontrarían tus salas y las opciones de administrador</Text>
        <Text style={styles.subHeader}>Tus salas</Text>
        <View>
        {loggedUser?.rooms ? 
          <FlatList
                data={loggedUser.rooms}
                renderItem={({ item }) => 
                <Card type={TypeCard.CARDMYROOM} item={item}></Card>
              }
                keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                />
                : 
                <Text >Aún no tienes salas agregadas</Text>}
                </View>
        <Text style={styles.subHeader}>Tus reservas</Text>
        <Text >Tus reservas</Text>
        <Text >Tus reservas</Text>
        <Text >Tus reservas</Text>
        <Button title='Agregar sala' onPress={() => navigation.navigate(PagesConst.ADDROOM, { user: user, loggedUser: loggedUser })}></Button>
        <Button title='Modificar perfil'></Button>
        <Button title='Ver estadísticas (Salas reservadas, dinero ganado, pago realizado, mercado pago)'></Button>
      </View>
      </ScrollView>
  );
};


const styles = StyleSheet.create({
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
  }
  });
const mapStateToProps = (state) => ({
  loggedUser: state.userOwnerReducer.loggedUser,
});

const mapDispatchToProps = {
  addLoggedUser: UserActions.addLoggedUser,
  getLoggedUser: UserActions.getLoggedUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);