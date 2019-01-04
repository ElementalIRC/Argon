import AbstractCommand from '@/commands/AbstractCommand';

class Join extends AbstractCommand {
    static get name() {
        return 'join';
    }

    run() {
        if (this.arguments.all.length < 2) {
            return false;
        }

        const target = this.arguments.first;

        this.ipc.send('channel-connection-attempt', target);

        return true;
    }
}

export default Join;
