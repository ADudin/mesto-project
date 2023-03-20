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
  
  renderCards() {
    this.clear();

    this._arrayCards.forEach(item => {
      this._renderer(item);
    });
  }
};