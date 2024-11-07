const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize app
const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/taskmanager', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Task Schema
const taskSchema = new mongoose.Schema({
    title: String,
    desc: String,
    date: String,
    priority: String,
    completed: { type: Boolean, default: false }
});

const Task = mongoose.model('Task', taskSchema);

// API Routes
app.get('/api/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
    const newTask = new Task(req.body);
    await newTask.save();
    res.json(newTask);
});

app.delete('/api/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

