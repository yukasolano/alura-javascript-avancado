# Alura - Javascript Avançado

Projeto do curso Javascript avançado I: ES6, orientação a objeto e padrões de projetos

Aula 1  - Prólogo: regras, código e manutenção

Aula 2 - Especificando uma Negociação

Aula 3 - A ligação entre as ações do usuário e o modelo

Aula 4 - Lidar com data é trabalhoso? Chame um ajudante!

Aula 5 - Temos o modelo, mas e a view?

Aula 6 - Generalizando a solução da nossa View

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

get negociacoes(){
	return [].concat(this._negociacoes);
}
```

Outro ponto importante é trocar o *var* pelo *let* quando for declarar variáveis, pois *let* permite um escopo de bloco.

---
## Spread operator
O spread operator permite que um objeto iterável, como array ou string, seja expandandido em locais onde argumentos sejam esperados. 

```
new Date(...this._inputData.value.split('-').map((item, indice) =>  item - indice %2));
```

---
## Template strings 
Strings que permitem expressões.

```
`${data.getDate()}/${data.getMonth()+1}/${ data.getFullYear()}`
```

---

## Funcional

Uso do mapa:

```
${model.negociacoes.map((n) => `
	<tr>
		<td> ${DateHelper.dataParaTexto(n.data)} </td>
		<td> ${n.quantidade} </td>
		<td> ${n.valor} </td>
		<td> ${n.volume} </td>
	</tr>
	
`).join('')}
```

Uso do reduce:
```
${model.negociacoes.reduce((total, n ) => total + n.volume, 0.0)} 
```
