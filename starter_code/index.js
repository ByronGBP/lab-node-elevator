const Elevator = require('./elevator.js');
const Person = require('./person.js');


let byron = new Person("Byron", 0, 2);
let luis = new Person("Luis", 1, 7);
let markus = new Person("Markus", 2, 5);
let jennie = new Person("Jennie", 4, 9);
let tania = new Person("Tania", 7, 1);

let elevator = new Elevator();

elevator.call(byron);
elevator.call(luis);
elevator.call(markus);
elevator.call(jennie);
elevator.call(tania);
