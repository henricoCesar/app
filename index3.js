const {select, input, checkbox} = require('@inquirer/prompts')

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

const listarMetas = async () => {
   const respostas = await checkbox ({
    message: "Use a sesta para mudas de metas, espaço para marcar desmarca e o enter pata finalizar",
    choices: [...metas],
    instructions:false,
   })
    
   if(respostas.length == 0){
    console.log("nenhuma meta selesionada!")
    return
   }

    metas.forEach((m) => {
        m.checked = false
    })

   respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
    return m.value == resposta
     })

     meta.checked = true
   })

   console.log("Meta(s) marcadas como conclúida(s)")

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
            case "listar":  
                await listarMetas()
                break
            case "sair":
                console.log("ate a proxima!")
                return  
        }
    }
}

start()