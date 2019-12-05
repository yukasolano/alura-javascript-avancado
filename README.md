# Alura - Javascript Avançado

Este projeto consiste nos seguintes cursos da Alura:

## Curso Javascript avançado I: ES6, orientação a objeto e padrões de projetos

Aula 1  - Prólogo: regras, código e manutenção

Aula 2 - Especificando uma Negociação

Aula 3 - A ligação entre as ações do usuário e o modelo

Aula 4 - Lidar com data é trabalhoso? Chame um ajudante!

Aula 5 - Temos o modelo, mas e a view?

Aula 6 - Generalizando a solução da nossa View

## Curso Javacript avançado II: ES6, orientação a objetos e padrões de projetos

Aula 1 - Como saber quando o modelo mudou?

Aula 2 - Existe modelo mentiroso? O padrão de projeto Proxy!

Aula 3 - E se alguém criasse nossos proxies? O Padrão de Projeto Factory

Aula 4 - Importando negociações
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

## REST operator
O REST operator permite passar ma lista de argumentos no lugar de um array para um método.
```
constructor(model, view, ...props) {
	let proxy = ProxyFactory.create(model, props, model => 
		view.update(model)
	);
	view.update(model);
	return proxy;
}
	
this._listaNegociacoes = new Bind(new ListaNegociacoes(), this._negociacoesView, 'adiciona', 'esvazia');
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
---
## this

O this de uma função é dinâmico, isto é, seu valor é determinado no momento em que a função é chamada. Como o this é dinâmico, é possível usar artifícios da linguagem, como a API Reflect, para alterá-lo se assim desejarmos.

O this de uma arrow function é léxico, isto é, seu valor é determinado no local onde a arrow function for definida, ela não cria um novo this. O this de uma arrow function não pode ser alterado, mesmo se usarmos recursos da linguagem, como a API Reflect.

---
## Padrão de projeto Proxy

Proxies são do que objetos mentirosos que encapsulam outros. Pense em proxies como "cascas" que envolvem objetos. Dentro desse contexto, só podemos "tocar" os objetos encapsulados passando pelo proxy. É justamente essa característica que torna o uso desse padrão de projeto tão poderoso.

```
this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {
	get(target, prop, receiver) {
		if(['adiciona', 'esvazia'].includes(prop) && typeof(target[prop] == typeof(Function))) {
			return function() {
				console.log(`interceptando ${prop}`);
				Reflect.apply(target[prop], target, arguments);
				self._negociacoesView.update(target);
			}  
		}
		return Reflect.get(target, prop, receiver);
	}
});
```
---
## AJAX
```
obterNegociacoesDaSemana(cb) {
	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'negociacoes/semana');

	xhr.onreadystatechange = () => {
		if(xhr.readyState == 4) {
			if(xhr.status == 200) {
				cb(null, JSON.parse(xhr.responseText)
				.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
			} else {
				console.log(xhr.responseText);
				cb('Não foi possível obter as negociações');
			}
		}
	};
	xhr.send();
}

negociacoService.obterNegociacoesDaSemana((erro, negociacoes) => {
	if(erro) {
	   this._mensagem.texto = erro;
	   return; 
	}

	negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
	this._mensagem.texto = 'Negociações importadas com sucesso'
})
```

---
## Padrão Promise

```
obterNegociacoesDaSemana() {
	return new Promise((resolve, reject) => {
		this._http.get('negociacoes/semana')
		.then(resp => resolve(resp.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))))
		.catch(erro => {
			console.log(erro);
			reject('Não foi possível obter as negociações da semana');
		});
	});
}
```