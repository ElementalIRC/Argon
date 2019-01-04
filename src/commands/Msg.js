class Msg {
    static get name() {
        return 'msg';
    }

    run() {
        const isAction = false;
        const target = this.arguments.first;
        const message = this.arguments.rest(2);
        this.ipc.send('message-sent', isAction, target, message);
    }
}

export default Msg;
