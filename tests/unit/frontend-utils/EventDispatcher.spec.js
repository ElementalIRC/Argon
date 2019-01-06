import { expect } from 'chai';
import EventDispatcher from '@/frontend-utils/EventDispatcher';

describe('EventDispatcher', function() {
    describe('on()', function() {
        it('Adds an event to the events library.', function() {
            EventDispatcher.on('test-event', data => {});
            expect(EventDispatcher.events).to.have.key('test-event');
        });

        it ('Runs the event when triggered.', function() {
            let testData = null;
            EventDispatcher.on('test-event', data => testData = data);
            EventDispatcher.emit('test-event', 'stuff');
            expect(testData).to.equal('stuff');
        });
    });

    describe('emit()', function() {
        it('Returns false when there the key is not in events.', function() {
            expect(
                EventDispatcher.emit('nothing', 'value')
            ).to.be.false;
        });

        it('Returns true when the event has run.', function() {
            EventDispatcher.on('test-event', data => {});
            expect(
                EventDispatcher.emit('test-event', 'stuff')
            ).to.be.true;
        });
    });
});
