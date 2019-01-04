class ArgumentParser {
    constructor(str) {
        this.args = str.split(/\s/);
        this.args[0] = this.args[0].replace(/^\//, '');
    }

    static isCommand(command) {
        return command.match(/^\/([a-z0-9\-_]+)/i) != null;
    }

    get all() {
        return this.args;
    }

    get command() {
        return this.args[0].replace(/^\//, '');
    }

    get first() {
        return this.nth(1);
    }

    get second() {
        return this.nth(2);
    }

    get third() {
        return this.nth(3);
    }

    get fourth() {
        return this.nth(4);
    }

    get fifth() {
        return this.nth(5);
    }
    
    get sixth() {
        return this.nth(6);
    }

    get seventh() {
        return this.nth(7);
    }

    get eighth() {
        return this.nth(8);
    }

    get ninth() {
        return this.nth(9);
    }

    get tenth() {
        return this.nth(10);
    }

    nth(index) {
        return index in this.args ? this.args[index] : null;
    }

    range(start, finish) {
        if (!start) {
            return this.all;
        }
        if (start && !finish) {
            return this.args.slice(start);
        }
        
        return this.args.slice(start, finish);
    }

    compiledRange(start, finish) {
        return this.range(start, finish).join(' ');
    }

    message(start) {
        return this.compiledRange(start);
    }
}

export default ArgumentParser;
