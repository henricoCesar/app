const {select, input, checkbox} = require('@inquirer/prompts')

let mensagem = "Bem-vindi app de Metas";

let meta = {
    value: "Tomar 3l de agua por dia.",
    checked: false,
}

let metas = [meta]

const cadastrarMetas = async () => {
    const meta = await input({message: "digite metas: "})


if(meta.length == 0) {
   mensagem ="a meta não pode ser vazia."
   return
}
   metas.push(
    {value: meta, checked: false}
   )
    
   mensagem = ("Meta cadastrada com sucesso!!")
    
}

const listarMetas = async () => {
   const respostas = await checkbox ({
    message: "Use a sesta para mudas de metas, espaço para marcar desmarca e o enter pata finalizar",
    choices: [...metas],
    instructions:false,
   })
    
   metas.forEach((m) => {
    m.checked = false
})

   if(respostas.length == 0){
    mensagem = "nenhuma meta selesionada!"
    return
   }

   respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
    return m.value == resposta
     })

     meta.checked = true
   })

   mensagem = "Meta(s) marcadas como conclúida(s)"

}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
       return meta.checked
    })

    if (realizadas.length == 0 ) {
        mensagem = "Não existe metas realizadas :("
        return
    }
    
    await select({
        message: "metas realizadas: " + realizadas.length,
        choices: [...realizadas]
    })

} 

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if (abertas.length == 0 ){
        mensagem = "não exitem metas em abertas :)"
        return
    }

    await select({
        message:"Metas Abertas: " + abertas.length,
        choices: [...abertas]
    })

}

const deletarMetas = async () => {
    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked: false}
    })
    const itemADeletar = await checkbox ({
        message: "Use item para deletar ",
        choices: [...metasDesmarcadas],
        instructions:false,
       })

     if(itemADeletar.length == 0 ) {
        console.log("nenhum intem a deletar ")
        return
     }

     itemADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
        return meta.value != item 
        })

        mensagem = "Meta(s) deletas com sucesso"

     })

}

const motrasMensagem = () => {
    console.clear();
  
    if (mensagem != "" ){
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }

}

const start = async() => {

    while(true){
        
        motrasMensagem()

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
                    name: "metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "metas abertas",
                    value: "abertas"
                },
                {
                    name: "deletar metas",
                    value: "deletar"
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
                break
            case "listar":  
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()  
                break 
            case "abertas":
                await metasAbertas() 
                break  
            case "deletar":
                await deletarMetas()  
                break    
            case "sair":
                console.log("ate a proxima!")
                return  
        }
    }
}

start()