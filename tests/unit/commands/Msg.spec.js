import { expect } from 'chai';
import IpcMock from '../mocks/IpcMock';
import ArgumentParser from '@/frontend-utils/ArgumentParser';
import Msg from '@/commands/Msg';

describe('Msg', function() {
    describe('.name', function() {
        it('Is "msg"', function() {
            expect(Msg.name).to.equal('msg');
        });
    });

    describe('.run()', function() {
        it('Sends target and message to IPC, then returns true.', function () {
            const ipc = new IpcMock();
            const msg = new Msg(
                new ArgumentParser('/msg #target message'),
                ipc
            );
            const result = msg.run();

            expect(result).to.be.true;
            expect([...ipc.sentArguments]).to.eql([
                'message-sent', false, '#target', 'message'
            ]);

        });

        it('Returns false if the command does not contain a target and message.', function() {
            const msg = new Msg(
                new ArgumentParser('/msg #target'), // no message
                new IpcMock()
            );
            expect(msg.run()).to.be.false;
        })
    });
});
