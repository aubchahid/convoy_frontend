<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { useSalesStore } from '@/store';
import { salesService } from '@/services';
import { formater, helpers } from '@/utils';
import { Modal } from '@/ui';
import { Validate } from '../HumanRessources/components/modals';
import { useRouter } from 'vue-router';
import { AddFactureClientModal } from './components/modals';

const salesStore = useSalesStore();
const purchase = ref(computed(() => salesStore.purchase));

const role = ref(localStorage.getItem('role'));
const router = useRouter();
const props = defineProps({
  id: {
    type: String,
    required: true,
  }
});


const isLoading = ref(false);
const decision = ref();
const comment = ref();

onMounted(async () => {
  await salesService.getPurchaseOrderById(Number(props.id));
});

onUnmounted(() => {
  salesStore.clearPurchase();
});

const tabeComperatif = () => {
  salesStore.article = purchase.value.purchase_article;
  router.push({ name: 'PurchaseOrderTableComperatif', params: { id: props.id } });
};


const ValidateArticleModal = async () => {
  isLoading.value = true;

  const formData = new FormData();
  formData.append('status', '1');
  await salesService.ValidateArticle(salesStore.ItemId, formData).then(() => {
    isLoading.value = false;
    $('#validate-modal').modal('hide');

  });
};
const RefuseArticleModal = async () => {
  isLoading.value = true;

  const formData = new FormData();
  formData.append('status', '0');
  await salesService.ValidateArticle(salesStore.ItemId, formData).then(() => {
    isLoading.value = false;
    $('#reject-modal').modal('hide');

  });
};

const validation = async () => {
  isLoading.value = true;

  const formData = new FormData();
  formData.append('status', decision.value);
  formData.append('comment', comment.value);
  formData.append('purchase_order_id', purchase.value.id);
  await salesService.validatePurchaseOrder(formData).then(() => {
    isLoading.value = false;
    $('#validate-do').modal('hide');
  });
};

</script>

