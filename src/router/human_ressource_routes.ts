import { helpers } from '@/utils';

export const hrRoutes = [
    {
        path: '/dashboard-rh',
        name: 'DashboardRH',
        component: () => import('@/views/HumanRessources/MainView.vue'),
        meta: {
            title: 'Dashboard',
            role: [helpers.roles.RH]
        },
    },
    {
        path: '/employees',
        name: 'Employees',
        component: () => import('@/views/HumanRessources/EmployeesView.vue'),
        meta: {
            title: 'Employés',
            role: [helpers.roles.RH]
        },
    },

    {
        path: '/employees/profile/:id',
        name: 'ProfileEmployee',
        component: () => import('@/views/HumanRessources/ProfileEmployeeView.vue'),
        props: true,
        meta: {
            title: 'Profil de l\'employé',
            role: [helpers.roles.RH]
        },
    },
    {
        path: '/pointage',
        name: 'Pointage',
        component: () => import('@/views/HumanRessources/PointageView.vue'),
        meta: {
            title: 'Pointage',
            role: [helpers.roles.RH]
        },
    },
    {
        path: '/soustraitant',
        name: 'Soustraitant',
        component: () => import('@/views/HumanRessources/SoustraitantView.vue'),
        meta: {
            title: 'Soustraitant',
            role: [helpers.roles.RH]
        },
    },
    {
        path: '/interns',
        name: 'Interns',
        component: () => import('@/views/HumanRessources/InternsView.vue'),
        meta: {
            title: 'Stagiaires',
            role: [helpers.roles.RH]
        },
    },
    {
        path: '/leaves',
        name: 'Leaves',
        component: () => import('@/views/HumanRessources/LeaveView.vue'),
        meta: {
            title: 'Congés',
            role: [helpers.roles.RH]
        },
    },
    {
        path: '/documents',
        name: 'DocumentsRH',
        component: () => import('@/views/HumanRessources/DocumentsView.vue'),
        meta: {
            title: 'Documents',
            role: [helpers.roles.RH]
        },
    },
    {
        path: '/recruitments',
        name: 'Recruitments',
        component: () => import('@/views/HumanRessources/RecruitmentView.vue'),
        meta: {
            title: 'Recrutements',
            role: [helpers.roles.RH]
        },
    },
    {
        path: '/demandes-rh',
        name: 'DemandesRH',
        component: () => import('@/views/HumanRessources/DemandesRhView.vue'),
        meta: {
            title: 'Demandes RH',
            role: [helpers.roles.RH]
        },
    },
    {
        path: '/contracts',
        name: 'Contracts',
        component: () => import('@/views/HumanRessources/ContratsView.vue'),
        meta: {
            title: 'Contrats',
            role: [helpers.roles.RH]
        },
    },
    {
        path: '/paie',
        name: 'Paie',
        component: () => import('@/views/HumanRessources/PaieView.vue'),
        meta: {
            title: 'Paie',
            role: [helpers.roles.RH]
        },
    },
    {
        path: '/salary-advance',
        name: 'SalaryAdvance',
        component: () => import('@/views/HumanRessources/SalaryAdvanceView.vue'),
        meta: {
            title: 'Avance sur salaire',
            role: [helpers.roles.RH]
        },
    },
];