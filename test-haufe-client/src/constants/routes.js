export const routes = [
    {
        path: '/',
        id: 'main',
        template: 'Page',
        exact: true
    },{
        path: '/content/:entity',
        id: 'dynamic',
        template: 'RecordsList',
        exact: true
    },{
        path: '*',
        id: 'notFound',
        template: 'NotFound',
        exact: false
    }
];
