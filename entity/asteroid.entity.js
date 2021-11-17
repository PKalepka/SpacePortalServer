const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: 'asteroid',
  columns: {
    id: {
      primary: true,
      type: 'integer',
      isGenerated: true,
      generationStrategy: 'increment',
    },
    referenceId: {
      type: 'text',
    },
    name: {
      type: 'text',
    },
    isPotentiallyHazardous: {
      type: 'boolean',
    },
    date: {
      type: 'date',
    },
    nasaJplUrl: {
      type: 'text',
    },
  },
});
