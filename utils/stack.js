class Stack {
    constructor() {
        this.stack = [];
    }

    push(item) {
        this.stack.push(item);
    }

    pop() {
        return this.stack.pop();
    }

    isEmpty() {
        return this.stack.length === 0;
    }

    getHistory() {
        return this.stack;
    }
}

module.exports = Stack;
