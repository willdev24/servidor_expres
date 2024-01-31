const express = require('express')
const path = require("path")
const fs = require("fs")

const app = express()

app.set("view engine", "ejs")//comando usado para importar o ejs

/*/definindo arquvos satiticos 
const staticFolder = path.join(__dirname,'viws')
const expressStatic = express.static(staticFolder)  //nao precisa exporta mais o arquivo assimquando se usa o ejs!!
app.use(expressStatic)
*/

//definindo arquivos publicos 
app.use(express.static(path.join(__dirname,'public'))) //essa é a forma mais comun encontrada


//habilitando meu servidor a receber informaçoes do navegadorvia post "formulario"
app.use(express.urlencoded({extended:true}))


//rotas
app.get('/', (req, res) =>{
    res.render('index', {
        title:"heii",
  
})

})

    //essa rota está buscando um arquivo FS "post.json" e dpois sendo importada na pagna do html/ejs
    app.get('/home', (req, res) =>{

        fs.readFile('./post.json', function(error,content){    

            if(error){
                console.log(error)
            }else{
                
        res.render("home", {
            title:"willao com d mudo",
           teste :JSON.parse((content))    
                })
            }
        })
    })
    
    
        app.get('/quem-somos',(req, res) =>{
            res.render("cadastro", {
                title:"willao com d mudo"
            }) 
        })

;
            app.get('/servicos',(req, res) =>{
               const{c}= req.query
                
               res.render("servicos", {
                    title:"gabriela rabuda gostosaa",
                    cadastrados: c,
                }) 
                
            })


            //metodo post apenas para o formulario
            app.post('/salvar-post',(req, res) =>{
                
                const{ nome_completo, idade, CPF} = req.body
                
            const date =  fs.readFileSync('./store/date.json')
            const posts = JSON.parse(date)          
                    
        posts.push({
            nome_completo,
            idade,
            CPF,    }) 
            
            const poststring =JSON.stringify(posts)
            fs.writeFileSync('./store/date.json', poststring)

            res.redirect('/servicos?c=1')
                
            })
            

                app.get('/contatos',(req, res) =>{
                    fs.readFile('./post.json', function(error,content){    

                        if(error){
                            console.log(error)
                        }else{
                    
                    res.render("contatos", {
                    title:"gabi gostosa",
                    teste :JSON.parse((content))
                    
                })
                        }
            
            
                    })
                    })
                
            


// rodando no servidor  
const port = process.env.PORT || 8080

app.listen(port, ()=> console.log(`servidor rodando na porta ${port}`))