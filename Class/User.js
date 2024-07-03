export class User{
    constructor(id, name, contactNumber, password, mail, isAdmin, rooms) {
        this.id = id;
        this.name= name;
        this.contactNumber= contactNumber;
        this.password=password;
        this.mail=mail;
        this.isAdmin = isAdmin;
        this.rooms = rooms
    }
}