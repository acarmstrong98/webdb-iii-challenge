exports.seed = function(knex, Promise) {

    return knex('students').truncate()
      .then(function () {

        return knex('students').insert([
          {name: 'John', cohort_id: 2},
          {name: 'Doe', cohort_id: 3},
          {name: 'Jane', cohort_id: 3}
        ]);
      });
  };