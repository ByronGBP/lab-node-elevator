
class Elevator {
  constructor(){
    this.floor = 0;
    this.MAXFLOOR = 10;
    this.requests = [];

    this.direction = 0;
    this.nextFloor = 0;
    this.waitingList = [];
    this.passengers = [];

    this.timer = null;
  }

  start() {
    if (!this.timer){
      this.nextFloor = this.requests.shift();
      console.log(this.nextFloor);
      this.timer = setInterval(() => this.update(), 1000);
    }
  }

  stop() {
    if (this.timer){
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  update() {
    this._updateFloor();
    this.log();
   }

   _updateFloor() {
     if (this.timer){
       if (this.nextFloor !== this.floor){
         if(this.nextFloor < this.floor){
           this.floorDown();
         }
         else if (this.nextFloor > this.floor) {
           this.floorUp();
         }
       }
       else {
         this._checkPassengers();
         if (this.requests.length > 0){
           this.nextFloor = this.requests.shift();
         }
         else{
           this.stop();
         }
       }
     }
   }

   _checkPassengers() {
     if (this.waitingList.length > 0){
       this.waitingList.forEach((person, index) => {
         if (person.originFloor === this.floor){
           this._passengersEnter(person, index);
         }
       });
     }

     if(this.passengers.length > 0){
       this.passengers.forEach( (person, index) => {
         if (person.destinationFloor === this.floor) {
           this._passengersLeave(person, index);
         }
       });
     }
   }

  _passengersEnter(person, i) {
    this.passengers.push(person);
    this.waitingList.splice(i, 1);
    console.log(`${person.name} just enter!`);
    this.requests.push(person.destinationFloor);
   }

  _passengersLeave(person, i) {
    console.log(`${person.name} just leave!`);
    this.passengers.splice(i,1);
  }

  floorUp() {
    if(this.floor < this.MAXFLOOR){
      this.floor += 1;
    }
  }

  floorDown() {
    if (this.floor > 0){
      this.floor -= 1;
    }
   }

  call(person) {
    this.waitingList.push(person);
    this.requests.push(person.originFloor);
    if(!this.timer){
      this.start();
    }
  }

  log() {
    console.log(this.floor, this.direction);
  }
}

var newElevator  =  new Elevator();

module.exports = Elevator;
