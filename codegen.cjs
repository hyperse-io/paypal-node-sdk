module.exports = {
  overwrite: true,
  config: {
    strict: true,
    namingConvention: {
      enumValues: 'keep',
    },
    skipTypeNameForRoot: true,
    dedupeFragments: true,
    inlineFragmentTypes: 'combine',
    scalars: {
      ID: 'string | number',
      Money: 'number',
    },
    maybeValue: 'T',
  },
  generates: {
    'src/generated-admin-types.ts': {
      schema: 'http://localhost:7001/admin-api',
      plugins: [
        {
          add: {
            content: '/* eslint-disable */',
          },
        },
        'typescript',
      ],
    },
    'src/generated-shop-types.ts': {
      schema: 'http://localhost:7001/shop-api',
      plugins: [
        {
          add: {
            content: '/* eslint-disable */',
          },
        },
        'typescript',
      ],
    },
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
};
