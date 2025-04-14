export default {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],  // Node compatibility
      '@babel/preset-react',  // For JSX
      '@babel/preset-typescript',  // For TypeScript
    ],
  };