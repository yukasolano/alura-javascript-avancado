class Negociacao {
    constructor(data, quantidade, valor){
        this._data = new Date(data.getTime()); //Programação defensiva
        this._quantidade = quantidade;
        this._valor = valor;
        Object.freeze(this);
    }

    get volume() {
        return this._quantidade * this._valor;
    }

    get data() { return new Date(this._data.getTime()); } //Programação defensiva
    get quantidade() { return this._quantidade; }
    get valor() { return this._valor; }

}