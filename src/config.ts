const NODE_ENV = import.meta.env.VITE_NODE_ENV;
const DEVELOPMENT_SERVER = import.meta.env.VITE_DEVELOPMENT_SERVER;
const PRODUCTION_SERVER = import.meta.env.VITE_PRODUCTION_SERVER;

export const baseUrl = NODE_ENV === 'production'
        ? PRODUCTION_SERVER
        : DEVELOPMENT_SERVER