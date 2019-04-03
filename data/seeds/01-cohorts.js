exports.seed = function(knex, Promise) {

    return knex('cohorts').truncate()
      .then(function () {

        return knex('cohorts').insert([
          {name: 'webpt1'},
          {name: 'webpt2'},
          {name: 'webpt3'}
        ]);
      });
  };