import { limit, orderBy } from '../../js/firebase.js';
import {
    loadData,
    submitForm,
    attachModalResetHandler,
    populateSearchDropdown,
    loadNext,
    loadPrev,
    getById,
    showSpinner,
    showStatusModal
} from './data-loader.js';

export { loadNext, loadPrev, getById };

const formModalConfig = {
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

const fieldMapping = {
    "#": "number",
    "Contestant": "contestant",
    "Pradeshika Sabha": "pradeshikaSabha",
    "Phone": "phone",
    "Name": "name"
};

const statusModalMap = {
    success: {
        headerClass: "bg-success text-white",
        borderClass: "border-success",
        iconClass: "bi bi-check-circle-fill",
        buttonClass: "btn-success"
    },
    error: {
        headerClass: "bg-danger text-white",
        borderClass: "border-danger",
        iconClass: "bi bi-x-circle-fill",
        buttonClass: "btn-danger"
    },
    warning: {
        headerClass: "bg-warning text-dark",
        borderClass: "border-warning",
        iconClass: "bi bi-exclamation-triangle-fill",
        buttonClass: "btn-warning"
    },
    info: {
        headerClass: "bg-info text-dark",
        borderClass: "border-info",
        iconClass: "bi bi-info-circle-fill",
        buttonClass: "btn-info"
    }
};

export async function search(query, where, orderBy, colRef, headers, COLLECTION_NAME, state) {
    const field = state.ui.searchField?.value;
    const value = state.ui.searchQuery?.value.trim();

    if (!field) return showStatusModal("Alert", "Please select a search field.", "warning");
    if (!value) return showStatusModal("Alert", "Please enter a search value.", "warning");
    showSpinner();
    const q = query(
        colRef,
        where(field, ">=", value),
        where(field, "<=", value + "\uf8ff"),
        orderBy(field),
        limit(state.pagination.pageSize)
    );

    await loadData(colRef, headers, q, COLLECTION_NAME);
}

export async function resetSearch(query, colRef, headers, COLLECTION_NAME, state) {
    showSpinner();
    const field = state.ui.searchField;
    const value = state.ui.searchQuery;
    if (field) field.value = "";
    if (value) value.value = "";
    const q = query(colRef, limit(state.pagination.pageSize));
    await loadData(colRef, headers, q, COLLECTION_NAME);
}

// ===== INITIALIZATION =====
export function init(query, colRef, headers, collectionName, state) {
    const q = query(colRef, orderBy(headers[1]), limit(state.pagination.pageSize));
    const popupModalEl = state.ui.formModal;
    const bootstrapModal = new bootstrap.Modal(popupModalEl);

    const form = state.ui.form
    state.formModalConfig = formModalConfig;
    state.fieldMapping = fieldMapping;
    state.statusModalMap = statusModalMap;

    // Set up form submission handler
    form.addEventListener("submit", (e) => {
        submitForm(e, form, state, colRef, headers, q, collectionName, bootstrapModal, fieldMapping);
    });

    // Set up modal reset handler
    attachModalResetHandler(popupModalEl, form, state, formModalConfig.add);

    populateSearchDropdown(state, headers);
    loadData(colRef, headers, q, collectionName, state);
}
