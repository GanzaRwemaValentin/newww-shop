const express = require("express");
const bodyparser = require("body-parser");
const app = express();

app.use(bodyparser.json());

const mysql = require("mysql2");

app.get("/", (req, res) => {
    res.send("server is done");
});

app.listen(3000, () => {
    console.log("server pass port 3000");
});

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "v@@l33nt11n",
    database: "schooldb"
});

db.connect((err) => {
    if (err) {
        console.log("error in connection");
    } else {
        console.log("database is connected");
    }
});

app.post("/addstudent", (req, res) => {

    const { name, email } = req.body;

    const kgl = "INSERT INTO students(name,email) VALUES(?,?)";

    db.query(kgl, [name, email], (err, result) => {

        if (err) {
            res.send("you have error solve it");
        } else {
            res.send("Student data has been successfully saved.");
        }

    });

});

app.get("/students", (req, res) => {

    const kgl = "SELECT * FROM students";

    db.query(kgl, (err, result) => {

        if (err) {
            res.send("there is error we can't see students full information");
        } else {
            res.json(result);
        }

    });

});

app.put("/updatestudent/:id", (req, res) => {

    const id = req.params.id;
    const { name, email } = req.body;

    const kgl = "UPDATE students SET name=?, email=? WHERE id=?";

    db.query(kgl, [name, email, id], (err, result) => {

        if (err) {
            res.send("student not updated");
        } else {
            res.send("student updated successfully");
        }

    });

});

app.delete("/deletestudent/:id", (req, res) => {

    const id = req.params.id;

    const kgl = "DELETE FROM students WHERE id=?";

    db.query(kgl, [id], (err, result) => {

        if (err) {
            res.send("student not deleted");
        } else {
            res.send("student deleted successfully");
        }

    });

});
