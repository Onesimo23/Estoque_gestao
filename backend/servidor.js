const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed: " + err.message);
  } else {
    console.log("Connected to MySQL database");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/api/todos", (req, res) => {
  const query = "SELECT * FROM estoque";
  db.query(query, (err, rows) => {
    if (err) {
      console.error("Error fetching To-Do items:", err);
      res.status(500).send("Error fetching To-Do items");
    } else {
      res.json(rows);
    }
  });
});

app.delete("/api/todos/:id", (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM estoque WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting To-Do:", err);
      res.status(500).send("Error deleting To-Do");
    } else {
      res.send("To-Do deleted successfully");
    }
  });
});

app.put("/api/todos/:id", (req, res) => {
  const itemId = req.params.id;
  const { product,quantidade, price, description } = req.body;
  const query =
    "UPDATE estoque SET product = ?, quantidade = ?, price = ?, description = ? WHERE id = ?";
  db.query(
    query,
    [product, quantidade,price, description, itemId],
    (err, result) => {
      if (err) {
        console.error("Error updating To-Do:", err);
        res.status(500).send("Error updating To-Do");
      } else {
        res.send("To-Do updated successfully");
      }
    }
  );
});

// inserindo nova reserva
app.post("/api/todos", (req, res) => {
  const {product, quantidade, price, description } = req.body;
// Executar uma consulta SQL para inserir a nova reserva no banco de dados
  const query =
    "INSERT INTO estoque (product, quantidade, price, description) VALUES (?, ?, ?, ?)";
  db.query(
    query,
    [product, quantidade, price, description],
    (err, result) => {
      if (err) {
        console.error("Erro ao adicionar reserva:", err);
        res.status(500).send("Erro ao adicionar reserva");
      } else {
        // Retornar os dados da nova reserva
        const novaReserva = {
          id: result.insertId,
          product: product,
          quantidade: quantidade,
          price:price,
          description: description,
        };
        res.json(novaReserva);
      }
    }
  );
});


app.get("/user", (req, res) => {
  const query = "SELECT * FROM user";
  db.query(query, (err, rows) => {
    if (err) {
      console.error("Error fetching user data:", err);
      res.status(500).send("Error fetching user data");
    } else {
      res.json(rows);
    }
  });
});

app.delete("/user/:id", (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM user WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting user:", err);
      res.status(500).send("Error deleting user");
    } else {
      res.send("User deleted successfully");
    }
  });
});

app.put("/user/:id", (req, res) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;
  const query =
    "UPDATE user SET name = ?, email = ?, password = ? WHERE id = ?";
  db.query(query, [name, email, password, userId], (err, result) => {
    if (err) {
      console.error("Error updating user:", err);
      res.status(500).send("Error updating user");
    } else {
      res.send("User updated successfully");
    }
  });
});

app.post("/user", (req, res) => {
  const { name, email, password } = req.body;

  const query = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
  db.query(query, [name, email, password], (err, result) => {
    if (err) {
      console.error("Error adding user:", err);
      res.status(500).send("Error adding user");
    } else {
      const newUser = {
        id: result.insertId,
        name,
        email,
        password,
      };
      res.json(newUser);
    }
  });
});

// Login code
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Consulta SQL para verificar o usuário com o email e senha fornecidos
  const query = "SELECT * FROM user WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, rows) => {
    if (err) {
      console.error("Error during login:", err);
      // Retorne uma resposta de erro para o cliente, indicando que houve um problema durante o login
      return res.status(500).send("Error during login");
    }

    // Se houver um usuário correspondente, permita o login
    if (rows.length > 0) {
      res.status(200).send("Login successful");
    } else {
      // Se não houver correspondência, retorne uma resposta indicando que as credenciais são inválidas
      res.status(401).send("Invalid email or password");
    }
  });
});

const bcrypt = require("bcrypt");

// Rota para registrar um novo usuário
app.post("/user", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
    db.query(query, [name, email, hashedPassword], (err, result) => {
      if (err) {
        console.error("Error adding user:", err);
        res.status(500).send("Error adding user");
      } else {
        const newUser = {
          id: result.insertId,
          name,
          email,
        };
        res.json(newUser);
      }
    });
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).send("Error hashing password");
  }
});
