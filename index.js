const express = require("express");

const server = express();


server.use(express.json());

const tasks = [
    {
        id: 1,
        title: "Teste",
        description: "Oi",
        completed: false,
    }
]

//Retorna todas as tarefas
server.get('/tasks', (req, res) =>{
    return res.json(tasks)
});


//Retorna uma tarefa
server.get('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const task = tasks.find(task => task.id === parseInt(id));
  
    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    return res.json(task);
});


//Cria uma nova tarefa
server.post('/tasks', (req, res) => {
    const {id, title} = req.body;
    if (!id || !title) {
        return res.status(400).json({ error: 'Está faltando o ID ou o título.' });
    }else{
        const NovaTask = {
            id: req.body.id,
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed,
          };
        tasks.push(NovaTask);
        return res.json(tasks);
    }
})

//Atualiza uma tarefa

server.put('/tasks/:index', (req, res) => {
    const { index } = req.params;
    const task = tasks.find(task => task.id === parseInt(index));

    if (task) {
      if (!req.body.title || !req.body.id) {
        return res.status(400).json({ error: 'Está faltando o ID ou o título.' });
      }else{
        task.id = req.body.id;
        task.title = req.body.title;
        task.description = req.body.description || task.description;
        task.completed = req.body.completed || task.completed;
        res.json(task);
      }
    } else {
      res.status(404).json({ error: 'A tarefa existe.' });
    }
})

//  Deletar uma tarefa
server.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
    if (taskIndex < 0) {
        return res.status(404).json({ error: 'A tarefa não existe.' });
    } else {
        tasks.splice(taskIndex, 1);
        return res.json({ message: 'A tarefa foi excluida com sucesso.' });
    }
})

server.listen(8080);