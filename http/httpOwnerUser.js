import axios from "axios";
import { PagesConst, UserObjectConst } from "../Const/_const";

const URL = 'https://react-native-rock-default-rtdb.firebaseio.com';

export function addUserHTTP(usersData) {
    return axios.post( URL + '/users.json', usersData );
}

export async function getUserHTTP() {
    const response =await axios.get( URL + '/users.json' );
    const users = [];
    for ( const key in response.data ) {
        const userObject = {
            id: key,
            name: response.data[key].name,
            contactNumber: response.data[key].contactNumber,
            mail: response.data[key].mail,
            password: response.data[key].password,
            rooms:response.data[key].rooms,
        }
        users.push(userObject);
    }
    return users;
}

export async function modifyUserHTTP( user, type ) {
    console.log('modifyUserHTTP ', type);
    const urlPut = URL + '/users/' + user.id + '.json';
    const urlAdd = URL + '/rooms.json';
    const newRoom = user.rooms[user.rooms.length -1];
    try {
        if(type === UserObjectConst.ROOMS) {
            const [modifyUserResponse, addRoomResponse] = await Promise.all([
                axios.put(urlPut, user),
                axios.post(urlAdd, newRoom)
            ]);
            //console.log('modifyUserResponse', modifyUserResponse);
            return (modifyUserResponse);
    } else {
        const res = await axios.put(urlPut, user); 
        console.log('res', res);
        return (res);
    }
    } catch (error) {
        console.error('Error modifying user or adding room:', error);
        throw new Error(`Failed to modify user with ID ${user.id} or add room: ${error.message}`);
    }
}

export async function getAllRoomsHTTP( ) {
    const response =await axios.get( URL + '/rooms.json' );
    const rooms = [];
    for ( const key in response.data ) {
        const userObject = {
            name: response.data[key].name,
            adress: response.data[key].adress,
            description: response.data[key].description,
            gallery: response.data[key].gallery,
            availability: response.data[key].availability,
            price: response.data[key].price,
            disabled: response.data[key].disabled
        }
        rooms.push(userObject);
    }
    return rooms;
}

