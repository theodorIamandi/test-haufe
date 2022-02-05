export const routes = [
    {
        path: '/',
        id: 'main',
        template: 'RecordsList',
        dynamic: false,
        protected: true,
        exact: true
    },{
        path: '/register',
        id: 'register',
        template: 'Page',
        dynamic: false,
        protected: false,
        exact: true
    },{
        path: '/content/:entity',
        id: 'dynamic',
        template: 'Page',
        dynamic: true,
        protected: true,
        exact: true
    },{
        path: '*',
        id: 'notFound',
        template: 'NotFound',
        dynamic: false,
        protected: false,
        exact: false
    }
];
