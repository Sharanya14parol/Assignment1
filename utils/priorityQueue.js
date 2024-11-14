class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(item) {
        if (this.isEmpty()) {
            this.queue.push(item);
        } else {
            let added = false;
            for (let i = 0; i < this.queue.length; i++) {
                if (item.priority < this.queue[i].priority) {
                    this.queue.splice(i, 0, item);
                    added = true;
                    break;
                }
            }
            if (!added) this.queue.push(item);
        }
    }

    dequeue() {
        return this.queue.shift();
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    getQueue() {
        return this.queue;
    }
}

module.exports = PriorityQueue;
