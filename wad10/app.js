const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

// ROOT (basic test)
app.get("/", (req, res) => {
    res.send("Server working");
});

// ================= CREATE =================
app.post("/students", async (req, res) => {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();

        res.json({
            message: "Student created",
            data
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ================= READ ALL =================
app.get("/students", async (req, res) => {
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        res.json(data);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ================= READ ONE =================
app.get("/students/:id", async (req, res) => {
    try {
        const response = await fetch(`${BASE_URL}/${req.params.id}`);
        const data = await response.json();
        res.json(data);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ================= UPDATE =================
app.put("/students/:id", async (req, res) => {
    try {
        const response = await fetch(`${BASE_URL}/${req.params.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();

        res.json({
            message: "Student updated",
            data
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ================= DELETE =================
app.delete("/students/:id", async (req, res) => {
    try {
        await fetch(`${BASE_URL}/${req.params.id}`, {
            method: "DELETE"
        });

        res.json({
            message: "Student deleted"
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ================= SERVER =================
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});