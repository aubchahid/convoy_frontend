<script setup lang="ts">
import { ref, watch } from 'vue';
import { Modal } from '@/ui';
import { rhService } from '@/services';
import { useToast } from 'vue-toastification';

const toast = useToast();

const isLoading = ref(false);

const props = defineProps({
    id: {
        type: Object,
        required: true,
    },
    oldRib: {
        type: Number,
        required: true,
    },
    oldBank: {
        type: String,
        required: true,
    },
    dateVirement: {
        type: String,
        required: true,
    }
});


const formData = ref({
    rib: props.oldRib,
    bank_name: props.oldBank,
    date_virement: props.dateVirement,
    rib_copie: null,
});

const handleFileChange = (e, type) => {
    formData.value[type] = e.target.files[0];
};

const submit = async () => {
    isLoading.value = true;
    console.log(props.id);

    await rhService.EditBankEmployee(props.id, formData.value).then(() => {
        $('#editInfoBank').modal('hide');
        toast.success('Informations bancaires modifiées avec succès');
    }).catch((error) => {
        console.error('Error during action execution', error);
        toast.error('Une erreur est survenue');
    }).finally(() => {
        isLoading.value = false;
    });
};

watch(() => props.oldRib, (value) => {
    formData.value.rib = value;
    formData.value.bank_name = props.oldBank;
});


</script>

<template>
    <Modal id="editInfoBank" title="Modifier les informations bancaires" size="modal-md">
        <form @submit.prevent="submit">
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="newSalary" class="form-label">
                                RIB Bancaire
                                <span class="text-danger font-18">*</span>
                            </label>
                            <input id="newSalary" v-model="formData.rib" class="form-control"
                                placeholder="Saisir le nouveau salaire" type="number" required />
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="dateVirement" class="form-label">
                                Date de virment
                                <span class="text-danger font-18">*</span>
                            </label>
                            <input id="dateVirement" v-model="formData.date_virement" class="form-control" type="date"
                                required />
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="bank_name" class="form-label">Nom de la banque
                                <span class="text-danger">*</span>
                            </label>

                            <select id="bank_name" v-model="formData.bank_name" class="form-select" required>
                                <option value="-">Choisir la banque</option>
                                <option value="CIH">CIH Bank</option>
                                <option value="BMCE BANK">BMCE Bank</option>
                                <option value="ATTIJARIWAFA BANK">Attijariwafa Bank</option>
                                <option value="SOCIETE GENERALE">Soceite Generale</option>
                                <option value="BMCI">BMCI Bank</option>
                                <option value="BANQUE POPULAIRE">Banque Populaire</option>
                                <option value="Crédit du Maroc">Credit du Maroc</option>
                                <option value="Crédit Agricole du Maroc">Credit Agricole du Maroc</option>
                                <option value="AL BARID BANK">Al Barid Bank</option>
                                <option value="CFG BANK">CFG Bank</option>
                                <option value="AL AKHDAR BANK">Al Akhdar Bank</option>
                                <option value="Umnia Bank">Umnia Bank</option>
                                <option value="other">Autre</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="copie_rib" class="form-label">Copie RIB
                                <span class="text-danger">*</span>
                            </label>
                            <input id="copie_rib" ref="rib_copie" class="form-control" placeholder="Choisir le fichier"
                                type="file" tabindex="0" name="copie_rib" required
                                @change="e => handleFileChange(e, 'rib_copie')" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                    Fermer
                </button>

                <button type="submit" :disabled="isLoading" class="btn btn-primary">
                    <span v-if="isLoading" class="d-flex align-items-center">
                        <div class="spinner-border spinner-border-sm text-white" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </span>
                    <span v-else> Modifier</span>
                </button>
            </div>
        </form>
    </Modal>
</template>