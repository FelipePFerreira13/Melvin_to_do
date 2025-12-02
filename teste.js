console.log("hello")

const nums = [1,2,3,4,5];
const dobros = nums.map(num => num * 2)


const letras = ['a', 'b', 'c', 'd', 'e'];
const maiusculo = letras.map(letras => letras.toUpperCase())
console.log(maiusculo)

const personagens = [
  { nome: "Ichigo", sobrenome: "Kurosaki" },
  { nome: "Rukia", sobrenome: "Kuchiki" },
  { nome: "Renji", sobrenome: "Abarai" },
  { nome: "Byakuya", sobrenome: "Kuchiki" },
  { nome: "Toshiro", sobrenome: "Hitsugaya" },
  { nome: "Rangiku", sobrenome: "Matsumoto" },
  { nome: "Kenpachi", sobrenome: "Zaraki" },
  { nome: "Yoruichi", sobrenome: "Shihouin" },
  { nome: "Uryu", sobrenome: "Ishida" },
  { nome: "Sosuke", sobrenome: "Aizen" }
];

const nomesCompletos = personagens.map( nomeCompleto => `${nomeCompleto.nome} ${nomeCompleto.sobrenome}`)
console.log(nomesCompletos)