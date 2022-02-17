'use strict';

var john = {
  bills: [124, 48, 268, 180, 42],
  percentages: [0.2, 0.15, 0.1],
  tips: [],
  totalAmount: [],
  tipCalculator: function (perc) {
    this.bills.forEach((bill, i) => {
      if (bill < 50) {
        perc = this.percentages[0];
      } else if (bill >= 50 && bill < 200) {
        perc = this.percentages[1];
      } else {
        perc = this.percentages[2];
      }
      this.tips[i] = perc * bill;
      this.tips[i] = parseFloat(this.tips[i].toFixed(2));
      this.totalAmount[i] = this.tips[i] + this.bills[i];
    });
  }
};

john.tipCalculator();
console.log('John\'s tips: ' + john.tips);
console.log('John\'s final paid amounts: ' + john.totalAmount);