module.exports = class Bank {

  constructor() {

    this.inquirer = require('inquirer')
    this.chalk = require('chalk')

    this.fs = require('fs')
  }
  operation() {
    this.inquirer
      .prompt([
        {
          type: 'rawlist',
          name: 'action',
          message: 'O que você deseja fazer?',
          choices: [
            'Criar Conta',
            'Sair',
          ],
        },
      ])
      .then((answer) => {
        const action = answer['action']

        //console.log  
        switch (action) {
          case 'Criar Conta':
            this.createAccount()
            break;
          case 'Sair':
            console.log(this.chalk.bgMagenta.white(' Até mais, obrigado por utilizar a aplicação XPTO '))
            process.exit()
            break;
          default:
            break;
        }
      })
  }
  createAccount() {
    console.log(this.chalk.green.bold("Informações da Conta Bancaria"))

    this.buildAccount()
  }
  buildAccount() {
    this.inquirer
      .prompt([
        { name: 'registration', message: 'Qual o número da conta?' },
        { name: 'n1', message: 'Qual o saldo inicial?' },
      ])
      .then((answers) => {

        // Armazenar no arquivo
        if (!this.fs.existsSync('bank')) {
          this.fs.mkdirSync('bank')
        }

        // Gravar no final
        this.saveFile(answers)

        console.log(this.chalk.green('Conta criada com sucesso!'))
        this.operation()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  saveFile(answers) {
    let dataJSON
    let data

    if (!this.fs.existsSync("bank/registrations.json")) {
      data = `[{"registration":${answers.registration}, "n1":${answers.n1}}]`
    } else {
      dataJSON = this.fs.readFileSync("bank/registrations.json", 'utf8')
      data = JSON.parse(dataJSON)
      data.push({ 'registration': parseInt(answers.registration), 'n1': parseFloat(answers.n1) })
      data = JSON.stringify(data)
    }

    this.fs.writeFileSync(
      "bank/registrations.json",
      data,
      function (err) {
        console.log(err)
      },
    )
  }
}
