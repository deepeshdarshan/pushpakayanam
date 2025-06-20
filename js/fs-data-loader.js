import {
    db,
    limit,
    limitToLast,
    startAfter,
    endBefore,
    orderBy,
    query,
    addData,
    updateData,
    deleteData,
    getData
} from '/js/firestore.js';

let lastVisible = null;
let firstVisible = null;
let currentState = null;


function extractFormData(form, fieldMapping) {
    const data = {};
    const formData = new FormData(form);
    for (const [label, field] of Object.entries(fieldMapping)) {
        data[label] = formData.get(field);
    }
    return data;
}

function populateFormData(form, data, fieldMapping) {
    for (const [dataKey, formFieldName] of Object.entries(fieldMapping)) {
        if (form[formFieldName] && data[dataKey] !== undefined) {
            form[formFieldName].value = data[dataKey];
        }
    }
}

export function getById(id) {
    return document.getElementById(id);
}

function createDefaultOption() {
    return createOption("-- Select search field --", "");
}

function createOption(text, value) {
    const option = document.createElement("option");
    option.textContent = text;
    option.value = value;
    return option;
}


function createElement(element) {
    return document.createElement(element);
}

function createHeaderCell(text) {
    const th = createElement('th');
    th.textContent = text;
    return th;
}

function createTableHeader(headers) {
    const headerRow = createElement('tr');
    headers.forEach(header => {
        const th = createHeaderCell(header);
        headerRow.appendChild(th);
    });
    const actionTh = createHeaderCell('Actions');
    headerRow.appendChild(actionTh);
    return headerRow;
}

function createDataCell(value) {
    const td = createElement('td');
    td.textContent = value ?? '';
    return td;
}

function createButton(id, text, clickHandler) {
    const button = createElement('button');
    button.textContent = text;
    button.id = id;
    button.onclick = clickHandler;
    return button;
}

function createEditButton(docId, data) {
    return createButton('editBtn', 'Edit', () => showEditPopup(
        docId,
        data,
        getModalByEl(currentState.ui.formModal),
        currentState.ui.form,
        currentState,
        currentState.formModalConfig.edit,
        currentState.fieldMapping
    ));
}

function createDeleteButton(docId, query) {
    return createButton('deleteBtn', 'Delete', () => showDeleteConfirmPopup(docId, query));
}

function createActionCell(docId, data, query) {
    const actionTd = createElement('td');
    const editBtn = createEditButton(docId, data);
    const delBtn = createDeleteButton(docId, query);
    actionTd.appendChild(editBtn);
    actionTd.appendChild(delBtn);
    return actionTd;
}

function createDataRow(headers, data, docId, query) {
    const row = createElement('tr');
    headers.forEach(header => {
        const td = createDataCell(data[header]);
        row.appendChild(td);
    });
    const actionTd = createActionCell(docId, data, query);
    row.appendChild(actionTd);

    return row;
}

function createTable() {
    const thead = currentState.ui.thead;
    const tbody = currentState.ui.tbody;
    thead.innerHTML = '';
    tbody.innerHTML = '';
    return { thead, tbody };
}

function setVisibility(element, isVisible) {
    element.style.display = isVisible ? 'block' : 'none';
}

function showNoDataMessage(tbody) {
    tbody.innerHTML = '<tr><td colspan="100%">No data found.</td></tr>';
}

export function showSpinner() {
    const spinner = currentState.ui.spinner;
    if (spinner) spinner.style.display = "flex";
}

export function hideSpinner() {
    const spinner = currentState.ui.spinner;
    if (spinner) spinner.style.display = "none";
}

export function disableButtons() {
    const submitBtn = currentState.ui.submitBtn;
    const cancelBtn = currentState.ui.cancelBtn;
    disableEl(submitBtn);
    disableEl(cancelBtn);
    return { submitBtn, cancelBtn };
}

export function enableButtons(submitBtn, cancelBtn) {
    disableEl(submitBtn, false);
    disableEl(cancelBtn, false);
}

export function disableEl(el, value = true) {
    el.disabled = value;
}

function disableDeleteConfirmationPopupButtons(confirmDeleteBtn, cancelDeleteBtn) {
    disableEl(confirmDeleteBtn, false);
    disableEl(cancelDeleteBtn, false);
}

