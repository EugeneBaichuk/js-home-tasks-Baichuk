'use strict';

(function () {
  function THashStorage() {
    let values = {};

    this.addValue = function (key, value) {
      values[key] = value;
    };

    this.getValue = function (key) {
      if (key in values) {
        return values[key];
      } else {
        return false;
      }
    };

    this.deleteValue = function (key) {
      if (key in values) {
        delete values[key];
        return true;
      } else {
        return false;
      }
    };

    this.getKeys = function () {
      return Object.keys(values);
    };
  }

  var drinkStorage = new THashStorage();


  drinkStorage.addValue('мохито', {
    'напиток': 'мохито',
    'алкогольный': 'да',
    'рецепт приготовления': 'Положи в хайбол лайм 3 дольки и подави мадлером;\nВозьми мяту 10 листиков в одну руку и хлопни по ним другой рукой;\nПоложи мяту в хайбол, наполни бокал дробленым льдом доверху;\nДобавь сахарный сироп 15 мл и белый ром 50 мл;\nДолей содовую доверху и аккуратно размешай коктейльной ложкой;\nДосыпь немного дробленого льда;\nУкрась веточкой мяты и долькой лайма;'
  });

  drinkStorage.addValue('квас', {
    'напиток': 'квас',
    'алкогольный': 'нет',
    'рецепт приготовления': 'Нарезаем ржаной хлеб порционные кусочки, складываем на противень и помещаем в очень слабо разогретую духовку. Ждём когда хлеб слегка подрумянится и засушится.\nБерём хорошо промытую и высушенную стеклянную 3 - литровую банку, помещаем в неё наши сухари и заливаем крутым кипятком по плечики.Теперь добавляем 3 ст.л.сахара - песка и ждём, пока масса остынет.\nБерём стакан тёплой воды и всыпаем в неё сухие дрожжи.Когда в 3 - литровой банке остынет вода до температуры тела человека вливаем в неё дрожжевой раствор и перемешиваем. Затем накрываем3 - литровую банку с нашей смесью крышкой или блюдечком и ставим в какое - нибудь теплое место на двое суток.\nПо прошествии этого времени достаём нашу банку, убираем крышку и тщательно процеживаем получившийся квас через марлю или сито.Выливаем наш квас в бутылку, охлаждаем в холодильнике.'
  });

  var setBtn = document.getElementById('set-info');
  var getBtn = document.getElementById('get-info');
  var delBtn = document.getElementById('delete-info');
  var showListBtn = document.getElementById('info-list');
  var textList = document.querySelectorAll('.text--list-item');
  textList[0].textContent = 'Информация о напитках';

  setBtn.addEventListener('click', () => {
    var drinkName = prompt('Введите название напитка').toLowerCase() || 'неизвестный напиток';

    if (drinkName) {
      var alcohol = confirm('Содержит ли напиток алкоголь?');
      alcohol ? alcohol = 'да' : alcohol = 'нет';
      var receipt = prompt('Рецепт напитка') || 'рецепт отсутствует';
      drinkStorage.addValue(drinkName, {
        'напиток': drinkName,
        'алкогольный': alcohol,
        'рецепт приготовления': receipt
      });
    }
  });

  getBtn.addEventListener('click', () => {
    var drinkName = prompt('Введите название напитка');

    if (drinkStorage.getValue(drinkName)) {
      var text = drinkStorage.getValue(drinkName);
      var keys = Object.keys(text);
      var values = Object.values(text);

      textList.forEach((item, i) => {
        item.textContent = keys[i] + ': ' + values[i];
      });
    }
  });

  delBtn.addEventListener('click', () => {
    var drinkName = prompt('Введите название напитка, который необходимо удалить из списка');
    drinkStorage.deleteValue(drinkName);
  });

  showListBtn.addEventListener('click', () => {
    var text = "";

    drinkStorage.getKeys().forEach((item, i) => {
      if (i === drinkStorage.getKeys().length - 1) {
        text += item;
      } else {
        text += item + ", ";
      }
    });

    textList.forEach((item, i) => {
      i ? item.textContent = "" : item.textContent = text;
    });
  });
}());