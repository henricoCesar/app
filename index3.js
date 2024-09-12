const {select, input, checkbox} = require('@inquirer/prompts')

const fs = require("fs").promises

let mensagem = "Bem-vindi APP de Metas";

let metas

const carregarMetas = async () => {
   try{
       const dados = await fs.readFile("metas.json", "utf-8") 
       metas = JSON.parse(dados)
   }
   catch(erro){
    matas = []
   }
}

const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

carregarMetas()

const cadastrarMetas = async () => {
    const meta = await input({message: "Digite Metas: "})


if(meta.length == 0) {
   mensagem ="A meta não pode ser vazia."
   return
}
   metas.push(
    {value: meta, checked: false}
   )
    
   mensagem = ("Meta cadastrada com Sucesso!!")
    
}

const listarMetas = async () => {
    if(metas.length == 0 ) {
        mensagem = "Não existe metas!"
        return
    }

   const respostas = await checkbox ({
    message: "Use a sestas para mudas de metas, espaço para marcar/desmarca e o enter pata finalizar",
    choices: [...metas],
    instructions:false,
   })
    
   metas.forEach((m) => {
    m.checked = false
})

   if(respostas.length == 0){
    mensagem = "Menhuma meta Selesionada!"
    return
   }

   respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
    return m.value == resposta
     })

     meta.checked = true
   })

   mensagem = "Meta(s) marcada(s) como conclúida(s)"

}

const metasRealizadas = async () => {
    if(metas.length == 0 ) {
        mensagem = "Não existe metas!"
        return
    }

    const realizadas = metas.filter((meta) => {
       return meta.checked
    })

    if (realizadas.length == 0 ) {
        mensagem = "Não existe metas realizadas :("
        return
    }
    
    await select({
        message: "Metas realizadas: " + realizadas.length,
        choices: [...realizadas]
    })

} 

const metasAbertas = async () => {
    if(metas.length == 0 ) {
        mensagem = "Não existe metas!"
        return
    }

    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if (abertas.length == 0 ){
        mensagem = "Não exitem metas em abertas :)"
        return
    }

    await select({
        message:"Metas Abertas: " + abertas.length,
        choices: [...abertas]
    })

}

const deletarMetas = async () => {
    if(metas.length == 0 ) {
        mensagem = "Não existe metas!"
        return
    }

    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked: false}
    })
    const itemADeletar = await checkbox ({
        message: "Use item para deletar ",
        choices: [...metasDesmarcadas],
        instructions:false,
       })

     if(itemADeletar.length == 0 ) {
        console.log("Nenhum intem a deletar ")
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
    
     await carregarMetas()

    while(true){
        
        motrasMensagem()
        await salvarMetas()

        const opecao = await select ({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Vamos listar",
                    value: "listar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar metas",
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
                console.log("Até a proxima!")
                return  
        }
    }
}

start()