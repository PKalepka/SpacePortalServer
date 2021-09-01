module.exports = {
  name: 'asteroid',
  columns: {
    id: {
      primary: true,
      type: 'integer',
      isGenerated: true,
      generationStrategy: 'increment',
    },
    reference_id: {
      type: 'text',
    },
    name: {
      type: 'text',
    },
    is_potentially_hazardous: {
      type: 'boolean',
    },
    date: {
      type: 'date',
    },
    nasa_jpl_url: {
      type: 'text',
    },
  },
};
