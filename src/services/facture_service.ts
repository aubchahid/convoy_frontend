import { useFactureStore } from '@/store';
import { api } from '@/utils';


 async function get() {
    try {
        const FactureStore = useFactureStore();
        const response = await api().get('facture/get');
        if (response.status == 200) {
            FactureStore.setFacture(response.data);
            return response.data;
        }
    } catch (error) {
        console.log(error);
        return Promise.reject(error);

    }
}


 async function insert(req) {
    try {
        const FactureStore = useFactureStore();
        const response = await api().post('facture/insert', req);
        if (response.status == 200) {
            FactureStore.facture.push(response.data.facture);
            console.log(response.data);
            return response.data;
        }
    } catch (error) {
        console.log(error);
        return Promise.reject(error);

    }
}

 async function update( req) {
    try {
        // const FactureStore = useFactureStore();
        const response = await api().post('facture/update' , req);
        if (response.status == 200) {
            console.log(response.data);
            // let facture = FactureStore.facture.find((item) => item.id === id);
            // if (facture) {
            //     Object.assign(facture, response.data.facture);
            // }
            return response.data;
        } else {
            
        }
    } catch (error) {
        console.log(error);
        return Promise.reject(error);

    }
}

 async function Delete(id) {
    try {
       
        const response = await api().delete('facture/delete/' + id);
        if (response.status == 200) {
            console.log(response.data);
            
            return response.data;
        }
    } catch (error) {
        console.log(error);
        return Promise.reject(error);

    }
}

 async function getCompsByProjectId(id) {
    try {
        const FactureStore = useFactureStore();
        const response = await api().get('facture/comp/getCompsByProjectId/' + id);
        if (response.status === 200) {
            FactureStore.setComposants(response.data.factureComposent);
            return response.data.factureComposent;
        }
    } catch (error) {
        console.log(error);
        return Promise.reject(error);

        
    }
}

 async function insertComp(req) {
    try {
        
        const response = await api().post('facture/comp/store-attachement', req);
        if (response.status == 200) {
            
            console.log(response.data);
            return response.data;
        }
    } catch (error) {
        console.log(error);
        return Promise.reject(error);

    }
}

export default {
    get,
    insert,
    update,
    Delete,
    getCompsByProjectId,
    insertComp
}
