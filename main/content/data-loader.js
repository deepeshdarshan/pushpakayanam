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
} from '/js/firebase.js';

let lastVisible = null;
let firstVisible = null;
let currentState = null;


function extractFormData(formData, fieldMapping) {
    const result = {};
    for (const [label, field] of Object.entries(fieldMapping)) {
        result[label] = formData.get(field);
    }
    return result;
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
        getModal('popupModal'),
        currentState.ui.form,
        currentState,
        currentState.formModalConfig.edit,
        currentState.fieldMapping
    ));
}

function createDeleteButton(docId, colRef, headers, query, collection) {
    return createButton('deleteBtn', 'Delete', () => showDeleteConfirmPopup(docId, colRef, headers, query, collection));
}

function createActionCell(docId, data, colRef, headers, query, collection) {
    const actionTd = createElement('td');
    const editBtn = createEditButton(docId, data);
    const delBtn = createDeleteButton(docId, colRef, headers, query, collection);
    actionTd.appendChild(editBtn);
    actionTd.appendChild(delBtn);
    return actionTd;
}

function createDataRow(headers, data, docId, colRef, query, collection) {
    const row = createElement('tr');
    headers.forEach(header => {
        const td = createDataCell(data[header]);
        row.appendChild(td);
    });
    const actionTd = createActionCell(docId, data, colRef, headers, query, collection);
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

export function createButtons() {
    const submitBtn = currentState.ui.submitBtn;
    const cancelBtn = currentState.ui.cancelBtn;
    disableButtons(submitBtn, cancelBtn);
    return { submitBtn, cancelBtn };
}

export function disableButtons(submitBtn, cancelBtn) {
    submitBtn.disabled = true;
    cancelBtn.disabled = true;
}

export function enableButtons(submitBtn, cancelBtn) {
    submitBtn.disabled = false;
    cancelBtn.disabled = false;
}

function disableDeleteConfirmationPopupButtons(confirmDeleteBtn, cancelDeleteBtn) {
    confirmDeleteBtn.disabled = false;
    cancelDeleteBtn.disabled = false;
}

function enableDeleteConfirmationPopupButtons(confirmDeleteBtn, cancelDeleteBtn) {
    confirmDeleteBtn.disabled = true;
    cancelDeleteBtn.disabled = true;
}

export function updateModalUI(modalConfigProp) {
    currentState.ui.formTitle.textContent = modalConfigProp.formTitle;
    currentState.ui.submitBtn.textContent = modalConfigProp.submitButtonLabel;
}

function createModal(modalId) {
    const modalEl = getById(modalId);
    return new bootstrap.Modal(modalEl);
}

function getModal(modalId) {
    const modalEl = document.getElementById(modalId);
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

export function populateSearchDropdown(state, headers) {
    const searchDropdown = state.ui.searchField;
    const defaultOption = createDefaultOption();
    searchDropdown.appendChild(defaultOption);
    headers.forEach(header => {
        const option = createOption(header, header);
        searchDropdown.appendChild(option);
    });
}

export function showDeleteConfirmPopup(docId, colRef, headers, query, collection) {
    window.currentDeleteInfo = {
        id: docId,
        colRef: colRef,
        headers: headers,
        query: query,
        collection: collection
    };
    const deleteModal = createModal('deleteConfirmModal');
    showModal(deleteModal);
}

function setupGlobalDeleteConfirmation() {
    const confirmDeleteBtn = currentState.ui.confirmDeleteBtn;

    if (!confirmDeleteBtn.hasAttribute('data-listener-added')) {
        confirmDeleteBtn.setAttribute('data-listener-added', 'true');

        confirmDeleteBtn.addEventListener('click', async () => {
            await attachConfirmDeleteButtonEvent();
        });
    }
}

async function attachConfirmDeleteButtonEvent() {
    const currentDeleteInfo = window.currentDeleteInfo;
    if (currentDeleteInfo) {
        await handleDeleteConfirmation(
            currentDeleteInfo.id,
            currentDeleteInfo.colRef,
            currentDeleteInfo.headers,
            currentDeleteInfo.query,
            currentDeleteInfo.collection
        );
        window.currentDeleteInfo = null;
    }
}

function setDocIndex(snapshot) {
    firstVisible = snapshot.docs[0];
    lastVisible = snapshot.docs[snapshot.docs.length - 1];
}

async function handleDeleteConfirmation(deleteId, colRef, headers, query, collection) {
    const confirmDeleteBtn = currentState.ui.confirmDeleteBtn;
    const cancelDeleteBtn = currentState.ui.cancelDeleteBtn;
    enableDeleteConfirmationPopupButtons(confirmDeleteBtn, cancelDeleteBtn);
    if (deleteId) {
        try {
            await deleteData(deleteId, db, collection);
            const deleteModal = getModal('deleteConfirmModal');
            hideModal(deleteModal);
            await loadData(colRef, headers, query, collection);
            showStatusModal("Success", "Document has been deleted successfully", "success");
        } catch (err) {
            console.error("Error deleting document:", err);
            showStatusModal("Error", "Error deleting document", "error");
        } finally {
            disableDeleteConfirmationPopupButtons(confirmDeleteBtn, cancelDeleteBtn);
        }
    }
}

function getPaginationNavbar() {
    return currentState.ui.paginationNavContainer;
}


function renderTableBody(snapshot, headers, colRef, q, collectionName, tbody) {
    snapshot.forEach(docSnap => {
        const data = docSnap.data();
        renderTableData(docSnap.id, data, headers, colRef, q, collectionName, tbody);
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
    await loadData(colRef, headers, q, collectionName);
}

export async function loadPrev(colRef, headers, collectionName) {
    const q = query(colRef, orderBy(headers[1]), endBefore(firstVisible), limitToLast(currentState.pagination.pageSize));
    currentState.pagination.currentPage--;
    currentState.pagination.isOnFirstPage = currentState.pagination.currentPage === 1;
    currentState.pagination.isOnLastPage = false;
    await loadData(colRef, headers, q, collectionName);
}

export async function loadData(colRef, headers, q, collectionName, state) {
    if (state) currentState = state;
    const { thead, tbody } = createTable();
    const paginationNavbar = getPaginationNavbar();
    setupGlobalDeleteConfirmation();
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
        renderTableBody(snapshot, headers, colRef, q, collectionName, tbody);
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

function renderTableData(id, data, headers, colRef, query, collection, tbody) {
    const row = createDataRow(headers, data, id, colRef, query, collection);
    tbody.appendChild(row);
}

async function addOrUpdateDocument(id, collectionName, collection, data) {
    if (id) {
        await updateData(id, collectionName, data);
    } else {
        await addData(collection, data);
    }
}

export async function submitForm(e, form, state, collection, headers, query, collectionName, bootstrapModal, fieldMapping) {
    e.preventDefault();
    const { submitBtn, cancelBtn } = createButtons();
    const formData = new FormData(form);
    const data = extractFormData(formData, fieldMapping);
    try {
        addOrUpdateDocument(state.currentEditId, collectionName, collection, data);
        hideModal(bootstrapModal);
        resetForm(form);
        await loadData(collection, headers, query, collectionName);
    } catch (err) {
        handleSubmissionError(err);
        showStatusModal("Error", state.currentEditId ? "Error updating data" : "Erro saving data", "error");
    } finally {
        showStatusModal("Success", state.currentEditId ? "Data has been updated" : "Data has been saved", "success");
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

    const modal = new bootstrap.Modal(currentState.ui.statusModal);
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
export function attachModalResetHandler(popupModalEl, form, state, addModalConfig) {
    popupModalEl.addEventListener('hidden.bs.modal', () => {
        resetForm(form);
        resetCurrentEditId(state);
        updateModalUI(addModalConfig);
    });
}