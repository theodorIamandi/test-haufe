export const routes = [
    {
        path: '/',
        id: 'main',
        template: 'RecordsList',
        protected: true,
        exact: true
    },{
        path: '/register',
        id: 'register',
        template: 'Page',
        protected: false,
        exact: false
    },{
        path: '/content/:entity',
        id: 'dynamic',
        template: 'Page',
        protected: true,
        exact: false
    }
];
