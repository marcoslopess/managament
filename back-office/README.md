<h3 align="center">
  Back-Office
</h3>

---

## 📋 Sobre

Esse é um projeto de uma automatização de envio de emails. O sistema executa o envio de emails para os clientes e prestadores selecionados em uma requisição feita diretamente na API do backend, onde aparece os serviços marcados para o proximo dia. 

---

##  🌎 Tecnologias 

- Node.JS
- Express.JS
- RESTFull API
- JSON
- Gmail Send
- Node Schedule

---
## 📁 Acessando o Projeto

Para acessar o projeto, execute o seguintes comandos no seu terminal de comando:

<h3>Instalando as dependencias:</h3>

```bash
    $ yarn install
```

Depois deve-se procurar o arquivo .env e colocar a URL do seu backend, que foi listado no terminal ao executá-lo, a hora e o minuto que vai ser enviado os emails, o email e a senha da conta que vai enviar o email automatico.

<h3>Executando o projeto:</h3>

```bash
    $ yarn start
```
Sugiro colocar as informações de teste da primeira vez, apenas para configurar a autenticação do email, pois o google sempre considera como uma atividade suspeita, conforme a imagem abaixo:

<h1 align="center">
    <img src="https://raw.githubusercontent.com/marcoslopess/managament/master/back-office/img/atividade.PNG" width="500">
</h1>

Para resolver esse problema, acesse o link:

https://myaccount.google.com/lesssecureapps 

e ative.

Pare o servidor do back-office e execute novamente com um novo horario de teste.

Pronto, seu back-office ja está funcionando. No seu terminal vai aparecer informações sobre os envios dos emails na hora que o serviço for executado.

---

<h3 align="center">🛠 Developed by Marcos Lopes 💻<h3>
