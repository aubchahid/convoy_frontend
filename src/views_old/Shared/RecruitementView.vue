<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { CardTwo, CardTwoSkeleton, DeleteModal } from '@/ui';
import { useSharedStore } from '@/store';
import { sharedService } from '@/services';
import { RecruitementTable, DetailsRecruitementModal } from './components';
import AddNewRecruitmentModal from '../HumanRessources/components/modals/AddNewRecruitmentModal.vue';

const sharedStore = useSharedStore();

const data = ref(computed(() => sharedStore.recruitment.data));
const stats = ref(computed(() => sharedStore.recruitment.stats));

const recruitment = ref(null);

onMounted(async () => {
    await sharedService.getRecruitment();
});

onUnmounted(() => {
    sharedStore.clearRecruitment();
});



watch(data, () => {
    recruitment.value = data.value;
}, { deep: true });


</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Demande de recrutement</span>
        </h5>
        <div v-if="stats" class="row">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="Total Demande" :count="String(stats.total)" color="bg-label-primary"
                    icon="ti ti-zoom-filled" card-color=" card-border-shadow-primary" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="Demande en attente" :count="String(stats.pending)" color="bg-label-warning"
                    icon="ti ti-zoom-filled" card-color="card-border-shadow-warning" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="Demande validée" :count="String(stats.done)" color="bg-label-success"
                    icon="ti ti-zoom-filled" card-color="card-border-shadow-success" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="Demande recrutée" :count="String(stats.completed)" color="bg-label-info"
                    icon="ti ti-zoom-filled" card-color="card-border-shadow-info" />
            </div>
        </div>
        <div v-else class="row">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwoSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwoSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwoSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwoSkeleton />
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card card-border-shadow-primary">
                        <div class="card-header d-flex align-items-center">
                            <div class="me-auto">
                                <h5 class="fw-bold mb-1">Liste des demandes de recrutement</h5>
                                <small class="fw-bold mb-1 text-muted">Liste des demandes de recrutement demandées par
                                    vous</small>
                            </div>
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addNewRecruitment">
                                <i class="ti ti-square-rounded-plus-filled me-2"></i>
                                Ajouter une demande de recrutement
                            </button>
                        </div>
                        <div v-if="recruitment != null" class="card-body border-top pt-4">
                            <RecruitementTable :recruitment="recruitment" />
                        </div>
                        <div v-else class="card-body border-top pt-4 d-flex align-items-center justify-content-center"
                            style="height: 650px;">
                            <div class="row mt-5">
                                <div class="col-12 text-center">
                                    <h5>Chargement des données...</h5>
                                    <div class="spinner-border text-primary mt-4" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <DetailsRecruitementModal />
        <DeleteModal title="Supprimer un Demande" text="Voulez-vous vraiment supprimer cette demande ?"
            textButton="Oui, Supprimer" :action="() => sharedService.deleteRecruitment('shared')"
            message="La demande a été supprimée avec succès" />
        <AddNewRecruitmentModal from="other" />
    </div>
</template>

<style scoped>
.f-45 {
    font-size: 45px;
}
</style>