<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <h5 v-if="purchase" class="py-3 mb-4">
      <span class="text-muted fw-light">Dashboard /
        {{ purchase.type == 'Service' ? "Demande d'execution" : "Demande d'achat" }} /
      </span>
      {{ purchase.n_order }}
    </h5>
    <div v-if="purchase" class="row invoice-preview">
      <div class="col-xl-9 col-md-8 col-12 mb-md-0 mb-4">
        <div class="card card-border-shadow-primary invoice-preview-card">
          <div class="card-body">
            <div>
              <div class="d-flex svg-illustration mb-4 gap-2 align-items-center">
                <div class="app-brand-logo">
                  <img src="@/assets/img/Logo_bg.png" style="height: 80px; object-fit:contain;" alt="">
                </div>
              </div>
            </div>
            <div class="d-flex">
              <div class="me-auto">
                <p class="mb-2">Demande Par : {{
      purchase.created_by.employee.first_name +
      ' ' +
      purchase.created_by.employee.last_name
    }}</p>
                <p class="mb-2">Numéro de téléphone : {{ formater.phoneNumber(
      purchase.created_by.employee.phone_no) }}</p>
                <p class="mb-2">Adresse email : {{ purchase.created_by.employee.email }}</p>
              </div>
              <div class="ms-auto">
                <h5 class="fw-bold mb-2">Demande d'achat #{{ purchase.n_order }}</h5>
                <div class="mb-2 pt-1">
                  <span>Date de creation :</span>
                  <span class="fw-bold ms-2">{{ formater.date(purchase.created_at) }}</span>
                </div>
                <div class="pt-1">
                  <span>Status :</span>
                  <span class="fw-bold ms-2">
                    <span :class="helpers.returnBadge(purchase.status)[0]" class="fw-bold">{{
      helpers.returnBadge(purchase.status)[1] }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="table-responsive border-top">
            <table class="table m-0">
              <thead class="table-dark">
                <tr>
                  <th class="fw-bold">ID</th>
                  <th class="fw-bold">Désignation</th>
                  <th class="fw-bold text-center">Unité</th>
                  <th class="fw-bold text-center">Quantité</th>
                  <th></th>
                </tr>
              </thead>
              <tbody v-if="purchase.purchase_article.length != 0">
                <tr v-for="article in purchase.purchase_article" :key="article.id">
                  <td>{{ article.article.id }}</td>
                  <td>
                    {{ article.article.article }}
                    <i v-if="article.article.type == 'hors bordereau'" class="ti ti-bookmark-filled text-danger"></i>
                  </td>
                  <td class="text-center">{{ article.unity }}</td>
                  <td class="text-center">{{ article.quantity }}</td>
                  <td class="text-center">
                    <div class="btn-group"
                      v-if="article.article.type == 'hors bordereau' && ([helpers.roles.DG , helpers.roles.DS ,helpers.roles.DO].includes(role)) && article.article.status != 1">
                      <button type="button" class="btn btn-sm btn-success waves-effect waves-light"
                        data-bs-toggle="modal" data-bs-target="#validate-modal"
                        @click="salesStore.setItemId(article.article.id)">
                        <i class="ti ti-check"></i>
                      </button>
                      <button type="button" class="btn btn-sm btn-danger waves-effect waves-light"
                        data-bs-toggle="modal" data-bs-target="#reject-modal"
                        @click="salesStore.setItemId(article.article.id)">
                        <i class="ti ti-x"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="5" class="text-center">
                    <small>Aucun article</small>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card-body">
            <p> <i class="ti ti-bookmark-filled text-danger"></i> : Tous les articles qui ont été signalés
              signifient qu'il n'y en a pas dans le bordereau</p>
          </div>
          <div v-if="purchase.commentaire" class="card-body mx-3">
            <div class="row">
              <div class="col-12">
                <span class="fw-bold text-danger">Commentaire : </span>
                <span>{{ purchase.commentaire }}</span>
              </div>
            </div>
          </div>
          <hr v-if="purchase.commentaire">
          <div v-if="purchase.type == 'Achats'" class="card-body mx-3">
            <div class="row">
              <div class="col-12">
                <h6 class="fw-bold">Informations de livraison</h6>
                <div class="d-flex align-items-center">
                  <span class="badge bg-label-success rounded-circle p-2 me-2">
                    <i class="ti ti-map-pin f-18"></i>
                  </span>
                  <p class="mb-0">Adresse de livraison : {{ purchase.location }}</p>
                </div>
                <div class="d-flex align-items-center mt-4">
                  <span class="badge bg-label-success rounded-circle p-2 me-2">
                    <i class="ti ti-clock f-18"></i>
                  </span>
                  <p class="mb-0">Date de livraison : {{ formater.date(purchase.delivery_date) }}</p>
                </div>
                <div v-if="purchase.location != 'Stock'" class="d-flex align-items-center mt-4">
                  <span class="badge bg-label-success rounded-circle p-2 me-2">
                    <i class="ti ti-user f-18"></i>
                  </span>
                  <p class="mb-0">Livrer à : {{ purchase.recepteur }}</p>
                </div>
              </div>
            </div>
          </div>
          <hr>
          <div class="card-body mx-3">
            <h5 class="card-title m-0">Historique de la demande</h5>
            <div v-if="purchase.historique_purchase_order.length > 0" class="card-body m-2">
              <ul class="timeline pt-3">
                <li v-for="(historique, index) in purchase.historique_purchase_order" :key="historique.id" :class="(index == purchase.historique_purchase_order.length - 1
      ? 'border-transparent'
      : 'border-left-dashed')" class=" timeline-item pb-4">
                  <div :class="(historique.is_valid == '1' ? 'timeline-item-primary' : 'timeline-item-secondary')">
                    <span class="timeline-indicator-advanced"
                      :class="(historique.is_valid == '1' ? 'timeline-indicator-primary' : 'timeline-indicator-secondary')">
                      <i class="ti ti-circle-filled"></i>
                    </span>
                    <div class="timeline-event">
                      <div class="timeline-header border-bottom mb-3">
                        <h6 class="mb-0">{{ historique.title }}</h6>
                        <span class="text-muted" v-if="historique.is_valid == 1">
                          {{ formater.date(historique.created_at) }}
                        </span>
                      </div>
                      <div class="mb-2">
                        <div class="d-flex align-items-center" v-if="historique.is_valid == 1">
                          {{ historique.description }}
                        </div>
                        <div class="d-flex align-items-center text-secondary" v-else>
                          Cette tâche n'a pas encore été exécutée
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div v-else class="card-body text-center m-2">
              <img src="/src/assets/img/no_pre_project.png" class="empty_stats_img_md" alt="" />
              <p class="mt-5 fw-bold">Aucun historique disponible</p>
              <small class="text-muted">
                Aucun historique n'est disponible pour cette demande
              </small>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-md-4 col-12 invoice-actions">
        <div class="card card-border-shadow-primary mb-4">
          <div class="card-body">
            <button
              v-if="purchase.status == 'on going' && role == 'Responsable d\'achats' && purchase.table_comperatif == null"
              class="btn btn-label-primary d-grid w-100 mb-2 waves-effect d-flex" @click="tabeComperatif">
              <i class="ti ti-bookmark-plus me-2"></i> Créer la table comparative
            </button>
            <router-link :to="{ name: 'PurchaseOrderValidation', params: { id: purchase.id } }"
              v-if="purchase.status == 'on going' && purchase.table_comperatif != null && [helpers.roles.DS, helpers.roles.DO].includes(role)"
              class="btn btn-success d-grid w-100 mb-2 waves-effect d-flex">
              <i class="ti ti-check me-2"></i> Valider la demande d'achats
            </router-link>
            <button class="btn d-grid w-100 mb-2 waves-effect d-flex" :disabled="purchase.status != 'pending'"
              :class="purchase.status != 'pending' ? 'btn-secondary' : 'btn-warning'" href=". /app-invoice-edit.html">
              <i class="ti ti-pencil me-2"></i> Modifier la demande
            </button>
            <button class="btn d-grid w-100 mb-2 waves-effect d-flex" v-if="purchase.status == 'on road'"
              :class="purchase.status != 'on road' ? 'btn-secondary' : 'btn-success'" data-bs-target="#upload-facture"
              data-bs-toggle="modal" >
              <i class="ti ti-square-rounded-plus-filled me-2"></i> Facture 
            </button>
            <router-link :to="{ name: 'DetailBonCommande', params: { id: purchase.id } }"
              v-if="purchase.status == 'valide'" class="btn btn-primary d-grid w-100 mb-2 waves-effect d-flex">
              <i class="ti ti-download me-2"></i> Télécharger le bon de commande
            </router-link>
            <button class="btn btn-success d-grid w-100 mb-2 waves-effect d-flex" data-bs-target="#validate-do"
              data-bs-toggle="modal" v-if="purchase.status == 'pending' && [helpers.roles.DO].includes(role)">
              <i class="ti ti-check me-2"></i> Valider la demande d'achats
            </button>

          </div>
        </div>
      </div>
    </div>
    <Validate id="validate-modal" :isLoading="isLoading" :method="ValidateArticleModal" :itemid="salesStore.ItemId"
      title="Valider l'article hors bordereau" message="Êtes-vous sûr de valider cet Article ?" severity="success" />
    <Validate id="reject-modal" :isLoading="isLoading" :method="RefuseArticleModal" :itemid="salesStore.ItemId"
      title="Refuser l'article hors bordereau" message="Êtes-vous sûr de refuser cet Article ?" severity="danger" />

      <AddFactureClientModal v-if="purchase" :id="purchase.id" :bon-commande="purchase.bon_commande"/>
    <Modal id="validate-do" title="Validation de la demande d'achat">
      <form @submit.prevent="validation">
        <div class="modal-body">
          <p>Votre décision pour cette demande d'achat</p>
          <div class="form-check form-check-inline mt-3">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" v-model="decision"
              value="1">
            <label class="form-check-label" for="inlineRadio1">Valider</label>
          </div>
          <div class="form-check form-check-inline mt-3">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" v-model="decision"
              value="0">
            <label class="form-check-label" for="inlineRadio2">Refuser</label>
          </div>
          <div class="mb-3 mt-3" v-if="decision == 0">
            <label for="comment" class="form-label mb-2">Commentaire <span class="text-danger">*</span> </label>
            <textarea class="form-control" id="comment" rows="3" placeholder="Entrez votre commentaire" v-model="
            comment" required></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
            Non
          </button>
          <button type="submit" class="btn btn-danger" :disabled="isLoading">
            <span v-if="isLoading" class="d-flex align-items-center">
              <div class="spinner-border spinner-border-sm text-white" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </span>
            <span v-else>Oui</span>
          </button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<style>
.bottom-image {
  position: fixed;
  bottom: 35px;
  width: 80%;
  /* Adjust the width as needed */
}

.f-18 {
  font-size: 18px;
}

.f-36 {
  font-size: 36px;
}

.empty_stats_img_md {
  width: 100%;
  max-width: 180px;
  margin: 0 auto;
}

.only-in-mobile {
  display: block;
}

.hide-in-mobile {
  display: none;
}

@media (min-width: 980px) {
  .only-in-mobile {
    display: none;
  }

  .hide-in-mobile {
    display: block;
  }
}
</style>
