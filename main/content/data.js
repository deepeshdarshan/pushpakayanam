import { limit, orderBy } from '../../js/firebase.js';
import {
    loadData,
    handleFormSubmission,
    attachModalResetHandler,
    populateSearchDropdown,
    showWarningModal,
    loadNext,
    loadPrev,
    getById,
    showSpinner,
    hideSpinner
} from './data-loader.js';

export { loadNext, loadPrev, getById };

// ===== FORM-SPECIFIC CONFIGURATION =====

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

export async function search(query, where, orderBy, colRef, headers, COLLECTION_NAME, state) {
    showSpinner();

    const field = state.ui.searchField?.value;
    const value = state.ui.searchQuery?.value.trim();

    if (!field) return showWarningModal("Error", "Please select a search field.");
    if (!value) return showWarningModal("Error", "Please enter a search value.");

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

    // Set up form submission handler
    form.addEventListener("submit", (e) => {
        handleFormSubmission(e, form, state, colRef, headers, q, collectionName, bootstrapModal, fieldMapping);
    });

    // Set up modal reset handler
    attachModalResetHandler(popupModalEl, form, state, formModalConfig.add);

    populateSearchDropdown(state, headers);
    loadData(colRef, headers, q, collectionName, state);
}
