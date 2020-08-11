exports.up = function (knex) {
    return knex.schema
        .createTable("user", tbl => {
            tbl.increments();
            tbl.string("username", 128).notNullable().unique()
            tbl.string("password", 256).notNullable();
            tbl.string("depeartment", 128).notNullable();
        })
};

exports.down = function (knex) {
    return knex.schema.droptTableIfExists("user")
};