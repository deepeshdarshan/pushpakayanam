import { limit, orderBy, query } from '../../js/firebase.js';
import {
    loadData,
    submitForm,
    attachModalResetHandler,
    populateSearchDropdown,
    loadNext,
    loadPrev,
    getById,
    showSpinner,
    showStatusModal,
    showModal,
    hideModal,
    attachConfirmDeleteButtonEvent,
    hideSpinner
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

const formActionsMap = {
    save: {
        success: {
            title: "Success",
            message: "Data saved successfully.",
            type: "success"
        },
        error: {
            title: "Error",
            message: "Error saving data.",
            type: "error"
        }
    },
    update: {
        success: {
            title: "Success",
            message: "Data updated successfully.",
            type: "success"
        },
        error: {
            title: "Error",
            message: "Error updating data.",
            type: "error"
        }
    },
    delete: {
        success: {
            title: "Success",
            message: "Data deleted successfully.",
            type: "success"
        },
        error: {
            title: "Error",
            message: "Error deleting data.",
            type: "error"
        }
    },
    validate: {
        type: "warning",
        title: "Alert"
    }
};

export function handleConfirmDeleteButtonEvent() {
    attachConfirmDeleteButtonEvent();
}

export async function search(query, where, orderBy, colRef, headers, COLLECTION_NAME, state) {
    const field = state.ui.searchField?.value;
    const value = state.ui.searchQuery?.value.trim();

    if (!field) return showStatusModal(formActionsMap.validate.title, "Please select a search field.", formActionsMap.validate.type);
    if (!value) return showStatusModal(formActionsMap.validate.title, "Please enter a search value.", formActionsMap.validate.type);

    showSpinner();

    const q = query(
        colRef,
        where(field, ">=", value),
        where(field, "<=", value + "\uf8ff"),
        orderBy(field),
        limit(state.pagination.pageSize)
    );

    await loadData(headers, q);
}

export async function resetSearch(query, colRef, headers, COLLECTION_NAME, state) {
    showSpinner();
    const field = state.ui.searchField;
    const value = state.ui.searchQuery;
    if (field) field.value = "";
    if (value) value.value = "";
    const q = query(colRef, limit(state.pagination.pageSize));
    await loadData(headers, q);
}

// ===== INITIALIZATION =====
export function init(colRef, state) {

    const q = query(colRef, orderBy(state.headers[1]), limit(state.pagination.pageSize));
    const formModalEl = state.ui.formModal;
    const formModal = new bootstrap.Modal(formModalEl);

    state.formModalConfig = formModalConfig;
    state.fieldMapping = fieldMapping;
    state.statusModalMap = statusModalMap;
    state.formActionsMap = formActionsMap;

    state.ui.form.addEventListener("submit", (e) => {
        submitFormHandler(state, colRef, e);
    });

    state.ui.addContestantBtn.addEventListener("click", (e) => {
       addContestanEventHandler(state);
    });

    attachModalResetHandler(state);
    populateSearchDropdown(state);
    loadData(state.headers, q, state);
}

export function addContestanEventHandler(state) {
    const formModalEl = state.ui.formModal;
    const formModal = new bootstrap.Modal(formModalEl);
    showModal(formModal);
};

export async function submitFormHandler(state, colRef, e) {
    e.preventDefault();
    const q = query(colRef, orderBy(state.headers[1]), limit(state.pagination.pageSize));
    const formModalEl = state.ui.formModal;
    const formModal = bootstrap.Modal.getInstance(formModalEl);
    submitForm(state.ui.form, state, colRef, formModal, fieldMapping);
    hideModal(formModal);
    loadData(state.headers, q, state);
}

