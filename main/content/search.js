// ===== CLIENT-SIDE SEARCH MODULE =====

export class ClientSearch {
    constructor() {
        this.allData = [];
        this.filteredData = [];
        this.searchFields = [];
        this.isInitialized = false;
    }

    // Initialize search with data and searchable fields
    init(data, searchableFields = []) {
        this.allData = data;
        this.filteredData = [...data];
        this.searchFields = searchableFields;
        this.isInitialized = true;
        return this;
    }

    // Main search function
    search(query, options = {}) {
        if (!this.isInitialized) {
            console.warn('Search not initialized. Call init() first.');
            return [];
        }

        if (!query || query.trim() === '') {
            this.filteredData = [...this.allData];
            return this.filteredData;
        }

        const searchOptions = {
            caseSensitive: false,
            exactMatch: false,
            searchAllFields: false,
            ...options
        };

        const normalizedQuery = searchOptions.caseSensitive ? query : query.toLowerCase();
        
        this.filteredData = this.allData.filter(item => {
            if (searchOptions.searchAllFields) {
                return this.searchAllFields(item, normalizedQuery, searchOptions);
            } else {
                return this.searchSpecificFields(item, normalizedQuery, searchOptions);
            }
        });

        return this.filteredData;
    }

    // Search across all fields in the document
    searchAllFields(item, query, options) {
        return Object.values(item).some(value => {
            if (value == null) return false;
            const stringValue = options.caseSensitive ? String(value) : String(value).toLowerCase();
            return options.exactMatch ? stringValue === query : stringValue.includes(query);
        });
    }

    // Search only specified fields
    searchSpecificFields(item, query, options) {
        const fieldsToSearch = this.searchFields.length > 0 ? this.searchFields : Object.keys(item);
        
        return fieldsToSearch.some(field => {
            const value = item[field];
            if (value == null) return false;
            const stringValue = options.caseSensitive ? String(value) : String(value).toLowerCase();
            return options.exactMatch ? stringValue === query : stringValue.includes(query);
        });
    }

    // Advanced search with multiple conditions
    advancedSearch(conditions) {
        if (!this.isInitialized) {
            console.warn('Search not initialized. Call init() first.');
            return [];
        }

        this.filteredData = this.allData.filter(item => {
            return conditions.every(condition => {
                const { field, operator, value, caseSensitive = false } = condition;
                const itemValue = item[field];
                
                if (itemValue == null) return false;
                
                switch (operator) {
                    case 'equals':
                        return caseSensitive ? itemValue === value : 
                               String(itemValue).toLowerCase() === String(value).toLowerCase();
                    case 'contains':
                        return caseSensitive ? String(itemValue).includes(value) : 
                               String(itemValue).toLowerCase().includes(String(value).toLowerCase());
                    case 'startsWith':
                        return caseSensitive ? String(itemValue).startsWith(value) : 
                               String(itemValue).toLowerCase().startsWith(String(value).toLowerCase());
                    case 'endsWith':
                        return caseSensitive ? String(itemValue).endsWith(value) : 
                               String(itemValue).toLowerCase().endsWith(String(value).toLowerCase());
                    case 'greaterThan':
                        return Number(itemValue) > Number(value);
                    case 'lessThan':
                        return Number(itemValue) < Number(value);
                    case 'greaterThanOrEqual':
                        return Number(itemValue) >= Number(value);
                    case 'lessThanOrEqual':
                        return Number(itemValue) <= Number(value);
                    default:
                        return false;
                }
            });
        });

        return this.filteredData;
    }

    // Sort results
    sort(field, direction = 'asc') {
        this.filteredData.sort((a, b) => {
            const aVal = a[field];
            const bVal = b[field];
            
            if (aVal == null && bVal == null) return 0;
            if (aVal == null) return direction === 'asc' ? -1 : 1;
            if (bVal == null) return direction === 'asc' ? 1 : -1;
            
            if (typeof aVal === 'string' && typeof bVal === 'string') {
                const comparison = aVal.localeCompare(bVal);
                return direction === 'asc' ? comparison : -comparison;
            }
            
            if (aVal < bVal) return direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return direction === 'asc' ? 1 : -1;
            return 0;
        });
        
        return this.filteredData;
    }

