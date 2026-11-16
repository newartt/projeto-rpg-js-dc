const bobo = { nome: "Bobo da corte", ATQ: 5, DEF: 3 }
const anao = { nome: "Anão", ATQ: 3, DEF: 5 }
const cavaleiro = { nome: "Cavaleiro", ATQ: 4, DEF: 4 }

function lutar(jogador, inimigo) {
  alert(`${inimigo.nome} apareceu na sua frente!\nVida: ${inimigo.vida} | ATQ: ${inimigo.ATQ}`)

  while (jogador.vida > 0 && inimigo.vida > 0) {
    const sorteado = Math.floor(Math.random() * 6) + 1
    let acertou = false
    let tentativas = 3

    while (tentativas > 0 && !acertou) {
        const palpite = Number(prompt(`Você prepara o ataque! Adivinhe o número do dado (1 a 6).\nTentativas restantes: ${tentativas}`))
        if (!Number.isInteger(palpite) || palpite < 1 || palpite > 6) {
            alert("Número inválido! Digite um número inteiro de 1 a 6.")
        } else if (palpite === sorteado) {
            acertou = true
        } else {
        tentativas--
        }
    }

    let dano = jogador.ATQ
    if (acertou) {
      dano = jogador.ATQ * 2
      alert(`Você acertou o dado (${sorteado})! Golpe crítico: ${dano} de dano em ${inimigo.nome}!`)
    } else {
      alert(`Você errou! O número era ${sorteado}. Seu golpe causa ${dano} de dano.`)
    }
    inimigo.vida -= dano

    if (inimigo.vida <= 0) {
      break
    }

    const danoRecebido = Math.max(1, inimigo.ATQ - jogador.DEF)
    jogador.vida -= danoRecebido
    alert(`${inimigo.nome} contra-ataca! Você perde ${danoRecebido} de vida.\nSua vida: ${Math.max(0, jogador.vida)} | Vida do inimigo: ${Math.max(0, inimigo.vida)}`)
  }
}

let jogando = confirm("Deseja começar o jogo?")

while (jogando) {
  let jogador = null
  while (jogador === null) {
    const escolha = prompt(
      "Qual personagem você quer ser?\n" +
      "1 - Bobo da corte (ATQ 4 | DEF 2)\n" +
      "2 - Anão (ATQ 2 | DEF 4)\n" +
      "3 - Cavaleiro (ATQ 3 | DEF 3)"
    )
    if (escolha === "1") {
      jogador = { ...bobo, vida: 25 }
    } else if (escolha === "2") {
      jogador = { ...anao, vida: 29 }
    } else if (escolha === "3") {
      jogador = { ...cavaleiro, vida: 27 }
    } else {
      alert("Opção inválida! Digite 1, 2 ou 3.")
    }
  }
  alert(`Você escolheu o ${jogador.nome}.`)

// Saida do castelo
  alert("FASE 1\nO rei te chama ao salão do trono e te manda em uma missão fora do castelo.")
  alert("Você pega suas coisas, atravessa o portão e deixa o castelo para trás.")

  let caminho = ""
  while (caminho !== "1" && caminho !== "2") {
    caminho = prompt("Do lado de fora, a estrada se divide em dois caminhos.\n1 - Floresta\n2 - Caverna\nQual caminho quer escolher?")
  }

  let inimigos
  if (caminho === "1") {
    alert("Você respira fundo e entra na floresta. As árvores bloqueiam a luz do sol.")
    inimigos = [
      { nome: "Cobra pequena", vida: 10, ATQ: 3 },
      { nome: "Cobra venenosa", vida: 16, ATQ: 5 },
      { nome: "Cobra gigante", vida: 26, ATQ: 7 }
    ]
  } else {
    alert("Você acende uma tocha e entra na caverna. O ar é frio e úmido.")
    inimigos = [
      { nome: "Lobo cinza", vida: 11, ATQ: 3 },
      { nome: "Lobo vermelho", vida: 17, ATQ: 5 },
      { nome: "Lobisomen", vida: 28, ATQ: 7 }
    ]
  }

  let i = 0
  while (i < inimigos.length && jogador.vida > 0) {
    alert(`FASE ${i + 2}\nVocê segue em frente, atento a qualquer barulho`)
    lutar(jogador, inimigos[i])

    if (jogador.vida > 0) {
      alert(`Você derrotou ${inimigos[i].nome}! Sua vida: ${jogador.vida}`)
    }
    i++
  }

// Chegou na vila
  if (jogador.vida > 0) {
    alert("FASE 5\nCansado, mas vitorioso, saindo da caverna você vê luzes ao longe: é uma vila!")
    alert("Você chega na vila que o rei pediu. Sua missão está cumprida. FIM!")
    jogando = confirm("Quer jogar de novo?")
  } else {
    alert("Suas forças acabam e você cai no chão... Você foi derrotado.")
    jogando = confirm("Quer tentar de novo?")
  }
}
