import { db, getDocs, deleteDoc, doc, addDoc, updateDoc } from '/js/firebase.js';

// ===== DOM UTILITIES =====
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

function createEditButton(docId, data) {
    const editBtn = createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.id = "editBtn";
    editBtn.onclick = () => showEditPopup(docId, data);
    return editBtn;
}

function createDeleteButton(docId, colRef, headers, query, collection) {
    const delBtn = createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.id = "deleteBtn";
    delBtn.onclick = () => showDeletePopup(docId, colRef, headers, query, collection);
    return delBtn;
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

function clearTable() {
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

// ===== BUTTON STATE MANAGEMENT =====
export function disableButtons() {
    const submitBtn = document.getElementById("submitBtn");
    const cancelBtn = document.getElementById("cancelBtn");
    submitBtn.disabled = true;
    cancelBtn.disabled = true;
    return { submitBtn, cancelBtn };
}

export function enableButtons(submitBtn, cancelBtn) {
    submitBtn.disabled = false;
    cancelBtn.disabled = false;
}

// ===== MODAL UTILITIES =====
export function updateModalUI(modalConfigProp) {
    document.getElementById("formTitle").textContent = modalConfigProp.formTitle;
    document.getElementById("submitBtn").textContent = modalConfigProp.submitButtonLabel;
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

// ===== STATE MANAGEMENT =====
export function resetState(state) {
    state.currentEditId = null;
}

export function setEditState(state, id) {
    state.currentEditId = id;
}

// ===== DATABASE OPERATIONS =====
export async function addNewEntry(colRef, entryData) {
    await addDoc(colRef, entryData);
}

export async function updateExistingEntry(editId, entryData, collection) {
    const docRef = doc(db, collection, editId);
    await updateDoc(docRef, entryData);
}

// ===== ERROR HANDLING =====
export function handleSubmissionError(err) {
    console.error("Error submitting form:", err);
    alert("An error occurred while submitting the form. Please try again.");
}

export function populateSearchDropdown(headers) {
    const searchField = document.getElementById("searchField");
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "-- Select --";
    searchField.appendChild(option);
    headers.forEach(header => {
        const option = document.createElement("option");
        option.value = header;
        option.textContent = header;
        searchField.appendChild(option);
    });
}

// ===== DELETE FUNCTIONALITY =====
export function showDeleteConfirmationPopupGeneric(docId, colRef, headers, query, collection, deleteModal) {
    window.currentDeleteInfo = {
        id: docId,
        colRef: colRef,
        headers: headers,
        query: query,
        collection: collection
    };
    deleteModal.show();
}

function setupGlobalDeleteConfirmation() {
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

    if (!confirmDeleteBtn.hasAttribute('data-listener-added')) {
        confirmDeleteBtn.setAttribute('data-listener-added', 'true');

        confirmDeleteBtn.addEventListener('click', async () => {
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
        });
    }
}

async function handleDeleteConfirmation(deleteId, colRef, headers, query, collection) {
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

    confirmDeleteBtn.disabled = true;
    cancelDeleteBtn.disabled = true;

    if (deleteId) {
        try {
            await deleteDoc(doc(db, collection, deleteId));

            const deleteModalEl = document.getElementById('deleteConfirmModal');
            const deleteModal = bootstrap.Modal.getInstance(deleteModalEl);
            deleteModal.hide();

            await loadData(colRef, headers, query, collection);
        } catch (err) {
            console.error("Error deleting document:", err);
        } finally {
            confirmDeleteBtn.disabled = false;
            cancelDeleteBtn.disabled = false;
        }
    }
}

// let paginationState = {
//     currentPage: 1,
//     lastVisible: null,
//     firstVisible: null,
//     pageSize: 10,
//     pageStack: [],
// };

// const nextBtn = document.getElementById('nextPageBtn');
// const prevBtn = document.getElementById('prevPageBtn');
// const pageInfo = document.getElementById('pageInfo');

// // Pagination Event Listeners
// if (nextBtn && prevBtn) {
//     nextBtn.addEventListener('click', () => loadPaginatedData(paginationState.collection, paginationState.headers));
//     prevBtn.addEventListener('click', () => loadPreviousPage());
// }


// export async function loadPaginatedData(collectionRef, headers) {
//     const { thead, tbody } = clearTable();
//     setupGlobalDeleteConfirmation();

//     let colQuery = query(collectionRef, limit(paginationState.pageSize));
//     if (paginationState.lastVisible) {
//         colQuery = query(collectionRef, startAfter(paginationState.lastVisible), limit(paginationState.pageSize));
//     }

//     try {
//         const snapshot = await getDocs(colQuery);
//         if (snapshot.empty) {
//             showNoDataMessage(tbody);
//             return;
//         }

//         const docs = snapshot.docs;
//         paginationState.firstVisible = docs[0];
//         paginationState.lastVisible = docs[docs.length - 1];

//         // Push page stack
//         paginationState.pageStack.push(paginationState.firstVisible);
//         paginationState.currentPage++;

//         // UI updates
//         pageInfo.textContent = `Page ${paginationState.currentPage}`;
//         prevBtn.disabled = paginationState.pageStack.length <= 1;
//         nextBtn.disabled = docs.length < paginationState.pageSize;

//         const headerRow = createTableHeader(headers);
//         thead.appendChild(headerRow);

//         docs.forEach(docSnap => {
//             const data = docSnap.data();
//             const row = createDataRow(headers, data, docSnap.id, collectionRef, null, collectionRef.id);
//             tbody.appendChild(row);
//         });

//     } catch (err) {
//         console.error("Pagination error:", err);
//     } finally {
//         hideSpinner();
//     }
// }


// async function loadPreviousPage() {
//     if (paginationState.pageStack.length < 2) return;

//     paginationState.pageStack.pop(); // Remove current
//     const prevStart = paginationState.pageStack[paginationState.pageStack.length - 1];

//     const { thead, tbody } = clearTable();
//     setupGlobalDeleteConfirmation();

//     let colQuery = query(paginationState.collection, startAfter(prevStart), limit(paginationState.pageSize));

//     try {
//         const snapshot = await getDocs(colQuery);
//         if (snapshot.empty) {
//             showNoDataMessage(tbody);
//             return;
//         }

//         const docs = snapshot.docs;
//         paginationState.firstVisible = docs[0];
//         paginationState.lastVisible = docs[docs.length - 1];

//         paginationState.currentPage--;
//         pageInfo.textContent = `Page ${paginationState.currentPage}`;
//         prevBtn.disabled = paginationState.pageStack.length <= 1;
//         nextBtn.disabled = docs.length < paginationState.pageSize;

//         const headerRow = createTableHeader(paginationState.headers);
//         thead.appendChild(headerRow);

//         docs.forEach(docSnap => {
//             const data = docSnap.data();
//             const row = createDataRow(paginationState.headers, data, docSnap.id, paginationState.collection, null, paginationState.collection.id);
//             tbody.appendChild(row);
//         });

//     } catch (err) {
//         console.error("Previous page error:", err);
//     } finally {
//         hideSpinner();
//     }
// }


// // Entry point to start pagination
// export function initPaginatedLoad(colRef, headers) {
//     paginationState = {
//         ...paginationState,
//         collection: colRef,
//         headers: headers,
//         currentPage: 0,
//         lastVisible: null,
//         firstVisible: null,
//         pageStack: []
//     };

//     loadPaginatedData(colRef, headers);
// }

// ===== MAIN DATA LOADING FUNCTION =====
export async function loadData(colRef, headers, query, collection) {
    const { thead, tbody } = clearTable();

    setupGlobalDeleteConfirmation();

    try {
        const snapshot = await getDocs(query);
        if (snapshot.empty) {
            showNoDataMessage(tbody);
            return;
        }
        const headerRow = createTableHeader(headers);
        thead.appendChild(headerRow);
        snapshot.forEach(docSnap => {
            const data = docSnap.data();
            const row = createDataRow(headers, data, docSnap.id, colRef, query, collection);
            tbody.appendChild(row);
        });
    } catch (err) {
        console.error("Error loading data:", err);
    } finally {
        hideSpinner();
    }
}

// ===== GENERIC FORM SUBMISSION HANDLER =====
export async function handleFormSubmission(e, form, state, colRef, headers, query, collection, bootstrapModal, extractFormDataFn) {
    e.preventDefault();

    const { submitBtn, cancelBtn } = disableButtons();
    const formData = new FormData(form);
    const newEntry = extractFormDataFn(formData);

    try {
        if (state.currentEditId) {
            await updateExistingEntry(state.currentEditId, newEntry, collection);
        } else {
            await addNewEntry(colRef, newEntry);
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
    resetState(state);
    updateModalUI(addModalConfig);
    showModal(bootstrapModal);
}

export function showEditPopupGeneric(id, data, bootstrapModal, form, state, editModalConfig, populateFormFn) {
    setEditState(state, id);
    updateModalUI(editModalConfig);
    populateFormFn(form, data);
    showModal(bootstrapModal);
}

export function hidePopup(state, bootstrapModal) {
    resetState(state);
    hideModal(bootstrapModal);
}

// ===== MODAL EVENT HANDLER SETUP =====
export function attachModalResetHandler(popupModalEl, form, state, addModalConfig) {
    popupModalEl.addEventListener('hidden.bs.modal', () => {
        resetForm(form);
        resetState(state);
        updateModalUI(addModalConfig);
    });
}