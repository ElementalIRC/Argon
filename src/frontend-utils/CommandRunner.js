import { ipcRenderer } from 'electron';
import Msg from '@/commands/Msg';
import ArgumentParser from '@/frontend-utils/ArgumentParser';

class CommandRunner {
    constructor(ipc) {
        // Make IPC injectable, so we can mock it.
        this.irc = ipc ? ipc : ipcRenderer;

        this.commands = [
            Msg,
        ];
    }

    addCommand(cmd) {
        this.commands.push(cmd);
    }

    run(str) {
        const argumentParser = new ArgumentParser(str);
        if (!ArgumentParser.isCommand(str)) {
            return;
        }

        const name = argumentParser.command;
        for (let commandClass of this.commands) {
            const command = new commandClass(argumentParser, this.irc);
            if (command.name != name) {
                continue;
            }
            command.run();
        }
    }
}

export default CommandRunner;
