const topbarHTML = `
<div class="container-fluid bg-secondary ps-5 pe-0 d-none d-lg-block">
            <div class="row gx-0">
                <div class="col-md-6 text-center text-lg-start mb-2 mb-lg-0">
                    <div class="d-inline-flex align-items-center">
                        <a class="text-body py-2 pe-3 border-end" href="yuvavedi/index.html"><small>Yuvavedi</small></a>
                    </div>
                </div>
                <div class="col-md-6 text-center text-lg-end">
                    <div
                        class="position-relative d-inline-flex align-items-center bg-primary text-white top-shape px-5">
                        <div class="me-3 pe-3 border-end py-2">
                            <p class="m-0"><i class="fa fa-envelope-open me-2"></i>yuvavedi.ekm@gmail.com</p>
                        </div>
                        <div class="py-2">
                            <p class="m-0"><i class="fa fa-phone-alt me-2"></i>+91-00000 00000</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
`;

const navbarHTML = `
<nav class="navbar navbar-expand-lg bg-white navbar-light shadow-sm px-1 py-3 py-lg-0">
    <img src="img/logo.png" class="responsive-logo">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
        <div class="navbar-nav ms-auto py-0 me-n3">
        <a href="index.html" class="nav-item nav-link">Home</a>
            <a href="program.html" class="nav-item nav-link">Programs</a>
            <div class="nav-item dropdown">
                <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Announcements</a>
                <div class="dropdown-menu m-0">
                    <a href="logo_reveal.html" class="dropdown-item">ലോഗോ പ്രകാശനം</a>
                    <a href="vishu_contest.html" class="dropdown-item">വിഷു ഫോട്ടോഗ്രാഫി മത്സരം</a>
                    <a href="reels.html" class="dropdown-item">റീൽസ് മത്സരം</a>
                    <a href="orgcomfly.html" class="dropdown-item">സ്വാഗതസംഘ രൂപീകരണം</a>
                    <a href="naming_contest.html" class="dropdown-item">നാമനിർദ്ദേശ മത്സരം</a>
                </div>
            </div>
            <a href="location.html" class="nav-item nav-link">Venue</a>
            <div class="nav-item dropdown">
                <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Gallery</a>
                <div class="dropdown-menu m-0">
                    <a href="orgcom.html" class="dropdown-item">സ്വാഗതസംഘം രൂപീകരണം</a>
                </div>
            </div>
            <a href="team.html" class="nav-item nav-link">Our Team</a>
            <a href="contact.html" class="nav-item nav-link">Contact Us</a>
        </div>
    </div>
</nav>
`;

const footerHTML = `
<div class="container-fluid bg-dark text-secondary p-5">
        <div class="row g-5">
            <div class="col-lg-2 col-md-6">
                <h3 class="text-white mb-4">Quick Links</h3>
                <div class="d-flex flex-column justify-content-start">
                    <a class="text-secondary mb-2" href="index.html"><i class="bi bi-arrow-right text-primary me-2"></i>Home</a>
                    <a class="text-secondary mb-2" href="team.html"><i class="bi bi-arrow-right text-primary me-2"></i>Our team</a>
                    <a class="text-secondary mb-2" href="program.html"><i class="bi bi-arrow-right text-primary me-2"></i>Programs</a>
                    <a class="text-secondary mb-2" href="location.html"><i class="bi bi-arrow-right text-primary me-2"></i>How to reach</a>
                    <a class="text-secondary" href="contact.html"><i class="bi bi-arrow-right text-primary me-2"></i>Contact Us</a>
                </div>
            </div>
            <div class="col-lg-2 col-md-6">
                <h3 class="text-white mb-4">Favourite Links</h3>
                <div class="d-flex flex-column justify-content-start">
                    <a class="text-secondary mb-2" href="orgcom.html"><i class="bi bi-arrow-right text-primary me-2"></i>സ്വാഗതസംഘ രൂപീകരണം ഫോട്ടോസ്</a>
                    <a class="text-secondary mb-2" href="reels.html"><i class="bi bi-arrow-right text-primary me-2"></i>റീൽസ് മത്സരം</a>
                    <a class="text-secondary mb-2" href="naming_contest.html"><i class="bi bi-arrow-right text-primary me-2"></i>നാമനിർദ്ദേശ മത്സരം</a>
                </div>
            </div>
            <div class="col-lg-2 col-md-6">
                <h3 class="text-white mb-4">External Links</h3>
                <div class="d-flex flex-column justify-content-start">
                    <a class="text-secondary mb-2" href="yuvavedi/index.html"><i class="bi bi-arrow-right text-primary me-2"></i>Yuvavedi</a>
                </div>
            </div>
            <div class="col-lg-2 col-md-6">
                <h3 class="text-white mb-4">Get In Touch</h3>
                <p class="mb-2"><i class="bi bi-geo-alt text-primary me-2"></i>SPSS EKM Jilla Committe</p>
                <p class="mb-2"><i class="bi bi-envelope-open text-primary me-2"></i>yuvavedi.ekm@gmail.com</p>
                <p class="mb-0"><i class="bi bi-telephone text-primary me-2"></i>+91-00000 00000</p>
            </div>
            <div class="col-lg-2 col-md-6">
                <h3 class="text-white mb-4">Follow Us</h3>
                <div class="d-flex">
                    <a class="btn btn-lg btn-primary btn-lg-square rounded-circle me-2"
                        href="https://www.youtube.com/@YuvavediErnakulam" target="_blank"><i class="fab fa-youtube fw-normal"></i></a>
                    <a class="btn btn-lg btn-primary btn-lg-square rounded-circle me-2" href="https://www.facebook.com/groups/224314291078396" target="_blank"><i class="fab fa-facebook-f fw-normal"></i></a>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid bg-dark text-secondary text-center border-top py-4 px-5"
        style="border-color: rgba(256, 256, 256, .1) !important;">
        <p class="m-0">&copy; <a class="text-secondary border-bottom" href="#">pushpakayanam.com</a>. All Rights Reserved.
    </div>
`;

document.getElementById("topbar-container").innerHTML = topbarHTML;
document.getElementById("navbar-container").innerHTML = navbarHTML;
document.getElementById("footer-container").innerHTML = footerHTML;