
export const SIGN_IN: string = '/signin';
export const SIGN_UP: string = '/signup';
export const DASHBOARD: string = '/dashboard';
export const PROFILE: string = '/profile';
export const METRICS: string = '/metrics';
export const WELLNESS: string = '/wellness';
// export const RECIPE_CREATE: string = '/recipes/create';
// export const RECIPE_EDIT: string = '/recipes/edit';

export const RECIPES: 
    {INDEX: string,  
    MAIN: string,
    CREATE: string,
    EDIT: string} 
={
    INDEX: 'recipes/*',
    MAIN: '/',
    CREATE: '/create',
    EDIT: '/edit/:id'
}