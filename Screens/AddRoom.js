import {
  Alert,
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS, FONTSIZE } from "../Const/_styles";
import { PagesConst, RoomObjectConst } from "../Const/_const";
import { useEffect, useState } from "react";
import { UserActions } from "../Redux/Actions/userAction";
import { connect } from "react-redux";
import { Room } from "../Class/Room";
import * as ImagePicker from "expo-image-picker";
import { useCameraPermissions } from "expo-camera";

const AddRoom = ({ getAllUsers, userOwner, modifyUser, addLoggedUser }) => {
  const route = useRoute();
  const user = route.params.user;
  const loggedUser = route.params.loggedUser;
  const navigation = useNavigation();
  const initialValues = new Room(
    (name = ""),
    (adress = ""),
    (description = ""),
    (gallery = ""),
    (availability = ""),
    (price = "")
  );

  const [roomFormData, setRoomFormData] = useState(initialValues);
  const [isFormValid, setIsFormValid] = useState(true);
  const [image, setImage] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    getAllUsers();
    setImage()
  }, [userOwner]);

  const pickImage = async () => {
    try{
        let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      multiple: true
    });

    if (!result.canceled) {
        const uri = result.assets[0].uri
        setImages([...images, uri]);
        setRoomFormData({ ...roomFormData, gallery: images});
    }
    }catch(error){
        console.log('error', error);
    }
  };

  const handleInputChange = (key, value) => {
    setIsFormValid(true);
    key === RoomObjectConst.NAME &&
      setRoomFormData({ ...roomFormData, name: value });
    key === RoomObjectConst.ADRESS &&
      setRoomFormData({ ...roomFormData, adress: value });
    key === RoomObjectConst.DESCRIPTION &&
      setRoomFormData({ ...roomFormData, description: value });
    key === RoomObjectConst.AVAILABILITY &&
      setRoomFormData({ ...roomFormData, availability: value });
    key === RoomObjectConst.PRICE &&
      setRoomFormData({ ...roomFormData, price: value });
  };

  const checkNewRoom = () => {
    console.log(roomFormData.gallery.length);
    if (
      roomFormData.name.length >= 1 &&
      roomFormData.adress.length >= 2 &&
      roomFormData.description.length >= 2 &&
      roomFormData.availability.length >= 2 &&
      roomFormData.price.length >= 2 &&
      roomFormData.gallery.length >= 1
    ) {
      setIsFormValid(true);
      redirect();
    } else {
      setIsFormValid(false);
    }
  };

  const redirect = () => {
    const userToModify = userOwner.find(
      (userArray) => userArray.id === user.id
    );
    userToModify?.rooms === undefined || userToModify?.rooms?.length === 0
      ? (userToModify.rooms = [roomFormData])
      : userToModify.rooms.push(roomFormData);

    modifyUser(userToModify);
    addLoggedUser(userToModify);
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>AGREGAR SALA</Text>
        <TextInput
          style={styles.input}
          value={roomFormData.name}
          onChangeText={(value) =>
            handleInputChange(RoomObjectConst.NAME, value)
          }
          placeholder={"NOMBRE DE SALA*"}
          placeholderTextColor={"rgb(102, 102, 102)"}
          keyboardType={"default"}
          maxlength={300}
        ></TextInput>
        <TextInput
          style={styles.input}
          value={roomFormData.adress}
          onChangeText={(value) =>
            handleInputChange(RoomObjectConst.ADRESS, value)
          }
          placeholder={"DIRECCIÓN*"}
          placeholderTextColor={"rgb(102, 102, 102)"}
          keyboardType={"default"}
          maxlength={300}
        ></TextInput>
        <TextInput
          style={styles.input}
          value={roomFormData.description}
          onChangeText={(value) =>
            handleInputChange(RoomObjectConst.DESCRIPTION, value)
          }
          placeholder={"DESCRIPCION*"}
          placeholderTextColor={"rgb(102, 102, 102)"}
          keyboardType={"default"}
          maxlength={300}
        ></TextInput>
        <TextInput
          style={styles.input}
          value={roomFormData.availability}
          onChangeText={(value) =>
            handleInputChange(RoomObjectConst.AVAILABILITY, value)
          }
          placeholder={"DISPONIBILIDAD*"}
          placeholderTextColor={"rgb(102, 102, 102)"}
          keyboardType={"default"}
          maxlength={300}
        ></TextInput>
        <Pressable onPress={pickImage} style={styles.input}>
          <Text style={styles.placeholder}>FOTOS*</Text>
        </Pressable>
        <View style={styles.imageContainer}>
        {images!== null && images.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.image} />
        ))}
        </View>
        <TextInput
          style={styles.input}
          value={roomFormData.price}
          onChangeText={(value) =>
            handleInputChange(RoomObjectConst.PRICE, value)
          }
          placeholder={"PRECIO*"}
          placeholderTextColor={"rgb(102, 102, 102)"}
          keyboardType={"number-pad"}
          maxlength={300}
        ></TextInput>
        {!isFormValid ? (
          <Text style={styles.invalidForm}>
            Por favor complete los datos obligatorios (*)
          </Text>
        ) : (
          ""
        )}
        <Button title="Agregar" onPress={() => checkNewRoom()}></Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  header: {
    fontSize: FONTSIZE.header1,
    textAlign: "center",
    marginVertical: 10,
  },
  subHeader: {
    fontSize: FONTSIZE.subHeaders,
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
    width: "80%",
  },
  invalidForm: {
    color: COLORS.fail,
    fontWeight: "bold",
  },
  placeholder: {
    color: 'rgb(102, 102, 102)'
  },    
  imageContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems:'center',
    width:50
    
},
image: {
    width: 80,
    borderRadius: 5,
    height: 50,
  },
});

const mapStateToProps = (state) => ({
  userOwner: state.userOwnerReducer.userOwners,
});

const mapDispatchToProps = {
  addUser: UserActions.addUser,
  getAllUsers: UserActions.getAllUsers,
  modifyUser: UserActions.modifyUser,
  addLoggedUser: UserActions.addLoggedUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRoom);
