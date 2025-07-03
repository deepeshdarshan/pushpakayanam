const programs = `
        <div class="container timeline-container">
            <div class="row">
                <div class="col-lg-6">
                    <div class="timeline-day timeline-day-one bg-secondary text-white">
                        <div class="day-header">
                            <h1>DAY 1 (Sep 20, 2025)</h1>
                        </div>
                        <div class="program-item">
                            <div class="program-icon bg-primary text-white"><i class="fa fa-icons"></i></div>
                            <div class="ps-4">
                                <h3>കലാപരിപാടികൾ</h3>
                                <p class="text-primary">3:00 PM</p>
                            </div>
                        </div>
                        <div class="program-item">
                            <div class="program-icon bg-primary text-white"><i class="fa fa-handshake"></i></div>
                            <div class="ps-4">
                                <h3>സമ്മേളന ഉദ്‌ഘാടനം</h3>
                                <p class="text-primary">5:00 PM</p>
                            </div>
                        </div>
                        <div class="program-item">
                            <div class="program-icon bg-primary text-white"><i class="fa fa-film"></i></div>
                            <div class="ps-4">
                                <h3>Short Film Festival</h3>
                                <p class="text-primary">10:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="timeline-day timeline-day-two bg-primary text-white">
                        <div class="day-header">
                            <h1 class="text-white">DAY 2 (Sep 21, 2025)</h1>
                        </div>
                        <div class="program-with-children">
                            <div class="program-item">
                                <div class="program-icon bg-white text-primary"><i class="fa fa-star"></i></div>
                                <div class="ps-4">
                                    <h3>പ്രതിനിധി സഭ ഉദ്‌ഘാടനം</h3>
                                    <p>09:00 AM</p>
                                </div>
                            </div>
                            <div class="program-child">
                                <div class="child-title">പ്രതിനിധി സഭ</div>
                                <div class="child-time">പ്രതിനിധി സഭ ഉദ്‌ഘാടനത്തിന് ശേഷം</div>
                            </div>
                        </div>
                        <div class="program-item">
                            <div class="program-icon bg-white text-primary"><i class="fa fa-child"></i></div>
                            <div class="ps-4">
                                <h3>ബാലകലോത്സവം (Stage 2)</h3>
                                <p>10:00 AM</p>
                            </div>
                        </div>
                        <div class="program-item">
                            <div class="program-icon bg-white text-primary"><i class="fa fa-comments"></i></div>
                            <div class="ps-4">
                                <h3>സംഘടന ചർച്ച</h3>
                                <p>2:00 PM</p>
                            </div>
                        </div>
                        <div class="program-with-children">
                            <div class="program-item">
                                <div class="program-icon bg-white text-primary"><i class="fa fa-flag-checkered"></i>
                                </div>
                                <div class="ps-4">
                                    <h3>സമാപന സമ്മേളനം</h3>
                                    <p>4:00 PM</p>
                                </div>
                            </div>
                            <div class="program-child">
                                <div class="child-title">സമ്മാനദാനം</div>
                                <div class="child-time">സമാപന സമ്മേളനത്തിന് ശേഷം</div>
                            </div>
                            <div class="program-child">
                                <div class="child-title">Lucky Draw Coupon നറുക്കെടുപ്പ്</div>
                                <div class="child-time">സമ്മാനദാനത്തിന് ശേഷം</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

const venue = `
        <div class="container-fluid bg-secondary px-0">
            <div class="row g-0">
                <div class="col-lg-6 py-6 px-6">
                    <div class="container-fluid">
                        <div class="text-center mx-auto mb-5" style="max-width: 600px;">
                            <h3 class="display-7 mb-0">How to reach the venue</h3>
                            <hr class="w-25 mx-auto bg-primary">
                        </div>
                        <div class="row g-3">
                            <div class="col-lg-6 col-md-6 transport-item">
                                <div class="service-item bg-secondary text-center px-4">
                                    <div class="d-flex align-items-center justify-content-center bg-primary text-white rounded-circle mx-auto mb-8"
                                        style="width: 90px; height: 90px;">
                                        <i class="fa fa-bus fa-2x"></i>
                                    </div>
                                    <h3 class="mb-6 mt-3">BUS</h3>
                                    <p class="mb-8">തൃശൂർ, ആലപ്പുഴ ഭാഗങ്ങളിൽ നിന്ന് വരുന്നവർ വൈറ്റില ഹബ്ബില്‍ ഇറങ്ങി
                                        തൃപ്പൂണിത്തുറ ഭാഗത്തേക്ക് പോകുന്ന ബസ്സിൽ കയറി പേട്ട ബസ്സ് സ്റ്റോപ്പിൽ
                                        ഇറങ്ങുക.
                                        കോട്ടയം ഭാഗത്ത് നിന്ന് വരുന്നവർ എറണാകുളം ഭാഗത്തേക്ക് പോകുന്ന ബസ്സിൽ കയറി
                                        പേട്ട
                                        സ്റ്റോപ്പിൽ ഇറങ്ങുക.</p>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 transport-item">
                                <div class="service-item bg-secondary text-center px-4">
                                    <div class="d-flex align-items-center justify-content-center bg-primary text-white rounded-circle mx-auto mb-8"
                                        style="width: 90px; height: 90px;">
                                        <i class="fa fa-subway fa-2x"></i>
                                    </div>
                                    <h3 class="mb-6 mt-3">METRO</h3>
                                    <p class="mb-8">തൃശൂർ, ആലപ്പുഴ ഭാഗങ്ങളിൽ നിന്ന് വരുന്നവർ വൈറ്റില ഹബ്ബില്‍ ഇറങ്ങി
                                        തൃപ്പൂണിത്തുറ ഭാഗത്തേക്ക് പോകുന്ന മെട്രോയിൽ കയറി പേട്ട മെട്രോ സ്റ്റേഷനിൽ
                                        ഇറങ്ങുക.
                                    </p>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 transport-item">
                                <div class="service-item bg-secondary text-center px-4">
                                    <div class="d-flex align-items-center justify-content-center bg-primary text-white rounded-circle mx-auto mb-8"
                                        style="width: 90px; height: 90px;">
                                        <i class="fa fa-train fa-2x"></i>
                                    </div>
                                    <h3 class="mb-6 mt-3">TRAIN</h3>
                                    <p class="mb-0">ആലപ്പുഴ ഭാഗത്തുനിന്ന് വരുന്നവർ എറണാകുളം ജംഗ്ഷൻ റെയിൽവേ
                                        സ്റ്റേഷനിൽ
                                        ഇറങ്ങി
                                        തൃപ്പൂണിത്തുറ ഭാഗത്തേക്ക് പോകുന്ന മെട്രോയിൽ കയറി പേട്ട മെട്രോ സ്റ്റേഷനിൽ
                                        ഇറങ്ങുക.
                                        തൃശ്ശൂർ ഭാഗത്തുനിന്നും വരുന്നവർ എറണാകുളം ജംഗ്ഷൻ സ്റ്റേഷനിലോ എറണാകുളം ടൗൺ
                                        സ്റ്റേഷനിലോ
                                        അല്ലെങ്കിൽ തൃപ്പൂണിത്തുറ സ്റ്റേഷനിലോ ഇറങ്ങി മെട്രോയിൽ കയറി പേട്ട മെട്രോ
                                        സ്റ്റേഷനിൽ
                                        ഇറങ്ങുക. കോട്ടയം ഭാഗത്തുനിന്ന് വരുന്നവർ തൃപ്പൂണിത്തുറ റെയിൽവേ സ്റ്റേഷനിൽ
                                        ഇറങ്ങി
                                        മെട്രോയിൽ കയറി പേട്ട മെട്രോ സ്റ്റേഷനിൽ ഇറങ്ങുക.</p>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 transport-item">
                                <div class="service-item bg-secondary text-center px-4">
                                    <div class="d-flex align-items-center justify-content-center bg-primary text-white rounded-circle mx-auto mb-8"
                                        style="width: 90px; height: 90px;">
                                        <i class="fa fa-car fa-2x"></i>
                                    </div>
                                    <h3 class="mb-6 mt-3">CAB</h3>
                                    <p class="mb-0">തൃശ്ശൂർ, ആലപ്പുഴ ഭാഗത്തുനിന്ന് സ്വന്തം വാഹനത്തിലോ ടാക്സിയിലോ
                                        വരുന്നവർ വൈറ്റിലയിൽ നിന്നും തൃപ്പൂണിത്തുറ ഭാഗത്തേക്ക് തിരിഞ്ഞ് പേട്ട ജംഗ്ഷനിൽ
                                        എത്തി മരട്, കുണ്ടന്നൂർ ഭാഗത്തേക്ക് തിരിയുക. അതുമല്ലെങ്കിൽ ഇവിടെ
                                        കൊടുത്തിരിക്കുന്ന ലൊക്കേഷൻ, ഗൂഗിൾ മാപ്പിൽ നോക്കി വരിക.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6" style="min-height: 400px;">
                    <div class="position-relative h-100">
                        <iframe class="position-relative w-100 h-100"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5280.32948442317!2d76.33112640543186!3d9.947758598483798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b08731150456e7f%3A0xdc7e71dd43af33e3!2sSreepoorna%20Auditorium!5e1!3m2!1sen!2ssg!4v1737711271700!5m2!1sen!2ssg"
                            frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false"
                            tabindex="0"></iframe>
                    </div>
                </div>
            </div>
        </div>`;

const programsEl = document.getElementById("programs-div");
const venueEl = document.getElementById("venue-div");
if (programsEl)
    document.getElementById("programs-div").innerHTML = programs;
if (venueEl)
    document.getElementById("venue-div").innerHTML = venue;

