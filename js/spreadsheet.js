import {
  createOption,
  createElement,
  createTableRowEl,
  createTableHead,
  createTableData,
  getModalById,
  getById,
  setValueById,
  sort,
  log,
} from "/js/dom-utils.js";
import { domElements, populatePageHeader } from "/js/admin-dom-generator.js";

const EMPTY_STRING = "";
const NO_SORT_OPTION_SELECTED = "-1";
const NO_SEARCH_OPTION_SELECTED = EMPTY_STRING;

let sheetId = null;
let columnSettings = null;
let currentPage = 1;
let isFirstPage = true;
let isLastPage = false;
let rowIdx = 1;
let pageTitle = null;

let paginationEnabled = true;
let searchEnabled = true;
let columnSelectionEnabled = true;
let sortEnabled = true;

function resetCurrentPage() {
  currentPage = 1;
}

function resetRowIdx() {
  rowIdx = 1;
}

function setRowIdx(value) {
  rowIdx = value;
}

function getPageSize() {
  return getById("pageSizeSelect")?.value;
}

function getSearchField() {
  return getById("searchField")?.value;
}

function getSearchQuery() {
  return getById("searchQuery")?.value?.trim();
}

function showSpinner() {
  const spinner = getModalById("spinnerModal");
  if (spinner) {
    spinner.show();
  } else {
    log("Spinner is not defined.");
  }
}

function hideSpinner() {
  const spinner = getModalById("spinnerModal");
  if (spinner) {
    setTimeout(() => spinner.hide(), 200);
  } else {
    log("Spinner is not defined.");
  }
}

function showAlert(title, message) {
  const alertModal = getModalById("alertModal");
  if (alertModal) {
    getById("alertTitle").textContent = title;
    getById("alertMessage").textContent = message;
    alertModal.show();
  } else {
    log("AlertModal is not defined.");
  }
}

function renderSearchOptions() {
  if (searchEnabled) {
    const searchField = getById("searchField");
    searchField.innerHTML = EMPTY_STRING;
    searchField.appendChild(
      createOption("Search by...", NO_SEARCH_OPTION_SELECTED)
    );
    columnSettings.forEach((field) => {
      if (field.enabled) {
        const option = createOption(field.displayName, field.columnKey);
        searchField.appendChild(option);
      }
    });
  }
}

function renderSortOptions() {
  if (sortEnabled) {
    let idx = 0;
    const sortField = getById("sortField");
    sortField.innerHTML = EMPTY_STRING;
    sortField.appendChild(createOption("Sort by...", NO_SORT_OPTION_SELECTED));
    columnSettings.forEach((col) => {
      if (col.enabled) {
        const option = createOption(col.displayName, idx);
        sortField.appendChild(option);
        idx++;
      }
    });
  }
}

function renderPaginationControls() {
  if (paginationEnabled) {
    const prevBtn = getById("prevBtn");
    const nextBtn = getById("nextBtn");
    const info = getById("pageInfo");
    info.textContent = `Page ${currentPage}`;

    prevBtn.classList.toggle("disabled", isFirstPage);
    prevBtn.disabled = isFirstPage;

    nextBtn.classList.toggle("disabled", isLastPage);
    nextBtn.disabled = isLastPage;
  }
}

function renderCheckboxDropdown() {
  if (columnSelectionEnabled) {
    const container = getById("checkboxDropdownMenu");
    container.innerHTML = EMPTY_STRING;
    columnSettings.forEach((col, index) => {
      if (col.columnKey === EMPTY_STRING) return;
      const li = createElement("li");
      li.classList.add("px-2");
      li.innerHTML = `
            <div class="form-check w-100 w-md-atuo">
                <input class="form-check-input 
                field-option" type="checkbox" 
                value="${col.columnKey}" 
                id="field-${index}" 
                ${col.enabled ? "checked" : EMPTY_STRING}>
                <label class="form-check-label" for="field-${index}">
                    ${col.displayName}
                </label>
            </div>
            `;
      container.appendChild(li);
    });
  }
}