    // Get current filtered results
    getResults() {
        return this.filteredData;
    }

    // Get search statistics
    getStats() {
        return {
            total: this.allData.length,
            filtered: this.filteredData.length,
            searchFields: this.searchFields
        };
    }

    // Reset to show all data
    reset() {
        this.filteredData = [...this.allData];
        return this.filteredData;
    }

    // Update the dataset (when new data is loaded)
    updateData(newData) {
        this.allData = newData;
        this.filteredData = [...newData];
        return this;
    }
}

// ===== SEARCH UI HELPER FUNCTIONS =====

// Create search input HTML
export function createSearchInput(placeholder = "Search...", containerId = "searchContainer") {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`Search container with id '${containerId}' not found`);
        return null;
    }

    const searchHTML = `
        <div class="search-wrapper mb-3">
            <div class="input-group">
                <input type="text" id="searchInput" class="form-control" 
                       placeholder="${placeholder}" autocomplete="off">
                <button class="btn btn-outline-secondary" type="button" id="clearSearch">
                    Clear
                </button>
            </div>
            <div id="searchStats" class="small text-muted mt-1"></div>
        </div>
    `;
    
    container.innerHTML = searchHTML;
    return document.getElementById('searchInput');
}

// Update search statistics display
export function updateSearchStats(stats) {
    const statsElement = document.getElementById('searchStats');
    if (statsElement) {
        if (stats.filtered === stats.total) {
            statsElement.textContent = `Showing all ${stats.total} results`;
        } else {
            statsElement.textContent = `Showing ${stats.filtered} of ${stats.total} results`;
        }
    }
}

// ===== INTEGRATION WITH DATA-LOADER =====

// Enhanced table rendering function that works with search results
export function renderSearchResults(searchResults, headers, colRef, query, collection) {
    const dataTable = document.getElementById('dataTable');
    const thead = dataTable.querySelector('thead');
    const tbody = dataTable.querySelector('tbody');

    // Clear existing content
    thead.innerHTML = '';
    tbody.innerHTML = '';

    if (searchResults.length === 0) {
        tbody.innerHTML = '<tr><td colspan="100%">No results found.</td></tr>';
        return;
    }

    // Create header
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    const actionTh = document.createElement('th');
    actionTh.textContent = 'Actions';
    headerRow.appendChild(actionTh);
    thead.appendChild(headerRow);

    // Create data rows
    searchResults.forEach(item => {
        const row = document.createElement('tr');
        
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = item.data[header] ?? '';
            row.appendChild(td);
        });

        // Action buttons
        const actionTd = document.createElement('td');
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => window.showEditPopup(item.id, item.data);
        
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.onclick = () => showDeleteConfirmationPopup(item.id, colRef, headers, query, collection);
        
        actionTd.appendChild(editBtn);
        actionTd.appendChild(delBtn);
        row.appendChild(actionTd);
        
        tbody.appendChild(row);
    });
}

// Setup live search functionality
export function setupLiveSearch(clientSearch, headers, colRef, query, collection, debounceMs = 300) {
    const searchInput = document.getElementById('searchInput');
    const clearButton = document.getElementById('clearSearch');
    
    if (!searchInput) {
        console.warn('Search input not found. Make sure to call createSearchInput() first.');
        return;
    }

    let debounceTimer;

    // Live search with debouncing
    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const results = clientSearch.search(e.target.value, { searchAllFields: true });
            renderSearchResults(results, headers, colRef, query, collection);
            updateSearchStats(clientSearch.getStats());
        }, debounceMs);
    });

    // Clear search
    clearButton.addEventListener('click', () => {
        searchInput.value = '';
        const results = clientSearch.reset();
        renderSearchResults(results, headers, colRef, query, collection);
        updateSearchStats(clientSearch.getStats());
        searchInput.focus();
    });
}

// Transform Firestore snapshot data for search
export function prepareDataForSearch(snapshot) {
    const searchData = [];
    snapshot.forEach(doc => {
        searchData.push({
            id: doc.id,
            data: doc.data()
        });
    });
    return searchData;
}