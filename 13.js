// DLLNodes have a .next and .prev
class DLLNode {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

// DLL [4, 9, 3, 2, 5, 10, 7, 22]
// pivot 5

// [4, 3, 2] left
// [9, 10, 7, 22] right

// [4, 3, 2, 5, 9, 10, 7, 22] output

// return a new DLL with the values partitioned by the pivot
// so that all nodes with values lower than pivot are to the left
// and all nodes with values higher than pivot are to the right
// DLL contains numeric integer values
// no duplicates.. but... what if?
// bonus points return the same DLL
function partition(DLL, pivot) {
    // current to head
    var current = DLL.head;
    // set six pointers, for the front and back of three new 'lists'
    var lesserHead, lesserTail, greaterHead, greaterTail, equalHead, equalTail;

    // loop the entire list
    while (current) {
        // duplicates and also centering val
        if (current.data === pivot) {
            // if the first in the equal list
            if (!equalHead) {
                equalHead = current;
                equalTail = current;
            } else {
                // otherwise
                equalTail.next = current;
                equalTail = equalTail.next;
            }
            // lesser head
        } else if (current.data < pivot) {
            if (!lesserHead) {
                lesserHead = current;
                lesserTail = current;
            } else {
                lesserTail.next = current;
                lesserTail = lesserTail.next;
            }
            // greater head
        } else if (current.data > pivot) {
            if (!greaterHead) {
                greaterHead = current;
                greaterTail = current;
            } else {
                greaterTail.next = current;
                greaterTail = greaterTail.next;
            }
        }
        // move current
        current = current.next;
    }

    // snip the tail of the greaters so it doesn't reference
    if (greaterTail) greaterTail.next = null;

    // if nothing is equal, give back the partition anyway
    if (!equalHead) {
        lesserTail.next = greaterHead;
        // don't forget to move the head
        DLL.head = lesserHead;
        DLL.tail = greaterTail;
        return DLL;
    }

    // otherwise tie them all together
    lesserTail.next = equalHead;
    equalTail.next = greaterHead;
    // don't forget to move the head
    DLL.head = lesserTail;
    DLL.tail = greaterTail;
    return DLL;
}

// DLLists have both a .head and .tail pointer
class DLList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // == Main Methods ==

    // return true or false if value exists
    exists(val) {
        var forwardRunner = this.head;
        var backwardRunner = this.tail;
        var count = Math.ceil(this.length / 2);
        while (count) {
            if (forwardRunner.data === val || backwardRunner.data === val) {
                return true;
            }
            forwardRunner = forwardRunner.next;
            backwardRunner = backwardRunner.prev;
            count--;
        }
        return false;
    }

    // reverse a doubly linked list
    reverse() {
        var runner = this.head;
        if (runner === null) return;
        if (runner === this.tail) return;

        while (runner) {
            var temp = runner.next;
            runner.next = runner.prev;
            runner.prev = temp;
            runner = temp;
        }

        var temp = this.head;
        this.head = this.tail;
        this.tail = temp;
    }

    // return true of false if the current DLL is a palindrome
    checkPalindrome() {
        var count = Math.floor(this.length / 2);
        var forwardRunner = this.head;
        var backwardRunner = this.tail;
        if (this.length === 1) {
            return true;
        }

        while (count) {
            if (forwardRunner.data !== backwardRunner.data) {
                return false;
            }
            forwardRunner = forwardRunner.next;
            backwardRunner = backwardRunner.prev;
            count--;
        }
        return true;
    }


    // remove and return the first node with data === val, if it exists
    removeVal(val) {
        var runner = this.head;

        if (!runner) {
            return runner;
        }

        // remove head and tail
        if (runner === this.tail && runner.data === val) {
            this.head = null;
            this.tail = null;
            this.length--;
            return runner;
        }

        // remove just head
        if (runner.data === val) {
            this.head = runner.next;
            this.head.prev = null;
            runner.next = null;
            this.length--;
            return runner;
        }

        while (runner) {
            // remove runner
            if (runner.data === val) {
                // remove runner at tail
                if (runner === this.tail) {

                    // return this.removeTail();
                    this.tail = runner.prev;
                    runner.prev.next = null;
                    runner.prev = null;
                    length--;
                    return runner;
                }
                runner.prev.next = runner.next;
                runner.next.prev = runner.prev;
                runner.next = null;
                runner.prev = null;
                this.length--;
                return runner;
            }
            runner = runner.next;
        }

        // return null
    }

    // add node before target if target exists
    // target is a node data
    prependClean(target, node) {
        var runner = this.head;
        while (runner) {
            if (runner.data === target) {
                node.next = runner;
                node.prev = runner.prev;
                runner.prev.next = node;
                runner.prev = node;
                this.length++;
                if (runner === this.head) {
                    this.head = node;
                }
                return;
            } else {
                runner = runner.next;
            }
        }
    }

    prepend(target, node) {
        if (this.head !== null) { // Must have at least one node
            var curNode = this.head;
            if (curNode.data === target) { // Edge case: first node only
                node.next = curNode; // Connect nodes
                curNode.prev = node;
                this.head = node; // Move this.head to new node
                this.length++;
            } else {
                while (curNode.next !== null) {
                    curNode = curNode.next; // Move to next node
                    if (curNode.data === target) {
                        // Link this new node to the others
                        node.next = curNode;
                        node.prev = curNode.prev;
                        // Link other nodes to this new node
                        curNode.prev.next = node;
                        curNode.prev = node;
                        this.length++;
                        break; // Exit while loop assuming only before first instance of target
                    }
                }
            }
        }
    }

    // push to head
    addHead(node) {
        if (!this.head) { // empty list
            this.head = node;
            this.tail = node;
        } else {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
        }
        this.length++;
    }

    // pop from tail
    removeTail() {
        if (this.head == null) return; // empty list
        if (this.head === this.tail) { // one node
            var temp = this.tail;
            this.head = null;
            this.tail = null;
            this.length--;
            return temp;
        }
        var temp = this.tail;
        this.tail = temp.prev;
        this.tail.next = null;
        temp.prev = null;
        this.length--;
        return temp;
    }

    // return is empty
    isEmpty() {
        return this.head === null;
    }

    // return length
    size() {
        return this.length;
    }

    // == Bonus Methods, just inverted versions of the first set ==

    // push to tail
    addTail(node) {}

    // add after target if exists
    append(target, node) {}

    // pop from head
    removeHead() {}
}