function populateTableHead(cols) {
  const tr = createTableRowEl();
  const th = createTableHead("#");
  tr.appendChild(th);
  cols.forEach((col) => {
    const columnSetting = columnSettings.find(
      (setting) => setting.columnKey === col.id
    );
    const th = createTableHead(columnSetting?.displayName);
    tr.appendChild(th);
  });
  return tr;
}

function populateTableCells(tr, cells) {
  cells.forEach((cell) => {
    const td = createTableData(cell?.v ?? EMPTY_STRING);
    tr.appendChild(td);
  });
}

function renderData(json) {
  const thead = document.querySelector("#sheetTable thead");
  const tbody = document.querySelector("#sheetTable tbody");

  if (thead && tbody) {
    thead.innerHTML = EMPTY_STRING;
    tbody.innerHTML = EMPTY_STRING;

    const headerRow = populateTableHead(json.table.cols);
    thead.appendChild(headerRow);

    const sortFieldIdx = getById("sortField").value;

    if (sortFieldIdx !== NO_SORT_OPTION_SELECTED)
      sort(json.table.rows, sortFieldIdx);

    json.table.rows.forEach((row) => {
      const tr = createTableRowEl();
      const td = createTableData(rowIdx);
      tr.appendChild(td);
      populateTableCells(tr, row.c);
      tbody.appendChild(tr);
      rowIdx++;
    });
  } else {
    console.log("Either thead of tbody is not defined.");
  }
}

function buildQuery() {
  let sql = "SELECT ";

  // 1. Handle column visibility
  if (columnSelectionEnabled) {
    const selectedFields = Array.from(
      document.querySelectorAll("#checkboxDropdownMenu .field-option:checked")
    ).map((cb) => cb.value);
    const defaultColumns = columnSettings.map((col) => col.columnKey);
    sql += (selectedFields.length > 0 ? selectedFields : defaultColumns).join(
      ","
    );
  } else {
    // Always select all fields if column visibility is off
    sql += columnSettings.map((col) => col.columnKey).join(",");
  }

  // 2. Handle search filter
  if (searchEnabled) {
    const field = getSearchField();
    const query = getSearchQuery();
    if (field && query) {
      sql += ` WHERE LOWER(${field}) CONTAINS LOWER('${query}')`;
    }
  }

  // 3. Handle pagination
  if (paginationEnabled) {
    const pageSize = getPageSize();
    const offset = (currentPage - 1) * pageSize;
    sql += ` LIMIT ${pageSize} OFFSET ${offset}`;
  }

  return encodeURIComponent(sql);
}

