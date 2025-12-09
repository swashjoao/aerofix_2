const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/drones", (req, res) => {
    db.all("SELECT * FROM drones", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err });
        res.json(rows);
    });
});

app.post("/drones", (req, res) => {
    const { modelo, problema, status, data_entrada, foto_url } = req.body;
    db.run(
        `INSERT INTO drones (modelo, problema, status, data_entrada, foto_url)
     VALUES (?, ?, ?, ?, ?)`,
        [modelo, problema, status, data_entrada, foto_url],
        function (err) {
            if (err) return res.status(500).json({ error: err });
            res.json({ id: this.lastID });
        }
    );
});

app.put("/drones/:id", (req, res) => {
    const { modelo, problema, status, data_entrada, foto_url } = req.body;
    db.run(
        `UPDATE drones
     SET modelo=?, problema=?, status=?, data_entrada=?, foto_url=?
     WHERE id=?`,
        [modelo, problema, status, data_entrada, foto_url, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err });
            res.json({ updated: this.changes });
        }
    );
});

app.delete("/drones/:id", (req, res) => {
    db.run(
        `DELETE FROM drones WHERE id=?`,
        [req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err });
            res.json({ deleted: this.changes });
        }
    );
});

app.listen(3000, () => {
    console.log("AeroFix backend rodando em http://localhost:3000");
});
