import { Alert, Button, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, FONTSIZE } from '../Const/_styles';
import { PagesConst,  RoomObjectConst } from '../Const/_const';
import { useEffect, useState } from 'react';
import { UserActions } from '../Redux/Actions/userAction';
import { connect } from 'react-redux';
import { Room } from '../Class/Room';


const AddRoom = ({getAllUsers, userOwner, modifyUser, addLoggedUser}) => {
    const route = useRoute();
    const user = route.params.user;
    const navigation = useNavigation();
    const initialValues = new Room(
        name= '',
        adress= '',
        description= '',
        gallery= '',
        availability= '',
        price= ''
    );

    const [roomFormData, setRoomFormData] = useState(initialValues);
    const [isFormValid, setIsFormValid] = useState(true);
    let newRoom;
    
    useEffect(() => {
        getAllUsers();
    }, [userOwner]); 


    const handleInputChange = (key, value) => {
        setIsFormValid(true);
        key === RoomObjectConst.NAME && setRoomFormData({ ...roomFormData, name: value });
        key === RoomObjectConst.ADRESS && setRoomFormData({ ...roomFormData, adress: value });
        key === RoomObjectConst.DESCRIPTION && setRoomFormData({ ...roomFormData, description: value });
        key === RoomObjectConst.GALLERY && setRoomFormData({ ...roomFormData, gallery: value });
        key === RoomObjectConst.AVAILABILITY && setRoomFormData({ ...roomFormData, availability: value });
        key === RoomObjectConst.PRICE && setRoomFormData({ ...roomFormData, price: value });
    };
    
    const checkNewRoom = () => {
     /*   if (roomFormData.adress.length >= 3 &&
        roomFormData.description.length >= 3 &&
        roomFormData.availability.length >= 3 &&
        roomFormData.price.length >= 3) {
            setIsFormValid(true);
            Alert.alert('¿Datos correctos?', '', 
                [{ text: "OK", style: "cancel", onPress: redirect}, { text: "NOPE", style: "cancel" }]
            );
        } else {
            setIsFormValid(false);
        }*/
       
       //TEST
       setIsFormValid(true);
       redirect();
    
        //TEST
    }
    
const redirect = () => {
    //navigation.goBack();
    // Add Room Firebase
    
    //TEST
    newRoom = new Room(
        name ='',
        adress= 'Santiago del Estero 2408',
        description= 'Muy linda',
        gallery= 'Después',
        availability= 'Ver calendario',
        price= '8000'
    );
    
    setRoomFormData(newRoom);
    
    
    //console.log(roomFormData);
    //user.rooms = [roomFormData];
    //console.log(user);

   // console.log('userOwner', userOwner);
    //console.log('user', user.id);
    
    const userToModify = userOwner.find(userArray => userArray.id === user.id);
   // console.log('userToModify1', userToModify.rooms.length);
   (userToModify.rooms === undefined || userToModify.rooms?.length === 0) ?  userToModify.rooms = [roomFormData] : userToModify.rooms.push(roomFormData);
    //console.log('userToModify2', userToModify);
    //console.log('userOwner', userOwner);
    //    userOwner.userArray = user;
    
    modifyUser(userToModify);
   // console.log('userOwner', userOwner);
   addLoggedUser(userToModify);


    //user.rooms = 
    //TEST
}
    
  
    return (
        <ScrollView>
        <View style={styles.container}>
            <Text style={styles.header}>AGREGAR SALA</Text>
            <TextInput
               style={styles.input}
               value={roomFormData.name}
               onChangeText={(value) => handleInputChange(RoomObjectConst.NAME, value)}
               placeholder={'NOMBRE DE SALA *'}
               placeholderTextColor={'rgb(102, 102, 102)'}
               keyboardType={'default'}
               maxlength={300}
            >
            </TextInput>
            <TextInput
               style={styles.input}
               value={roomFormData.adress}
               onChangeText={(value) => handleInputChange(RoomObjectConst.ADRESS, value)}
               placeholder={'DIRECCIÓN *'}
               placeholderTextColor={'rgb(102, 102, 102)'}
               keyboardType={'default'}
               maxlength={300}
            >
            </TextInput>
            <TextInput
               style={styles.input}
               value={roomFormData.description}
               onChangeText={(value) => handleInputChange(RoomObjectConst.DESCRIPTION, value)}
               placeholder={'DESCRIPCION *'}
               placeholderTextColor={'rgb(102, 102, 102)'}
               keyboardType={'default'}
               maxlength={300}
            >
            </TextInput>
            <TextInput
               style={styles.input}
               value={roomFormData.availability}
                onChangeText={(value) => handleInputChange(RoomObjectConst.AVAILABILITY, value)}
               placeholder={'DISPONIBILIDAD *'}
               placeholderTextColor={'rgb(102, 102, 102)'}
               keyboardType={'default'}
               maxlength={300}
            >
            </TextInput>
            <TextInput
               style={styles.input}
               value={roomFormData.gallery}
                onChangeText={(value) => handleInputChange(RoomObjectConst.GALLERY, value)}
               placeholder={'FOTOS'}
               placeholderTextColor={'rgb(102, 102, 102)'}
               keyboardType={'default'}
               maxlength={300}
            >
            </TextInput>
            <TextInput
               style={styles.input}
               value={roomFormData.price}
                onChangeText={(value) => handleInputChange(RoomObjectConst.PRICE, value)}
               placeholder={'PRECIO *'}
               placeholderTextColor={'rgb(102, 102, 102)'}
               keyboardType={'default'}
               maxlength={300}
            >
            </TextInput>
            {!isFormValid ? <Text style={styles.invalidForm }>Por favor complete los datos obligatorios (*)</Text> : ''}
            <Button title='Agregar' onPress={() => checkNewRoom()}></Button>
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
  },
  input: {
    marginBottom: 30,
    color: COLORS.black,
    padding: 10,
    fontSize: 15,
    opacity: 1,
    borderBottomWidth: 1,
    width:'80%',
  },
  invalidForm: {
        color: COLORS.fail,
        fontWeight: 'bold'
  }
});

const mapStateToProps = (state) => ({
    userOwner: state.userOwnerReducer.userOwners
});

const mapDispatchToProps = {
    addUser: UserActions.addUser,
    getAllUsers: UserActions.getAllUsers,
    modifyUser: UserActions.modifyUser,
    addLoggedUser: UserActions.addLoggedUser
}


export default connect(mapStateToProps, mapDispatchToProps)(AddRoom);