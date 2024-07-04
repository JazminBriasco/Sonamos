import { Button, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTSIZE } from '../Const/_styles';
import { PagesConst } from '../Const/_const';
import { useEffect, useState } from 'react';
import { UserActions } from '../Redux/Actions/userAction';
import { connect } from 'react-redux';

const Profile = ({loggedUser, getLoggedUser}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await getLoggedUser();
    };

    if(user === undefined || user === null) fetchData();
  }, [getLoggedUser]);

  useEffect(() => {
    if(user === undefined || user === null) setUser(loggedUser);
  }, [loggedUser]);

  useEffect(() => {
    if (user) {
      console.log('user', user?.name); // Verifica user.mail aquí
    }
  }, [user]);

  return (
    <ScrollView>
      <View>
        <Text>PERFIL {user?.name}</Text>
        <Text>Aquí se encontrarían las salas y acciones que puede hacer el admin / usuario</Text>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  loggedUser: state.userOwnerReducer.loggedUser,
});

const mapDispatchToProps = {
  addLoggedUser: UserActions.addLoggedUser,
  getLoggedUser: UserActions.getLoggedUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);