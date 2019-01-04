class AbstractCommand {
    constructor(args, ipc) {
        this.arguments = args;
        this.ipc = ipc;
    }

    name() {}
    run() {}
}

export default AbstractCommand;
