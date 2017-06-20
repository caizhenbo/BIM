//index.js
//获取应用实例
var app = getApp();
Page({
  STANDARD: 22,
  rules: [
    [18.5, 24, 28],
    [18.5, 25, 30, 35, 40],
    [18.5, 23, 25, 30]
  ],
  ruleConfig: ['偏瘦', '正常', '偏胖', '肥胖', '重度肥胖', '极重度肥胖'],
  dangerConfig: ['低（但其它疾病危险性增加）', '平均水平', '增加', '中度增加', '严重增加', '非常严重增加'],
  data: {
    array: ['中国标准', '国际标准', '亚洲标准'],
    index: 0,
    score: 0,
    height: 0,
    weight: 0,
    physicalCondition: '未知',
    weightStandard: 0,
    danger: '未知',
    charLt: '<'
  },
  onLoad: function () {

  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindKeyHightInput: function (e) {
    this.setData({
      height: e.detail.value
    })
  },
  bindKeyWeightInput: function (e) {
    this.setData({
      weight: e.detail.value
    })
  },
  calculateBtn: function (e) {
    if (!this.data.height) {
      wx.showToast({
        title: '请输入身高'
      })
      return false;
    }

    if (!this.data.weight) {
      wx.showToast({
        title: '请输入体重'
      })
      return false;
    }
    this.calculate();
    this.weightStandardCalculate();
    this.physicalConditionCalculate();
  },
  //计算IBM值
  calculate: function () {
    let score = 0;
    let height = this.data.height / 100;
    score = (this.data.weight / (height * height)).toFixed(1);
    this.setData({
      score: score
    })
  },
  //计算标准体重
  weightStandardCalculate: function () {
    let weight = 0;
    let height = this.data.height / 100;
    weight = (this.STANDARD * (height * height)).toFixed(1);
    this.setData({
      weightStandard: weight
    })
  },
  //身体状况计算
  physicalConditionCalculate: function () {
    let rule = this.rules[this.data.index];
    let value = 0;
    let score = + this.data.score;
    let length = rule.length;
    if (score >= rule[length - 1]) {
      value = length;
    } else {
      for (let length = rule.length, i = length; i >= 1; --i) {
        if (score < rule[i] && score >= rule[i - 1])
          value = i;
      }
    }

    this.setData({
      physicalCondition: this.ruleConfig[value]
    })

    this.setData({
      danger: this.dangerConfig[value]
    })
  }
})
