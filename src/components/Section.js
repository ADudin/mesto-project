export default class Section {
  constructor({items, renderer}, selectorContainer)  {
    this._arrayCards = items;
    this._renderer = renderer;
    this._container = document.querySelector(selectorContainer);
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

    items.forEach(item => {
      this.setCard(this._renderer(item));
    });
  }
};