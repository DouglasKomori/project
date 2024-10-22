import http from 'http'
import url, { URLSearchParams } from 'url'

const host = 'localhost'
const porta = 3000

function respoderRe(requisicao, resposta) {
  if (requisicao.method === 'GET') {
    const dados = new URLSearchParams(url.parse(requisicao.url).query)
    const tabuada = dados.get('tabuada')
    const sequencia = dados.get('sequencia') || 10

    resposta.setHeader('Content-Type', 'text/html')
    resposta.write('<!DOCTYPE html>')
    resposta.write('<html lang="pt-br">')
    resposta.write('<head>')
    resposta.write('<meta charset="UTF-8">')
    resposta.write('<title>Tabuada</title>')
    resposta.write(`
      <style>
        body {
          background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
          color: #00FFC6;
          font-family: 'Arial', sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          overflow: hidden;
        }
        div {
          background: rgba(0, 0, 0, 0.8);
          border: 2px solid #00FFC6;
          border-radius: 20px;
          padding: 20px;
          width: 350px;
          box-shadow: 0px 0px 15px 5px #00FFC6;
          animation: glow 2s infinite ease-in-out;
          text-align: center;
        }
        h1 {
          font-size: 24px;
          margin-bottom: 20px;
          color: #00FFC6;
        }
        p {
          font-size: 18px;
          margin: 10px 0;
          color: #E0FFFF;
        }
        @keyframes glow {
          0% { box-shadow: 0px 0px 15px 5px #00FFC6; }
          50% { box-shadow: 0px 0px 25px 10px #00FFC6; }
          100% { box-shadow: 0px 0px 15px 5px #00FFC6; }
        }
      </style>
    `)
    resposta.write('</head>')
    resposta.write('<body>')
    
    if (tabuada != null) {
      resposta.write('<div>')
      resposta.write(`<h1>Tabuada do ${tabuada} até ${sequencia}</h1>`)
      
      for (var i = 0; i <= sequencia; i++) {
        var res = tabuada * i
        resposta.write(`<p>${tabuada} x ${i} = ${res}</p>`)
      }
      resposta.write('</div>')
    } else {
      resposta.write("<h1>Digite na url https://project-lyart-zeta-98.vercel.app/?tabuada=um_numero&sequencia=um_numero </h1>")
    }

    resposta.write('</body>')
    resposta.write('</html>')
    resposta.end()
  }
}

const servidor = http.createServer(respoderRe)

servidor.listen(porta, host, () => {
  console.log('Servidor Funcionando!!')
})
