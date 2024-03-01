import { api } from '@/utils';
import { usePMStore, useSalesStore } from '@/store';

const getPurchaseOrders = async (type: string) => {
    try {
        const response = await api().get('/purchase/get/' + type);
        const salesStore = useSalesStore();
        salesStore.setPurchaseOrders(response.data.purchases);
    } catch (error) {
        return Promise.reject(error);
    }
};


const getPurchaseOrdersByProjectManager = async (type: string) => {
    try {
        const response = await api().get('/purchase/get-by-project-manager/' + type);
        const salesStore = useSalesStore();
        salesStore.setPurchaseOrders(response.data.purchases);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getPurchaseOrderById = async (id: number) => {
    try {
        const response = await api().get('/purchase/get-purchase-order/' + id);
        const salesStore = useSalesStore();
        salesStore.setPurchase(response.data.order);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getBonDeCommande = async () => {
    try {
        const response = await api().get('/logistics/bon-commande/');
        const salesStore = useSalesStore();
        salesStore.setBonDeCommande(response.data.bonCommandes);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getFacturesClient = async () => {
    try {
        const response = await api().get('/facture/client/get');
        const salesStore = useSalesStore();
        salesStore.setInvoices(response.data.factures);
    } catch (error) {
        return Promise.reject(error);
    }
};

const createPurchaseOrder = async (data: any) => {
    try {
        const response = await api().post('/purchase/create', data);
        const pmStore = usePMStore();
        pmStore.pushPurchaseOrder(response.data.purchase);
    } catch (error) {
        return Promise.reject(error);
    }
};

const createExecutionOrder = async (data: any) => {
    try {
        const response = await api().post('/purchase/execution', data);
        const pmStore = usePMStore();
        pmStore.pushPurchaseOrder(response.data.purchase);
    } catch (error) {
        return Promise.reject(error);
    }
};

const editArticle = async (id: number, data: any) => {
    try {
        const response = await api().post('/purchase/edit-articles/' + id, data);
        const pmStore = usePMStore();
        pmStore.updateProjectArticle(response.data.article);
    } catch (error) {
        return Promise.reject(error);
    }
};



export default {
    getPurchaseOrders,
    getBonDeCommande,
    getFacturesClient,
    getPurchaseOrdersByProjectManager,
    getPurchaseOrderById,
    createPurchaseOrder,
    createExecutionOrder,
    editArticle
};