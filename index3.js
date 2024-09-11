const {select, input} = require('@inquirer/prompts')

let meta = {
    value: "Tomar 3l de agua por dia.",
    checked: false,
}

let metas = [meta]

const cadastrarMetas = async () => {
    const meta = await input({message: "digite metas: "})


if(meta.length == 0) {
   console.log("a meta não pode ser vazia.")
   return
}
   metas.push(
    {value: meta, checked: false}
)
}



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
                await cadastrarMetas()
                console.log(metas)
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