const { all } = require('../routes');
const noteService = require('../services/noteService');

module.exports = {
    ping: (req, res) => {
        return res.json({pong: true});
    },
    all: async (req, res) => {
        //"model" do resultado retornado
        let json = {error: '', result: []};

        let notes = await noteService.getAll();

        for(let i in notes){
            json.result.push({
                id: notes[i].id,
                title: notes[i].title
            });
        }

        return res.json(json);
    },
    one: async (req, res) => {
        let json = {error: '', result: {}};

        let id = req.params.id;
        let note = await noteService.findById(id);

        if(note){
            json.result = note;
        }

        return res.json(json);
    },
    new: async (req, res) => {
        let json = {error: '', result: {}};

        let title = req.body.title;
        let body = req.body.body;

        if (title && body){
            let noteId = await noteService.add(title, body);
            json.result = {
                id: noteId,
                title,
                body
            };
        }
        else{
            json.error = "Campos não enviados";
        }

        return res.json(json);
    },
    edit: async (req, res) => {
        let json = {error: '', result: {}};

        let id = req.params.id;
        let title = req.body.title;
        let body = req.body.body;

        if (id && title && body){
            
            await noteService.update(id, title, body);
            json.result = {
                id,
                title,
                body
            };
        }
        else{
            json.error = "Campos não enviados";
        }

        return res.json(json);
    },
    delete: async (req, res) => {
        let json = {error: '', result: {}};

        await noteService.delete(req.params.id);

        return res.json(json);
    },
};