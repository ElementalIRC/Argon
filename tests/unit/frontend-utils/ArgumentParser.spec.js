import { expect } from 'chai';
import ArgumentParser from '@/frontend-utils/ArgumentParser';

describe('ArgumentParser', function() {
    let parser = null;
    beforeEach(function() {
        parser = new ArgumentParser('/command first second third fourth fifth sixth seventh eighth ninth tenth');
    });

    describe('.isCommand()', function() {
        it('Is true if the string is a command.', function() {
            expect(ArgumentParser.isCommand('/msg user message')).to.be.true;
        });

        it('Is false if the string is not a command', function() {
            expect(ArgumentParser.isCommand('regular message')).to.be.false;
        });

        it('Is false if the command is blank, but there\'s a slash.', function() {
            expect(ArgumentParser.isCommand('/ arg')).to.be.false;
        });
    });

    describe('.command', function() {
        it('Gets the command.', function() {
            expect(parser.command).to.equal('command');
        });
    });

    describe('.all', function() {
        it('Gets all the arguments.', function() {
            expect(parser.all).to.deep.equal([
                'command', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth',
            ]);
        });
    });

    describe('.nth()', function() {
        it('Gets the nth element of args.', function() {
            expect(parser.nth(1)).to.equal('first');
        });

        it('Returns null if element doesn\'t exist.', function() {
            expect(parser.nth(11)).to.be.null;
        });
    });

    describe('.range()', function() {
        it('Gets all args after start index.', function() {
            expect(parser.range(8)).to.deep.equal([
                'eighth', 'ninth', 'tenth'
            ]);
        });

        it('Gets range between two indexes.', function() {
            expect(parser.range(1, 3)).to.deep.equal([
                'first', 'second'
            ]);
        });

        it('Returns all for no args', function() {
            expect(parser.range()).to.deep.equal(parser.all);
        });
    });

    describe('compiledRange()', function() {
        it('Gets a range and turns it into a space-separated string.', function() {
            expect(parser.compiledRange(1, 3)).to.equal('first second');
        });
    });

    describe('message()', function() {
        it('Gets the message starting at arg index.', function() {
            expect(parser.message(7)).to.equal('seventh eighth ninth tenth');
        });
    });

    describe('.first', function() {
        it('Returns the first argument.', function() {
            expect(parser.first).to.equal('first');
        });
    });

    describe('.second', function() {
        it('Returns the second argument.', function() {
            expect(parser.second).to.equal('second');
        });
    });

    describe('.third', function() {
        it('Returns the third argument.', function() {
            expect(parser.third).to.equal('third');
        });
    });

    describe('.fourth', function() {
        it('Returns the fourth argument.', function() {
            expect(parser.fourth).to.equal('fourth');
        });
    });

    describe('.fifth', function() {
        it('Returns the fifth argument.', function() {
            expect(parser.fifth).to.equal('fifth');
        });
    });

    describe('.sixth', function() {
        it('Returns the sixth argument.', function() {
            expect(parser.sixth).to.equal('sixth');
        });
    });

    describe('.seventh', function() {
        it('Returns the seventh argument.', function() {
            expect(parser.seventh).to.equal('seventh');
        });
    });

    describe('.eighth', function() {
        it('Returns the eighth argument.', function() {
            expect(parser.eighth).to.equal('eighth');
        });
    });

    describe('.ninth', function() {
        it('Returns the ninth argument.', function() {
            expect(parser.ninth).to.equal('ninth');
        });
    });

    describe('.tenth', function() {
        it('Returns the tenth argument.', function() {
            expect(parser.tenth).to.equal('tenth');
        });
    });
});
