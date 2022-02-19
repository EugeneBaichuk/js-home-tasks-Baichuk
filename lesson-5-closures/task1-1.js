'use strict';

function Person(bills, percentages, paymentSumms) {
  this.percentages = percentages;
  this.bills = bills;
  this.paymentSumms = paymentSumms;
  var tips = [];
  var totalAmount = [];
  this.calcTips = function (percentage) {
    bills.forEach((bill, i) => {
      if (bill < paymentSumms[0]) {
        percentage = percentages[0];
      } else if (bill >= paymentSumms[0] && bill < paymentSumms[1]) {
        percentage = percentages[1];
      } else {
        percentage = percentages[2];
      }
      tips[i] = percentage * bill;
      tips[i] = parseFloat(tips[i].toFixed(2));
      totalAmount[i] = tips[i] + bills[i];
    });
    return [tips, totalAmount];
  };
}

var john = new Person([124, 48, 268, 180, 42], [0.2, 0.15, 0.1], [50, 200]);
console.log('John\'s tips: ' + john.calcTips()[0] + '\n' + 'John\'s final paid amounts: ' + john.calcTips()[1]);

var mark = new Person([77, 375, 110, 45], [0.2, 0.1, 0.25], [100, 300]);
console.log('Mark\'s tips: ' + mark.calcTips()[0] + '\n' + 'Mark\'s final paid amounts: ' + mark.calcTips()[1]);

var johnUpdate = new Person([124, 48, 268, 180, 42], [0.2, 0.1, 0.25], [100, 300]);
console.log('New John\'s tips: ' + johnUpdate.calcTips()[0] + '\n' +
  'New John\'s final paid amounts: ' + johnUpdate.calcTips()[1]);

function calcAverageTips(tipsArr) {
  var tipSum = 0;
  tipsArr.forEach(value => {
    tipSum += value;
  });
  var averageTips = tipSum / tipsArr.length;
  return parseFloat(averageTips.toFixed(2));
}

var johnAvgTip = calcAverageTips(john.calcTips()[0]);
var markAvgTip = calcAverageTips(mark.calcTips()[0]);
var johnNewAvgTip = calcAverageTips(johnUpdate.calcTips()[0]);

var avgTipSums = [johnAvgTip, markAvgTip, johnNewAvgTip];
var msgs = [
  'John\'s family paid the highest tips on average. Average tip is: ',
  'Mark\'s family paid the highest tips on average. Average tip is: ',
  'John\'s family paid the highest tips on average, when new tipping rules applied. Average tip is: '
];

var biggestAvgTip = 0;
for (var key of avgTipSums) {
  if (biggestAvgTip < key) {
    biggestAvgTip = key;
  }
}

for (var key in avgTipSums) {
  if (biggestAvgTip === avgTipSums[key]) {
    console.log(msgs[key] + ' ' + avgTipSums[key]);
  }
}