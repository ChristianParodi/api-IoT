import express from 'express';
import db from './db/useFirebase'
import { Timestamp } from "firebase/firestore"
import { format } from "date-fns"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.get('/select/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const result = []

    if (isNaN(id)) {
        res.json({ "error": `'${req.params.id}' is not a number` });
        return;
    }

    db.collection("children")
        .where("child_id", "==", id)
        .orderBy("data", "desc")
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                const data = doc.data();
                data.data = format(data.data.toDate(), "dd/MM/yyyy HH:mm:ss"); // Localize dates
                result.push(data);
            })
            res.json(result);
        });
});

app.post("/insert", async (req, res) => {
    const body = req.body;

    const child = {
        child_id: body.child_id,
        nome: body.nome,
        cognome: body.cognome,
        tipo: body.tipo,
        data: Timestamp.fromDate(new Date(body.data)) // LA DATA DEVE ESSERE INSERITA IN FORMATO yyyy-MM-dd HH:mm:ss
    };

    db.collection("children")
        .add(child)
        .then(() => res.json({ "status": true, "result": "record inserted" }))
        .catch(err => console.error(err));
})

app.listen(PORT, () => console.log(`listening at port ${PORT}`));