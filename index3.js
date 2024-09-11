const {select} = require('@inquirer/prompts')

const start = async() => {

    while(true){
        
        const opecao = await select ({
            message: "Menu >",
            choices: [
                {
                    name: "cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "vamos listar",
                    value: "listar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch(opecao) {
            case "cadastrar":
                console.log("vamos cadastrar")
                break
            case "vamos listar":  
                console.log("vamos listar")
                break
            case "sair":
                console.log("ate a proxima!")
                return  
        }
    }
}

start()