'use strict';

class Encyclopedia {
  constructor() {
    this.password = null;
    this.AjaxHandlerScript = "http://fe.it-academy.by/AjaxStringStorage2.php";
    this.startWrapper = document.getElementById('page');
    this.pHash = {};
    // this.pHash = {
    //   'Americano': 'Order this drink and you\'ll get a shot of espresso diluted with hot water.',
    //   'Black coffee': 'No frills here: Black coffee is made from plain ground coffee beans that are brewed hot. It\'s served without added sugar, milk, or flavorings.',
    //   'Cappuccino': 'This espresso-based drink is similar to a latte, but the frothy top layer is thicker. The standard ratio is equal parts espresso, steamed milk, and foam. It\'s often served in a 6 - ounce cup(smaller than a latte cup) and can be topped with a sprinkling of cinnamon.',
    //   'Espresso': 'Most people know that a shot of espresso is stronger than the same amount of coffee, but what\'s the difference, exactly ? There isn\'t anything inherently different about the beans themselves, but when beans are used to make espresso they\'re more finely ground, and they\'re brewed with a higher grounds-to-water ratio than what\'s used for coffee.The result is a thicker, more concentrated liquid with a bolder flavor.A single espresso is a one - ounce shot.It\'s also the base for popular coffee-shop drinks like lattes and cappuccinos.',
    //   'Latte': 'This classic drink is typically 1/3 espresso and 2/3 steamed milk, topped with a thin layer of foam, but coffee shops have come up with seemingly endless customizations. You can experiment with flavored syrups like vanilla and pumpkin spice or create a nondairy version by using oat milk. Skilled baristas often swirl the foam into latte art!',
    //   'Macchiato': 'A macchiato is a shot of espresso with just a touch of steamed milk or foam. In Italian, macchiato means "stained" or "spotted," so a caffè macchiato refers to coffee that\'s been stained with milk.',
    //   'Mocha Latte': 'This sweet twist on the latte is flavored with sugar and chocolate, usually in the form of cocoa powder, melted chocolate, or syrup.',
    //   'Cortado': 'This drink, which hails from Spain, is half espresso, half steamed milk. Unlike many Italian coffee drinks, it contains little to no foam. It\'s typically served in a 4.5 - ounce glass.',
    //   'Red Eye': 'When you need an extra caffeine boost, go for this two-in-one drink: It\'s coffee with a shot of espresso.',
    //   'Cold Brew': 'Cold brew is one of the biggest coffee trends of the last decade, and for good reason: It\'s made by slowly steeping coffee grounds over cool or room - temperature water, so it tastes smoother and less bitter than regular iced coffee, which is brewed hot.',
    //   'Frappuccino': 'Frappuccino is a line of blended iced coffee drinks sold by Starbucks. It consists of coffee or crème base, blended with ice and ingredients such as flavored syrups and usually topped with whipped cream and or spices. Frappuccinos are also sold as bottled coffee beverages in grocery stores, convenience stores and from vending machines.',
    //   'Frappe': 'This word can be used to describe a variety of coffee and espresso drinks that have been blended with ice. The slushy-like drinks often contain some kind of milk and a flavored syrup, plus a top layer of whipped cream.',
    //   'Iced Coffee': 'Is there anything better than a glass of iced coffee on a hot day (or any day, for that matter)? The simplest way to make it: Brew a regular cup of hot coffee, then cool it over ice. Add whatever milk and sweeteners you like.',
    //   'Mazagran': 'Mazagran (also called café mazagran, formerly spelled masagran) is a cold, sweetened coffee drink that originated in Algeria. Portuguese versions may use espresso, lemon, mint and rum, and Austrian versions are served with an ice cube and include rum. Sometimes a fast version is achieved by pouring a previously sweetened espresso in a cup with ice cubes and a slice of lemon. Mazagran has been described as "the original iced coffee".',
    //   'Iced Latte': 'The chilled version of a latte is simply espresso and milk over ice.',
    //   'Nitro Cold Brew': 'Cutting-edge coffee roasters developed this newer type of cold brew using techniques from the beer industry: It\'s infused with nitrogen bubbles, so it has a frothy, beer - like texture.Trendy coffee houses dispense nitro cold brew from taps, and you can buy it by the can from brands like RISE Brewing Co.and Starbucks.',
    //   'Flat White': 'Like the latte, this drink consists of espresso and steamed milk, but the ratio of espresso to milk is higher. Baristas also fold the milk as it steams, which creates a more velvety texture. The flat white has roots in Australia and New Zealand.'
    // };
    // this.insretAjaxString();
    // this.lockgetAjaxString();
    this.init();
  }
  init() {
    this.startWrapper.innerHTML = 'Загрузка... Спасибо за ожидание. Вы клевые';
    this.getAjaxString(this, this.renderNewState);
    window.onhashchange = () => {
      this.renderNewState();
    };
  }
  getAjaxString(self) {
    $.ajax({
      url: this.AjaxHandlerScript,
      type: 'POST',
      data: {
        f: 'READ',
        n: 'BAICHUK_ENCYCLOPEDIA',
      },
      cache: false,
      success: function (ResultH) {
        if (ResultH.error != undefined) {
          alert(ResultH.error);
        } else {
          self.pHash = JSON.parse(ResultH.result);
          self.renderNewState();
        }
      },
      error: this.errorHandler
    });
  }
  errorHandler(jqXHR, StatusStr, ErrorStr) {
    alert(StatusStr + ' ' + ErrorStr);
  }
  renderNewState() {
    let state = decodeURIComponent(location.hash.substr(1));

    if (state === '') {
      this.switchToFirst();
    } else {
      state = JSON.parse(state);
    }

    switch (state.page) {
      case 'first':
        this.renderFirstPage();
        break;
      case 'second':
        this.renderSecondPage();
        break;
      case (state.page):
        this.renderThirdPage(state.page);
        break;
    }
  }
  renderFirstPage() {
    this.startWrapper.innerHTML = `
      <div class="start-page">
        <p>Энциклопедия</p>
        <a id='startLink' href="#">список статей здесь</a>
      </div> 
    `;
    this.createStartBtn();
  }
  createStartBtn() {
    document.getElementById('startLink').addEventListener('click', (e) => {
      e.preventDefault();
      this.switchToSecond();
    });
  }
  renderSecondPage() {
    const articles = Object.keys(this.pHash);
    let view = '';
    const letters = "abcdefghigklmnopqrstuvwxyz".split('');
    letters.forEach(letter => {
      const letterPresent = articles.some(article => article.toLowerCase().startsWith(letter));
      if (letterPresent) {
        let letterContainer = '';
        letterContainer += `<h2>${letter.toUpperCase()}</h2><br>`;
        articles.forEach(article => {
          if (article.toLowerCase().startsWith(letter)) {
            letterContainer += `<a class="letter-link" href="#">${article}</a><br>`;
          }
        });
        view += `<div class="letter-container">${letterContainer}</div>`;
      }
    });
    this.startWrapper.innerHTML = `<div class="second-page">${view}</div>`;
    this.createArticlesBtns();
  }
  createArticlesBtns() {
    const links = document.querySelectorAll('.letter-link');
    Array.from(links, link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchToThird(e.target.innerText);
      });
    });
  }
  switchToFirst() {
    this.switchToState({
      page: 'first'
    });
  }
  switchToSecond() {
    this.switchToState({
      page: 'second'
    });
  }
  switchToThird(state) {
    this.switchToState({
      page: `${state}`
    });
  }
  switchToState(state) {
    location.hash = encodeURIComponent(JSON.stringify(state));
  }
  renderThirdPage(state) {
    let savedState = state;
    const articles = Object.keys(this.pHash);
    let container = '';
    articles.forEach(article => {
      container += `<a href="#" class="letter-link">${article}</a><br>`;
    });
    this.startWrapper.innerHTML = `
      <div class="third-page">
        <div class="side-menu">${container}</div>
        <div class="current-article">
          <h2>${savedState}</h2>
          <p>${this.pHash[savedState]}</p>
        </div>
      </div>
      `;
    this.createArticlesBtns();
  }
  // insertAjaxString() {
  //   $.ajax({
  //     url: this.AjaxHandlerScript,
  //     type: 'POST',
  //     data: {
  //       f: 'INSERT',
  //       n: 'BAICHUK_ENCYCLOPEDIA',
  //       v: JSON.stringify(this.pHash),
  //     },
  //     cache: false,
  //     error: this.errorHandler,
  //     success: function (ResultH) {
  //       if (ResultH.error != undefined) {
  //         alert(ResultH.error);
  //       } else {
  //         alert('success');
  //       }
  //     }
  //   });
  // }
  // lockgetAjaxString() {
  //   this.password = Math.random();
  //   $.ajax({
  //     url: this.AjaxHandlerScript,
  //     type: 'POST',
  //     data: {
  //       f: 'LOCKGET',
  //       n: 'BAICHUK_ENCYCLOPEDIA',
  //       p: this.password,
  //     },
  //     cache: false,
  //     success: () => {
  //       this.updateAjaxString();
  //     },
  //     error: this.errorHandler
  //   });
  // }
  // updateAjaxString() {
  //   $.ajax({
  //     url: this.AjaxHandlerScript,
  //     type: 'POST',
  //     data: {
  //       f: 'UPDATE',
  //       n: 'BAICHUK_ENCYCLOPEDIA',
  //       v: JSON.stringify(this.pHash),
  //       p: this.password,
  //     },
  //     cache: false,
  //     error: this.errorHandler,
  //     success: function (ResultH) {
  //       if (ResultH.error != undefined) {
  //         alert(ResultH.error);
  //       } else {
  //         console.log(ResultH);
  //       }
  //     }
  //   });
  // }
}

new Encyclopedia();