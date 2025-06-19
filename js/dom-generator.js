let paginationEnabled = true;
let searchEnabled = true;
let columnSelectionEnabled = true;
let sortEnabled = true;

export const adminPage = {

    spinnerModal: `
        <div class="modal fade" id="spinnerModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static"
            data-bs-keyboard="false">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content bg-transparent border-0 shadow-none">
                    <div class="modal-body text-center">
                        <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <div class="mt-3 text-white fw-semibold">Please wait...</div>
                    </div>
                </div>
            </div>
        </div>`,

    warningModal: `
        <div class="modal fade" id="alertModal" tabindex="-1" aria-labelledby="alertTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border border-warning">
                    <div class="modal-header bg-warning text-white">
                        <h5 class="modal-title" id="alertTitle">Warning</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body bg-light bg-white font-weight-bold" id="alertMessage">
                        Your message goes here.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" data-bs-dismiss="modal">OK</button>
                    </div>
                </div>
            </div>
        </div>`,

    dataTable: `
        <table id="sheetTable">
            <thead></thead>
            <tbody></tbody>
        </table>`,

    seperator: `<div class="vr d-none d-md-block mx-2"></div>`,

    dataFilterControls: `<div class="d-flex flex-wrap align-items-center gap-2 control-group">
                    <div class="dropdown w-md-auto">
                        <button class="form-select text-start h-43p w-100 w-md-auto" type="button"
                            id="checkboxDropdownBtn" data-bs-toggle="dropdown" aria-expanded="false">
                            Visible columns
                        </button>
                        <ul class="dropdown-menu w-100" aria-labelledby="checkboxDropdownBtn" id="checkboxDropdownMenu">
                        </ul>
                    </div>

                    <!-- Separator -->
                    <div class="vr d-none d-md-block mx-2"></div>

                    <div class="col-12 col-md-auto">
                        <select id="searchField" class="form-select w-100 w-md-auto"></select>
                    </div>
                    <div class="col-12 col-md-auto">
                        <input type="text" id="searchQuery" class="form-control" placeholder="Search text..." />
                    </div>
                    <div class="col-12 col-md-auto">
                        <button id="searchBtn" class="btn btn-outline-danger w-100">Search</button>
                    </div>
                    <!-- Separator -->
                    <div class="vr d-none d-md-block mx-2"></div>
                    <div class="col-12 col-md-auto">
                        <select id="sortField" class="form-select w-100 w-md-auto"></select>
                    </div>
                    <div class="col-12 col-md-auto">
                        <button id="sortBtn" class="btn btn-outline-danger w-100">Sort</button>
                    </div>
                    <!-- Separator -->
                    <div class="vr d-none d-md-block mx-2"></div>
                    <div class="col-12 col-md-auto">
                        <button id="resetBtn" class="btn btn-outline-dark w-100">Reset</button>
                    </div>
                </div>`,


    paginationControls: `
                    <div class="d-flex flex-wrap flex-md-nowrap align-items-center gap-2 control-group">
                        <div>
                            Page size:
                        </div>
                        <div>
                            <select id="pageSizeSelect" class="form-select w-100 w-md-auto">
                                <option value="10">10</option>
                                <option value="25" selected>25</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                        <!-- Separator -->
                        <div class="vr d-none d-md-block mx-2"></div>
                        <div class="col-12 col-md-auto">
                            <nav aria-label="Page navigation">
                                <ul class="pagination stylish-pagination mb-0">
                                    <li class="page-item" id="prevPageLi">
                                        <button class="page-link" id="prevBtn">&laquo;</button>
                                    </li>
                                    <li class="page-item active" id="pageInfoLi">
                                        <span class="page-link" id="pageInfo">Page 1</span>
                                    </li>
                                    <li class="page-item" id="nextPageLi">
                                        <button class="page-link" id="nextBtn">&raquo;</button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>`,

    pageHeader: `
                <div id="page-header" class="container-fluid bg-dark py-4 px-3 shadow">
                    <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">
                        <div class="text-white text-center text-md-start mb-3 mb-md-0">
                            <h1 class="fw-bold mb-1 fs-3 text-white" id="page-title">Naming Contest</h1>
                            <div id="breadcrumb-container" class="small ">
                                <a href="#" class="text-primary text-decoration-none">Home</a>
                                <i class="bi bi-exclude text-primary px-2"></i>
                                <a href="#" class="text-primary text-decoration-none">Naming contest</a>
                            </div>
                        </div>
                        <div class="text-white text-center text-md-end">
                            <div id="userEmail" class="small text-truncate mx-auto mx-md-0" style="max-width: 250px;">
                                pushpakayanam2025@gmail.com
                            </div>
                            <button id="logoutBtn"
                                class="btn btn-sm btn-warning text-dark fw-semibold rounded-pill px-4 mt-2 mx-auto mx-md-0">
                            Logout
                            </button>
                        </div>
                    </div>
                </div>`,

    navbar: `
            <nav class="navbar navbar-expand-lg bg-white navbar-light shadow-sm px-3 py-2">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">
                        <img src="/img/logo.png" class="img-fluid" style="max-width: 250px;" alt="Logo">
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarCollapse">
                        <div class="navbar-nav ms-auto py-0">
                            <a href="/main/admin/dashboard.html" class="nav-item nav-link">Dashboard</a>
                            <div class="nav-item dropdown">
                                <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Contest</a>
                                <div class="dropdown-menu m-0">
                                    <a href="/main/admin/naming-contest.html" class="dropdown-item">Naming Contest</a>
                                    <a href="/main/admin/vishu-contest.html" class="dropdown-item">Vishu Contest</a>
                                    <a href="/main/admin/souvenir-contest.html" class="dropdown-item">Souvenir Contest</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>`,

    topbar: `
            <div class="container-fluid bg-secondary ps-5 pe-0 d-none d-lg-block">
                <div class="row gx-0">
                    <div class="col-md-6 text-center text-lg-start mb-2 mb-lg-0">
                        <div class="d-inline-flex align-items-center">
                            <a class="text-body py-2 pe-3 border-end" href="yuvavedi/index.html"><small></small></a>
                        </div>
                    </div>
                    <div class="col-md-6 text-center text-lg-end">
                        <div
                            class="position-relative d-inline-flex align-items-center bg-primary text-white top-shape px-5">
                            <div class="me-3 pe-3 border-end py-2">
                                <p class="m-0"><i class="fa fa-envelope-open me-2"></i>pushpakayanam2025@gmail.com</p>
                            </div>
                            <div class="py-2">
                                <p class="m-0"><i class="fa fa-phone-alt me-2"></i>+91-00000 00000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`

}

function init(state) {
    paginationEnabled = state.settings.uiSettings.paginationEnabled;
    searchEnabled = state.settings.uiSettings.searchEnabled;
    columnSelectionEnabled = state.settings.uiSettings.columnSelectionEnabled;
    sortEnabled = state.settings.uiSettings.sortEnabled;

}