function enableDeleteConfirmationPopupButtons(confirmDeleteBtn, cancelDeleteBtn) {
    disableEl(confirmDeleteBtn);
    disableEl(cancelDeleteBtn);
}

export function updateModalUI(modalConfigProp) {
    currentState.ui.formTitle.textContent = modalConfigProp.formTitle;
    currentState.ui.submitBtn.textContent = modalConfigProp.submitButtonLabel;
}

function createModalById(modalId) {
    const modalEl = getById(modalId);
    return createModalByEl(modalEl);
}

function createModalByEl(modalEl) {
    return new bootstrap.Modal(modalEl);
}

function getModalById(modalId) {
    const modalEl = getById(modalId);
    return getModalByEl(modalEl);
}

function getModalByEl(modalEl) {
    return bootstrap.Modal.getInstance(modalEl);
}


export function showModal(bootstrapModal) {
    bootstrapModal.show();
}

export function hideModal(bootstrapModal) {
    bootstrapModal.hide();
}

export function resetForm(form) {
    form.reset();
}

export function resetCurrentEditId(state) {
    state.currentEditId = null;
}

function setCurrentEditId(state, id) {
    state.currentEditId = id;
}

export function handleSubmissionError(err) {
    console.error("Error submitting form:", err);
}

export function populateSearchDropdown(state) {
    const searchDropdown = state.ui.searchField;
    const defaultOption = createDefaultOption();
    searchDropdown.appendChild(defaultOption);
    state.headers.forEach(header => {
        const option = createOption(header, header);
        searchDropdown.appendChild(option);
    });
}

export function showDeleteConfirmPopup(docId, query) {
    window.currentDeleteInfo = {
        id: docId,
        query: query
    };
    const deleteModal = createModalById('deleteConfirmModal');
    showModal(deleteModal);
}

export async function attachConfirmDeleteButtonEvent() {
    const currentDeleteInfo = window.currentDeleteInfo;
    if (currentDeleteInfo) {
        await handleDeleteConfirmation(
            currentDeleteInfo.id,
            currentDeleteInfo.query,
        );
        window.currentDeleteInfo = null;
    }
}

function setDocIndex(snapshot) {
    firstVisible = snapshot.docs[0];
    lastVisible = snapshot.docs[snapshot.docs.length - 1];
}

async function handleDeleteConfirmation(deleteId, query) {
    const confirmDeleteBtn = currentState.ui.confirmDeleteBtn;
    const cancelDeleteBtn = currentState.ui.cancelDeleteBtn;
    const deleteAction = currentState.formActionsMap.delete;
    enableDeleteConfirmationPopupButtons(confirmDeleteBtn, cancelDeleteBtn);
    if (deleteId) {
        try {
            hideModal(getModalByEl(currentState.ui.deleteConfirmModal));
            await deleteData(deleteId, db, currentState.collectionName);
            await loadData(currentState.headers, query);
            showStatusModal(deleteAction.success.title, deleteAction.success.message, deleteAction.success.type);
        } catch (err) {
            console.error("Error deleting data:", err);
            showStatusModal(deleteAction.error.title, deleteAction.error.message, deleteAction.error.type);
        } finally {
            disableDeleteConfirmationPopupButtons(confirmDeleteBtn, cancelDeleteBtn);
        }
    }
}

function renderTableBody(snapshot, headers, q, tbody) {
    snapshot.forEach(docSnap => {
        const data = docSnap.data();
        renderTableData(docSnap.id, data, headers, q, tbody);
    });
}

function updatePageInfo() {
    currentState.ui.pageInfo.textContent = `Page ${currentState.pagination.currentPage}`;
    currentState.ui.prevPageBtn.disabled = currentState.pagination.isOnFirstPage;
    currentState.ui.nextPageBtn.disabled = currentState.pagination.isOnLastPage;
}

export async function loadNext(colRef, headers, collectionName) {
    const q = query(colRef, orderBy(headers[1]), startAfter(lastVisible), limit(currentState.pagination.pageSize));
    currentState.pagination.isOnFirstPage = false;
    currentState.pagination.currentPage++;
    await loadData(headers, q);
}

