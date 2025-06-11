import {
    loadData,
    handleFormSubmission,
    showAddPopup,
    showEditPopupGeneric,
    showDeleteConfirmationPopupGeneric,
    hidePopup,
    attachModalResetHandler,
    populateSearchDropdown,
    showWarningModal
} from './data-loader.js';

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

export async function search(query, where, orderBy, colRef, headers, COLLECTION_NAME) {
    const field = document.getElementById("searchField")?.value;
    const value = document.getElementById("searchQuery")?.value.trim();

    if (!field) return showWarningModal("Error", "Please select a search field.");
    if (!value) return showWarningModal("Error", "Please enter a search value.");

    const q = query(
        colRef,
        where(field, ">=", value),
        where(field, "<=", value + "\uf8ff"),
        orderBy(field)
    );

    await loadData(colRef, headers, q, COLLECTION_NAME);
}

export async function resetSearch(query, colRef, headers, COLLECTION_NAME) {
    const field = document.getElementById("searchField");
    const value = document.getElementById("searchQuery");
    if (field) field.value = "";
    if (value) value.value = "";
    const q = query(colRef);
    await loadData(colRef, headers, q, COLLECTION_NAME);
}

// ===== INITIALIZATION =====
export function init(query, colRef, headers, collectionName) {
    const state = { currentEditId: null };
    const q = query(colRef);
    const popupModalEl = document.getElementById('popupModal');
    const bootstrapModal = new bootstrap.Modal(popupModalEl);

    const deleteModalEl = document.getElementById('deleteConfirmModal')
    const deleteModal = new bootstrap.Modal(deleteModalEl);

    const form = document.getElementById("dataForm");

    // Set up form submission handler
    form.addEventListener("submit", (e) => {
        submitForm(e, form, state, colRef, headers, q, bootstrapModal, collectionName);
    });

    // Set up global functions
    window.showPopup = () => showAddPopup(state, bootstrapModal, modalConfig.add);
    window.showEditPopup = (id, data) => showEditPopupGeneric(id, data, bootstrapModal, form, state, modalConfig.edit, populateFormForEdit);
    window.showDeletePopup = (docId, colRef, headers, query, collection) => showDeleteConfirmationPopupGeneric(docId, colRef, headers, query, collection, deleteModal);
    window.hidePopup = () => hidePopup(state, bootstrapModal);

    // Set up modal reset handler
    attachModalResetHandler(popupModalEl, form, state, modalConfig.add);

    populateSearchDropdown(headers);
    loadData(colRef, headers, q, collectionName);
}
