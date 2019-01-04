import AbstractCommand from '@/commands/AbstractCommand';

class Msg extends AbstractCommand {
    static get name() {
        return 'msg';
    }

    run() {
        if (this.arguments.all.length < 3) {
            return false;
        }

        const isAction = false;
        const target = this.arguments.first;
        const message = this.arguments.message(2);

        this.ipc.send('message-sent', isAction, target, message);

        return true;
    }
}

export default Msg;
