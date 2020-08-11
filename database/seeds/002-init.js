exports.seed = function (knex) {
  const user = [
    {
      username: "test",
      password: "test",
      departnemt: "sales",

    },
    {
      username: "Rick",
      password: "Morty",
      department: "admin",
    },
  ];

  return knex("user")
    .insert(user)
    .then(() => console.log("== Seed data for roles table added."))
}  
