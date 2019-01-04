import { expect } from 'chai';
import CommandRunner from '@/frontend-utils/CommandRunner';
import AbstractCommand from '@/commands/AbstractCommand';

class TestCommand extends AbstractCommand {
    static hasRun = false;

    get name() {
        return 'test';
    }

    run() {
        TestCommand.hasRun = true;
    }
}

describe('CommandRunner', function() {
    let runner = null;
    beforeEach(function() {
        runner = new CommandRunner();
    });

    describe('.addCommand()', function() {
        it('Adds a command to the commands list.', function() {
            const len = runner.commands.length;
            runner.addCommand({});
            expect(runner.commands.length).to.equal(len+1);
        });
    });

    describe('.run()', function() {
        it('Runs a command.', function() {
            runner.addCommand(TestCommand);
            runner.run('/test message');
            expect(TestCommand.hasRun).to.be.true;
        });

        it ('Does nothing if str isn\'t a command.', function() {
            runner.run('nothing');
        });

        it ('Does nothing if command is not found.', function() {
            runner.run('/unknown');
        });
    });
});
