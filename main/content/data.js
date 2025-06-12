import { limit, orderBy } from '../../js/firebase.js';
import {
    loadData,
    handleFormSubmission,
    showAddPopup,
    showEditPopupGeneric,
    hidePopup,
    attachModalResetHandler,
    populateSearchDropdown,
    showWarningModal,
    loadNext,
    loadPrev
} from './data-loader.js';

export { loadNext, loadPrev };

// ===== FORM-SPECIFIC CONFIGURATION =====

const modalConfig = {
    add: {
        mode: "add",
        formTitle: "Add New Entry",
        submitButtonLabel: "Save"
    },
    edit: {
        mode: "edit",
        formTitle: "Edit Entry",
        submitButtonLabel: "Update"
    }
};

// ===== FORM-SPECIFIC DATA EXTRACTION =====
function extractFormData(formData) {
    return {
        "#": formData.get("number"),
        "Contestant": formData.get("contestant"),
        "Pradeshika Sabha": formData.get("pradeshikaSabha"),
        "Phone": formData.get("phone"),
        "Name": formData.get("name")
    };
}

// ===== FORM-SPECIFIC POPULATION =====
function populateFormForEdit(form, data) {
    form.number.value = data["#"];
    form.contestant.value = data["Contestant"];
    form.pradeshikaSabha.value = data["Pradeshika Sabha"];
    form.phone.value = data["Phone"];
    form.name.value = data["Name"];
}

async function submitForm(e, form, state, colRef, headers, query, bootstrapModal, collectionName) {
    await handleFormSubmission(e, form, state, colRef, headers, query, collectionName, bootstrapModal, extractFormData);
}

export async function search(query, where, orderBy, colRef, headers, COLLECTION_NAME, state) {
    const field = document.getElementById("searchField")?.value;
    const value = document.getElementById("searchQuery")?.value.trim();

    if (!field) return showWarningModal("Error", "Please select a search field.");
    if (!value) return showWarningModal("Error", "Please enter a search value.");

    const q = query(
        colRef,
        where(field, ">=", value),
        where(field, "<=", value + "\uf8ff"),
        orderBy(field),
        limit(state.page.size)
    );

    await loadData(colRef, headers, q, COLLECTION_NAME);
}

export async function resetSearch(query, colRef, headers, COLLECTION_NAME, state) {
    const field = document.getElementById("searchField");
    const value = document.getElementById("searchQuery");
    if (field) field.value = "";
    if (value) value.value = "";
    const q = query(colRef, limit(state.page.size));
    await loadData(colRef, headers, q, COLLECTION_NAME);
}

// ===== INITIALIZATION =====
export function init(query, colRef, headers, collectionName, state) {
    const q = query(colRef, orderBy(headers[1]), limit(state.page.size));
    const popupModalEl = document.getElementById('popupModal');
    const bootstrapModal = new bootstrap.Modal(popupModalEl);

    const form = document.getElementById("dataForm");

    // Set up form submission handler
    form.addEventListener("submit", (e) => {
        submitForm(e, form, state, colRef, headers, q, bootstrapModal, collectionName);
    });

    // Set up global functions
    window.showPopup = () => showAddPopup(state, bootstrapModal, modalConfig.add);
    window.showEditPopup = (id, data) => showEditPopupGeneric(id, data, bootstrapModal, form, state, modalConfig.edit, populateFormForEdit);
    window.hidePopup = () => hidePopup(state, bootstrapModal);

    // Set up modal reset handler
    attachModalResetHandler(popupModalEl, form, state, modalConfig.add);

    populateSearchDropdown(headers);
    loadData(colRef, headers, q, collectionName, state);
}
