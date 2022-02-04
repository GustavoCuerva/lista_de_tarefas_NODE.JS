const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
//const { path } = require('express/lib/application');
const path = require('path');
var bodyParser = require('body-parser');

const app = express();

app.use( bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, 'views'));


var tarefas = ['Arrumar o quarto','Fazer compras'];

app.post('/', (req, res)=>{
    
    tarefas.push(req.body.tarefa);
    res.render('index', {tarefasList:tarefas});

})

app.get('/',(req, res)=>{

    res.render('index', {tarefasList:tarefas});

});

app.get('/deletar/:id', (req, res)=>{

    tarefas = tarefas.filter((val,index)=>{
        if(index != req.params.id){
            return val;
        }
    })

    res.render('index', {tarefasList:tarefas});
})

app.listen(5000, ()=>{
    console.log("rodando");
})