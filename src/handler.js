const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const cratedAt = new Date().toISOString();
  const updateAt = cratedAt;

  const newNote = {
    title, tags, body, id, cratedAt, updateAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      massage: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    massage: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const note = notes.filter((n) => n.id === id)[0];
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editNoteByHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updateAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== 1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updateAt,
    };

    const response = h.response({
      status: 'success',
      massage: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    massage: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteNoteByHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== 1) {
    notes.splice(index, 1);

    const response = h.response({
      status: 'success',
      massage: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    massage: 'Gagal menghapus catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByHandler, deleteNoteByHandler,
};