export async function loadPrev(colRef, headers, collectionName) {
    const q = query(colRef, orderBy(headers[1]), endBefore(firstVisible), limitToLast(currentState.pagination.pageSize));
    currentState.pagination.currentPage--;
    currentState.pagination.isOnFirstPage = currentState.pagination.currentPage === 1;
    currentState.pagination.isOnLastPage = false;
    await loadData(headers, q);
}

export async function loadData(headers, q, state) {
    if (state) currentState = state;
    showSpinner();
    const { thead, tbody } = createTable();
    const paginationNavbar = currentState.ui.paginationNavContainer;
    try {
        const snapshot = await getData(q);
        if (snapshot.empty) {
            setVisibility(paginationNavbar, false);
            showNoDataMessage(tbody);
            return;
        } else {
            setVisibility(paginationNavbar, true);
        }
        if (snapshot.docs.length < currentState.pagination.pageSize) {
            currentState.pagination.isOnLastPage = true;
        }
        setDocIndex(snapshot);
        renderTableHeader(headers, thead);
        renderTableBody(snapshot, headers, q, tbody);
        updatePageInfo();
    } catch (err) {
        console.error("Error loading data:", err);
    } finally {
        hideSpinner();
    }
}

function renderTableHeader(headers, thead) {
    const headerRow = createTableHeader(headers);
    thead.appendChild(headerRow);
}

function renderTableData(id, data, headers, query, tbody) {
    const row = createDataRow(headers, data, id, query);
    tbody.appendChild(row);
}

async function addOrUpdateData(id, collectionName, collection, data) {
    if (id) {
        await updateData(id, collectionName, data);
    } else {
        await addData(collection, data);
    }
}

export async function submitForm(form, state, collection, bootstrapModal, fieldMapping) {
    const { submitBtn, cancelBtn } = disableButtons();
    try {
        const data = extractFormData(form, fieldMapping);
        addOrUpdateData(state.currentEditId, state.collectionName, collection, data);
        resetForm(form);
    } catch (err) {
        handleSubmissionError(err);
        showStatusModal("Error", state.currentEditId ? "Error updating data" : "Error saving data", "error");
    } finally {
        showStatusModal("Success", state.currentEditId ? "Data updated successfully" : "Data saved successfully", "success");
        enableButtons(submitBtn, cancelBtn);
    }
}

export function showStatusModal(titleTxt, message, type = "info") {
    const config = currentState.statusModalMap[type] || currentState.statusModalMap.info;

    const content = currentState.ui.statusModalContent;
    const header = currentState.ui.statusModalHeader;
    const icon = currentState.ui.statusModalIcon;
    const title = currentState.ui.statusModalTitle;
    const body = currentState.ui.statusModalBody;
    const btn = currentState.ui.statusModalBtn;

    if (content) {
        content.className = "modal-content";
        content.classList.add(...config.borderClass.split(" "));
    }

    if (header) {
        header.className = "modal-header";
        header.classList.add(...config.headerClass.split(" "));
    }

    if (btn) {
        btn.className = "btn";
        btn.classList.add(config.buttonClass);
    }

    if (icon) {
        icon.className = config.iconClass;
        icon.classList.add("me-2");
    }

    if (title) title.textContent = titleTxt;
    if (body) body.textContent = message

    const modal = createModalByEl(currentState.ui.statusModal);
    showModal(modal);
}


export function showAddPopup(state, bootstrapModal, addModalConfig) {
    resetCurrentEditId(state);
    updateModalUI(addModalConfig);
    showModal(bootstrapModal);
}

export function showEditPopup(id, data, bootstrapModal, form, state, editModalConfig, fieldMapping) {
    setCurrentEditId(state, id);
    updateModalUI(editModalConfig);
    populateFormData(form, data, fieldMapping);
    showModal(bootstrapModal);
}

export function hidePopup(state, bootstrapModal) {
    resetCurrentEditId(state);
    hideModal(bootstrapModal);
}

// ===== MODAL EVENT HANDLER SETUP =====
export function attachModalResetHandler(state) {
    state.ui.formModal.addEventListener('hidden.bs.modal', () => {
        resetForm(state.ui.form);
        resetCurrentEditId(state);
        updateModalUI(state.formModalConfig.add);
    });
}