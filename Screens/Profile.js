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
    console.log('usdfser', loggedUser.rooms);
  }, [getLoggedUser]);

  useEffect(() => {
    if(user?.name === undefined || user === null) setUser(loggedUser);
  }, [loggedUser]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>¡Hola {user?.name}!</Text>
        <Text style={styles.text}>Aquí se encontrarían tus salas y las opciones de administrador</Text>
        <Text style={styles.subHeader}>Salas</Text>
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
          
        <Text style={styles.subHeader}>Tus reservas</Text>
        <Text >Tus reservas</Text>
        <Text >Tus reservas</Text>
        <Text >Tus reservas</Text>
        <Button title='Agregar sala' onPress={() => navigation.navigate(PagesConst.ADDROOM, { user: user })}></Button>
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
    fontSize: FONTSIZE.subHeaders
  },
  text: {
      fontSize: FONTSIZE.text,
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