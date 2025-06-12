import { db, getDocs, deleteDoc, doc, addDoc, updateDoc, limit, limitToLast, startAfter, endBefore, orderBy, query } from '/js/firebase.js';

let lastVisible = null;
let firstVisible = null;
let currentState = null;

function createDefaultOption() {
    return createOption("-- Select --", "");
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

function createButton(text, id, clickHandler) {
    const button = createElement('button');
    button.textContent = text;
    button.id = id;
    button.onclick = clickHandler;
    return button;
}

function createEditButton(docId, data) {
    return createButton('Edit', 'editBtn', () => showEditPopup(docId, data));
}

function createDeleteButton(docId, colRef, headers, query, collection) {
    return createButton('Delete', 'deleteBtn', () => showDeleteConfirmPopup(docId, colRef, headers, query, collection));
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
    const dataTable = document.getElementById('dataTable');
    const thead = dataTable.querySelector('thead');
    const tbody = dataTable.querySelector('tbody');
    thead.innerHTML = '';
    tbody.innerHTML = '';
    return { thead, tbody };
}

function showNoDataMessage(tbody) {
    tbody.innerHTML = '<tr><td colspan="100%">No data found.</td></tr>';
}

function hideSpinner() {
    document.getElementById("spinnerOverlay").style.display = "none";
}

export function createButtons() {
    const submitBtn = document.getElementById("submitBtn");
    const cancelBtn = document.getElementById("cancelBtn");
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
    document.getElementById("formTitle").textContent = modalConfigProp.formTitle;
    document.getElementById("submitBtn").textContent = modalConfigProp.submitButtonLabel;
}

function createModal(modalId) {
    const modalEl = document.getElementById(modalId);
    return new bootstrap.Modal(modalEl);
}

function getExistingModal(modalId) {
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

export async function addDocument(collection, document) {
    await addDoc(collection, document);
}

export async function updateDocument(docId, data, collection) {
    const docRef = doc(db, collection, docId);
    await updateDoc(docRef, data);
}

async function deleteDocument(docId, db, collection) {
    await deleteDoc(doc(db, collection, docId));
}

async function getData(query) {
    return await getDocs(query);
}


export function handleSubmissionError(err) {
    console.error("Error submitting form:", err);
}

export function populateSearchDropdown(headers) {
    const searchDropdown = document.getElementById("searchField");
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
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

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
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

    enableDeleteConfirmationPopupButtons(confirmDeleteBtn, cancelDeleteBtn);

    if (deleteId) {
        try {
            await deleteDocument(deleteId, db, collection);

            const deleteModal = getExistingModal('deleteConfirmModal');
            hideModal(deleteModal);

            await loadData(colRef, headers, query, collection);
        } catch (err) {
            console.error("Error deleting document:", err);
        } finally {
            disableDeleteConfirmationPopupButtons(confirmDeleteBtn, cancelDeleteBtn);
        }
    }
}

function renderTableBody(snapshot, headers, colRef, q, collectionName, tbody) {
    snapshot.forEach(docSnap => {
        const data = docSnap.data();
        renderTableData(docSnap.id, data, headers, colRef, q, collectionName, tbody);
    });
}

function updatePageInfo() {
    document.getElementById("pageInfo").textContent = `Page ${currentState.page.currentPage}`;
    document.getElementById("prevPageBtn").disabled = currentState.page.isOnFirstPage;
    document.getElementById("nextPageBtn").disabled = currentState.page.isOnLastPage;
}

export async function loadNext(colRef, headers, collectionName) {
    const q = query(colRef, orderBy(headers[1]), startAfter(lastVisible), limit(currentState.page.size));
    currentState.page.isOnFirstPage = false;
    currentState.page.currentPage++;
    await loadData(colRef, headers, q, collectionName);
}

export async function loadPrev(colRef, headers, collectionName) {
    const q = query(colRef, orderBy(headers[1]), endBefore(firstVisible), limitToLast(currentState.page.size));
    currentState.page.currentPage--;
    currentState.page.isOnFirstPage = currentState.page.currentPage === 1;
    currentState.page.isOnLastPage = false;
    await loadData(colRef, headers, q, collectionName);
}

export async function loadData(colRef, headers, q, collectionName, state) {
    if (state) currentState = state;
    const { thead, tbody } = createTable();
    const paginationContainer = document.getElementById("paginationNavContainer");
    setupGlobalDeleteConfirmation();
    try {
        const snapshot = await getData(q);
        if (snapshot.empty) {
            paginationContainer.style.display = "none";
            showNoDataMessage(tbody);
            return;
        } else {
            paginationContainer.style.display = "block";
        }
        if (snapshot.docs.length < currentState.page.size) {
            currentState.page.isOnLastPage = true;
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

// ===== GENERIC FORM SUBMISSION HANDLER =====
export async function handleFormSubmission(e, form, state, colRef, headers, query, collection, bootstrapModal, extractFormDataFn) {
    e.preventDefault();

    const { submitBtn, cancelBtn } = createButtons();
    const formData = new FormData(form);
    const newEntry = extractFormDataFn(formData);

    try {
        if (state.currentEditId) {
            await updateDocument(state.currentEditId, newEntry, collection);
        } else {
            await addDocument(colRef, newEntry);
        }

        hideModal(bootstrapModal);
        resetForm(form);
        await loadData(colRef, headers, query, collection);

    } catch (err) {
        handleSubmissionError(err);
    } finally {
        enableButtons(submitBtn, cancelBtn);
    }
}

// ===== GENERIC POPUP FUNCTIONS =====

export function showWarningModal(title, message) {
    document.getElementById('statusModalLabel').textContent = title;
    document.getElementById('statusModalBody').textContent = message;
    const modal = new bootstrap.Modal(document.getElementById('statusModal'));
    modal.show();
}


export function showAddPopup(state, bootstrapModal, addModalConfig) {
    resetCurrentEditId(state);
    updateModalUI(addModalConfig);
    showModal(bootstrapModal);
}

export function showEditPopupGeneric(id, data, bootstrapModal, form, state, editModalConfig, populateFormFn) {
    setCurrentEditId(state, id);
    updateModalUI(editModalConfig);
    populateFormFn(form, data);
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