const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());


server.get('/api/cohorts', async (req, res) => {

  try {
    const cohorts = await db('cohorts');
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// LIST BY ID

server.get('/api/cohorts/:id', async (req, res) => {

    try {
      const cohort = await db('cohorts')
        .where({ id: req.params.id })
        .first();
      res.status(200).json(cohort);
    } 
    
    catch (error) {
      res.status(500).json(error);
    }
  });

  server.get('/api/cohorts/:id/students', async (req, res) => {

    try {
      const cohort = await db('cohorts')

        .join("students", "cohorts.id", "=", "students.cohort_id")
        .select("cohorts.id", "cohorts.name", "students.name", "students.id")
        .where({ cohort_id: req.params.id })

      res.status(200).json(cohort);
    } 
    
    catch (error) {
      res.status(500).json(error);
    }
  });
  
  // CREATE

  server.post('/api/cohorts', async (req, res) => {
    try {
      const [id] = await db('cohorts').insert(req.body);
  
      const cohort = await db('cohorts')
        .where({ id })
        .first();
  
      res.status(201).json(cohort);
    } 
    
    catch (error) {
      res.status(500).json(error);
    }
  });
  
  // UPDATE

  server.put('/api/cohorts/:id', async (req, res) => {
    try {
      const count = await db('cohorts')
        .where({ id: req.params.id })
        .update(req.body);
  
      if (count > 0) {
        const cohort = await db('cohorts')
          .where({ id: req.params.id })
          .first();
  
        res.status(200).json(cohort);
      } 

      else {
        res.status(404).json({ message: 'Records not found' });
      }
    } 

    catch (error) {
      res.status(500).json(error);
    }
  });
  
  // De-activate Roles

  server.delete('/api/cohorts/:id', async (req, res) => {
    try {
      const count = await db('cohorts')
        .where({ id: req.params.id })
        .del();
  
      if (count > 0) {
        res.status(204).end();
      } 

      else {
        res.status(404).json({ message: 'Records not found' });
      }
    } 
    
    catch (error) {
      res.status(500).json(error);
    }
  });
  
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\nrunning on ${port}\n`));