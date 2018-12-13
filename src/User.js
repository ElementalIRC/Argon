const md5 = require('md5');

class User {
    constructor(nick, hostname, modes) {
        this.creationTime = new Date().getTime();
        this.nick = nick;
        this.hostname = hostname;
        this.modes = modes;
        this.id = md5(`${this.nick}`);
    }
}

module.exports = User;
