# Alura - Javascript Avançado

Projeto do curso Javascript avançado I: ES6, orientação a objeto e padrões de projetos

Aula 1  - Prólogo: regras, código e manutenção

Aula 2 - Especificando uma Negociação

Aula 3 - A ligação entre as ações do usuário e o modelo


---

## Modelo
É convenção utilizar o *underscore* para os atributos das classes. Porém os mesmos continuam sendo acessíveis.

Uma solução é usar o Object.freeze(this), porém o mesmo congela apenas no primeiro nível, ou seja, se um atributo da classe possuir métodos que alterem o mesmo, ainda será possível acessá-los.

Um jeito é usar programação defensiva. Quando for retorna o atributo para leitura, retorne uma nova instância e quando for setar crie uma nova instânica para setar.

```
construtor(data){
	this._data = new Date(data.getTime());
} 

get data() { return new Date(this._data.getTime()); }
```

Outro ponto importante é trocar o *var* pelo *let* quando for declarar variáveis, pois *let* permite um escopo de bloco.

---
## Spread operator
O spread operator permite que um objeto iterável, como array ou string, seja expandandido em locais onde argumentos sejam esperados. 

```
new Date(...this._inputData.value.split('-').map((item, indice) =>  item - indice %2));
```