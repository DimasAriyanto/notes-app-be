const routes = (handler) => [
  {
    method: 'POST',
    path: '/export/notes',
    handler: handler.postExortNotesHandler,
    options: {
      auth: 'notesapp_jwt',
    },
  },
];

module.exports = routes;