function fetchAndRenderData() {
  showSpinner();
  const pageSize = getPageSize();
  const query = buildQuery();
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tq=${query}`;

  fetch(sheetUrl)
    .then((res) => res.text())
    .then((text) => {
      const json = JSON.parse(text.substr(47).slice(0, -2));
      renderData(json);
      isLastPage = json.table.rows.length < pageSize;
      isFirstPage = currentPage === 1;
      renderPaginationControls();
    })
    .catch((err) => console.error("Error fetching data:", err))
    .finally(() => {
      hideSpinner();
    });
}

function attachEventHandlers() {
  const prevPageLi = getById("prevPageLi");
  const nextPageLi = getById("nextPageLi");
  const searchBtn = getById("searchBtn");
  const resetBtn = getById("resetBtn");
  const sortBtn = getById("sortBtn");
  const checkboxDropdownMenu = getById("checkboxDropdownMenu");
  const pageSizeSelect = getById("pageSizeSelect");

  if (prevPageLi) {
    prevPageLi.addEventListener("click", () => {
      prevPageLiClickHandler();
    });
  }

  if (nextPageLi) {
    nextPageLi.addEventListener("click", () => {
      nextPageLiClickHandler();
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      searchButtonClickHandler();
    });
  }

  if (pageSizeSelect) {
    pageSizeSelect.addEventListener("change", () => {
      pageSizeChangeHandler();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      resetButtonClickHandler();
    });
  }

  if (sortBtn) {
    sortBtn.addEventListener("click", () => {
      sortButtonClickHandler();
    });
  }

  if (checkboxDropdownMenu) {
    checkboxDropdownMenu.addEventListener("change", (e) => {
      const target = e.target;
      checkboxDropdownChangeListener(target);
    });
  }
}

export function renderDom(isSpreadSheet = true, title = null) {
  getById("navbar").innerHTML = domElements.navbar;
  getById("topbar").innerHTML = domElements.topbar;
  getById("pageHeader").innerHTML = populatePageHeader(title || pageTitle);
  if (isSpreadSheet) {
    getById("pagination-controls").innerHTML = domElements.paginationControls;
    getById("data-filter-controls").innerHTML = domElements.dataFilterControls;
    getById("spinner-modal").innerHTML = domElements.spinnerModal;
    getById("warning-modal").innerHTML = domElements.warningModal;
    getById("data-table").innerHTML = domElements.dataTable;
  }
}

export function prevPageLiClickHandler() {
  if (currentPage > 1) {
    currentPage--;
    const pageSize = getPageSize();
    setRowIdx(currentPage * pageSize - (pageSize - 1));
    fetchAndRenderData();
  }
}

export function nextPageLiClickHandler() {
  if (!isLastPage) {
    currentPage++;
    fetchAndRenderData();
  }
}

export function searchButtonClickHandler() {
  const field = getSearchField();
  const query = getSearchQuery();
  if (!field || !query) {
    showAlert("Alert", "Please select a select field and enter a search text.");
    return;
  }
  resetCurrentPage();
  resetRowIdx();
  fetchAndRenderData();
}

export function pageSizeChangeHandler() {
  resetCurrentPage();
  resetRowIdx();
  fetchAndRenderData();
}

export function resetButtonClickHandler() {
  setValueById("searchField", NO_SEARCH_OPTION_SELECTED);
  setValueById("searchQuery", EMPTY_STRING);
  setValueById("sortField", NO_SORT_OPTION_SELECTED);
  setValueById("pageSizeSelect", "25");
  resetCurrentPage();
  resetRowIdx();
  renderCheckboxDropdown();
  fetchAndRenderData();
}

export function sortButtonClickHandler() {
  const sortField = getById("sortField").value;
  if (sortField == NO_SORT_OPTION_SELECTED) {
    showAlert("Alert", "Please select a sort field.");
    return;
  }
  const pageSize = getPageSize();
  const offset = (currentPage - 1) * pageSize;
  setRowIdx(offset + 1);
  fetchAndRenderData();
}

export function checkboxDropdownChangeListener(target) {
  if (target && target.matches(".form-check-input")) {
    const columnSetting = columnSettings.find(
      (f) => f.columnKey === target.value
    );
    if (columnSetting) {
      columnSetting.enabled = target.checked;
    }
    renderSearchOptions();
    renderSortOptions();
    fetchAndRenderData();
    resetCurrentPage();
    resetRowIdx();
    setValueById("searchQuery", NO_SEARCH_OPTION_SELECTED);
  }
}

export function init(state) {
  sheetId = state.settings.tableSettings.id;
  columnSettings = state.settings.tableSettings.columnSettings;
  paginationEnabled = state.settings.uiSettings.paginationEnabled;
  searchEnabled = state.settings.uiSettings.searchEnabled;
  columnSelectionEnabled = state.settings.uiSettings.columnSelectionEnabled;
  sortEnabled = state.settings.uiSettings.sortEnabled;
  pageTitle = state.settings.pageSettings.pageTitle;
  renderDom();
  attachEventHandlers();
  renderSearchOptions();
  renderSortOptions();
  renderCheckboxDropdown();
  fetchAndRenderData();
}
