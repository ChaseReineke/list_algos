class SLL {
    constructor() {
        this.head = null;
    }

    // return true or false if this.head is null
    isEmpty() {
        if (this.head) {
            return true;
        } else {
            return false;
        }
    }

    // add given node to the head, if it exists. return void
    addToFront(node) {
        node.next = this.head; // set the new node's next to the head
        this.head = node; // move the head to the new node
    }

    // createa  new node with given data, add it to the head. return void
    addDataToFront(data) {
        var newNode = new Node(data); // create a new node with the data
        newNode.next = this.head; // set the new node's next to the head
        this.head = node; // move the head to the new node
    }
}

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

var node = new Node(10);
var mySLL = new SLL();

mySLL.addToFront(new Node(4));
mySLL.addToFront(new Node(6));


// var SLL = {
//     head: Node {
//         data: 4,
//         next: Node {
//             data: 6,
//             next: null
//         }
//     }
// }