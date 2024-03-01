console.log(helpers.init());
import { helpers } from '@/utils';

export const logisticsRoutes = [
    {
        path: '/dashboard-logistics',
        name: 'DashboardLogistics',
        component: () => import('@/views/Logistics/MainView.vue'),
        meta: {
            title: 'Dashboard',
            role: [helpers.roles.LOGISTICS]
        },
    },
    {
        path: '/stock',
        name: 'Stock',
        component: () => import('@/views/Logistics/StockView.vue'),
        meta: {
            title: 'Stock',
            requiresAuth: true,
            role: [helpers.roles.LOGISTICS, helpers.roles.SALES, helpers.roles.DS]
        },
    },
    {
        path: '/stock-informatique',
        name: 'StockInformatique',
        component: () => import('@/views/Logistics/StockInformatiqueView.vue'),
        meta: {
            title: 'Stock informatique',
            requiresAuth: true,
            role: [helpers.roles.LOGISTICS, helpers.roles.SALES, helpers.roles.DS]
        },
    },
    {
        path: '/fournitures',
        name: 'Fournitures',
        component: () => import('@/views/Logistics/FournituresView.vue'),
        meta: {
            title: 'Fournitures',
            requiresAuth: true,
            role: [helpers.roles.LOGISTICS, helpers.roles.SALES, helpers.roles.DS]
        },
    },
    {
        path: '/louer',
        name: 'Louer',
        component: () => import('@/views/Logistics/LouerView.vue'),
        meta: {
            title: 'Louer',
            requiresAuth: true,
            role: [helpers.roles.LOGISTICS, helpers.roles.SALES, helpers.roles.DS]
        },
    },
    {
        path: '/parc-gsm',
        name: 'ParcGsm',
        component: () => import('@/views/Logistics/ParcView.vue'),
        meta: {
            title: 'ParcGsm',
            requiresAuth: true,
            role: [helpers.roles.LOGISTICS, helpers.roles.SALES, helpers.roles.DS]
        },
    },
    {
        path: '/carte-carburant',
        name: 'CarteCarburant',
        component: () => import('@/views/Logistics/CarteCarburantView.vue'),
        meta: {
            title: 'Carte Carburant',
            requiresAuth: true,
            role: [helpers.roles.LOGISTICS, helpers.roles.SALES, helpers.roles.DS]
        },
    },
    {
        path: '/jawaz',
        name: 'Jawaz',
        component: () => import('@/views/Logistics/JawazView.vue'),
        meta: {
            title: 'Jawaz',
            requiresAuth: true,
            role: [helpers.roles.LOGISTICS, helpers.roles.SALES, helpers.roles.DS]
        },
    },
    {
        path: '/cachets',
        name: 'Cachets',
        component: () => import('@/views/Logistics/CachetsView.vue'),
        meta: {
            title: 'Cachets',
            requiresAuth: true,
            role: [helpers.roles.LOGISTICS, helpers.roles.SALES, helpers.roles.DS]
        },
    },
    {
        path: '/caisse',
        name: 'Caisse',
        component: () => import('@/views/Logistics/CaisseView.vue'),
        meta: {
            title: 'Caisse',
            requiresAuth: true,
            role: [helpers.roles.LOGISTICS, helpers.roles.SALES, helpers.roles.DS]
        },
    },
    {
        path: '/vehicules',
        name: 'Vehicules',
        component: () => import('@/views/Logistics/VehiculesView.vue'),
        meta: {
            title: 'Vehicules',
            requiresAuth: true,
            role: [helpers.roles.LOGISTICS, helpers.roles.SALES, helpers.roles.DS]
        },
    },
    {
        path: '/transports',
        name: 'Transports',
        component: () => import('@/views/Logistics/TransportView.vue'),
        meta: {
            title: 'Transports',
            requiresAuth: true,
            role: [helpers.roles.LOGISTICS, helpers.roles.SALES, helpers.roles.DS]
        },
    },
];
