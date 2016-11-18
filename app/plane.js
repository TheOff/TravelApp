function Plane(){};

Plane.prototype.takeoff = function takeoff(callback) {
 setTimeout(function() {
   callback()
   console.log('Took off');
 }, 600);
};
Plane.prototype.closeChassis = function closeChassis(callback) {
 setTimeout(function() {
   callback()
   console.log('Chassis closed');
 }, 1000);
};
Plane.prototype.turnOnAutoPilot = function turnOnAutoPilot(callback) {
 setTimeout(function() {
   callback()
   console.log('Autopilot turned on');
 }, 750);
};
Plane.prototype.flyToDestination = function flyToDestination(callback) {
 setTimeout(function() {
   callback()
   console.log('Flown to destination');
 }, 2000);
};
Plane.prototype.openChassis = function openChassis(callback) {
 setTimeout(function() {
   callback()
   console.log('Chassis open');
 }, 500);
};
Plane.prototype.land = function land(callback) {
 setTimeout(function() {
   callback()
   console.log('Landed');
 }, 3000);
};
//DONT MODIFY ANYTHING ABOVE HERE

// START ADD YOUR CODE HERE

Plane = normalize(Plane);

function normalize(cls) {
  cls.prototype.queue = [];
  cls.prototype.running = false;

  for (var name in cls.prototype) {
    if (cls.prototype.hasOwnProperty(name)) {
      normalizeMethod(cls, name);
    }
  }

  cls.prototype.onEnd = function() {
    var self = this;
    var step;

    if (self.queue.length) {
      step = self.queue.shift();
      step.method && step.method.call(self, function() {
        step.callback && step.callback();
        self.onEnd();
      });
    } else {
      self.running = false;
    }
  };

  return cls;
}

function normalizeMethod(cls, name) {
  var method = cls.prototype[name];

  if (typeof method !== 'function') {
    return;
  }

  cls.prototype[name] = function(callback) {
    var self = this;

    if (self.running) {
      self.queue.push({
        method: method,
        callback: callback
      });
    } else {
      self.running = true;

      method.call(self, function() {
        callback && callback();
        self.onEnd();
      });
    }

    return this;
  };
}

var plane = new Plane();

// END ADD YOUR CODE HERE

//DONT MODIFY ANYTHING BELOW HERE
console.log("Expected Output:")
console.log("Took off");
console.log("Chassis closed");
console.log("Autopilot turned on");
console.log("Flown to destination");
console.log("Chassis open");
console.log("Landed");

console.log("\n\nActual Output:")
plane.takeoff().closeChassis().turnOnAutoPilot().flyToDestination().openChassis().land();
