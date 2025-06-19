function createTableHeadEl() {
    return document.createElement("th");
}

function createTableDataEl() {
    return document.createElement("td");
}

export function createElement(name) {
    return document.createElement(name);
}

export function createTableRowEl() {
    return document.createElement("tr");
}

export function createTableHead(val) {
    const th = createTableHeadEl()
    th.textContent = val;
    return th;
}

export function createTableData(val) {
    const td = createTableDataEl();
    td.textContent = val;
    return td;
}

export function getModalById(id) {
    const modalEl = getById(id);
    if (modalEl) {
        return bootstrap.Modal.getOrCreateInstance(modalEl);
    } return null;
}

export function setDisplayStyle(el, val) {
    el.style.display = val;
}

export function getById(id) {
    return document.getElementById(id);
}

export function setValueById(id, val) {
    getById(id).value = val;
}

export function log(text) {
    console.log(text);
}

export function createOption(text, value) {
    const option = createElement("option");
    option.textContent = text;
    option.value = value;
    return option;
}

export function sort(rows, sortFieldIdx) {
    rows.sort((a, b) => {
        const valA = a.c[sortFieldIdx]?.v?.toString().toLowerCase() || "";
        const valB = b.c[sortFieldIdx]?.v?.toString().toLowerCase() || "";
        return valA.localeCompare(valB);
    });
}

