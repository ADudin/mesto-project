export default class Section {
  constructor({items, renderer}, selectorContainer)  {

    this._arrayCards = items;
    this._renderer = renderer;
    this._container = document.querySelector(selectorContainer);
    //console.log(this._arrayCards)

  }

  
  setCard(card){
    this._container.append(card);
  }
  
  clear(){
    this._container.innerHTML = '';
  }

  prependItem(card){
    this._container.prepend(card)
  }

  renderCards(items) {
    this.clear();
//console.log(items)

    items.forEach(item => {
       this._renderer(item);


    })

  }

};