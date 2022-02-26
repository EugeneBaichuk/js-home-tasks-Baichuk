'use strict';

function interviewQuestion(name) {
  return function (profession) {
    switch (profession) {
      case 'designer':
        return name + " can you please explain what UX design is?";
      case 'teacher':
        return 'What subject do you teach ' + name + '?';
      default:
        return 'Hello ' + name + ', what do you do?';
    }
  };
}

console.log(interviewQuestion('John')('designer'));