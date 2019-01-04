import { expect } from 'chai';
import IpcMock from '../mocks/IpcMock';
import ArgumentParser from '@/frontend-utils/ArgumentParser';
import Join from '@/commands/Join';

describe('Join', function() {
    describe('.name', function() {
        it('Is "join"', function() {
            expect(Join.name).to.equal('join');
        });
    });

    describe('.run()', function() {
        it('Sends target to IPC, then returns true.', function () {
            const ipc = new IpcMock();
            const join = new Join(
                new ArgumentParser('/join #target'),
                ipc
            );
            const result = join.run();

            expect(result).to.be.true;
            expect([...ipc.sentArguments]).to.eql([
                'channel-connection-attempt', '#target'
            ]);

        });

        it('Returns false if the command does not contain a target', function() {
            const join = new Join(
                new ArgumentParser('/join'), // no message
                new IpcMock()
            );
            expect(join.run()).to.be.false;
        })
    });
});
