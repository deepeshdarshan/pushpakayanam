function getProgramDetails() {
    return `
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
}

function getVenueDetails() {
    return `
        <div class="container-fluid bg-white px-0">
            <div class="row g-0">
                <div class="col-lg-6 py-6 px-6">
                    <div class="container-fluid">
                        <div class="text-center mx-auto mb-5" style="max-width: 600px;">
                            <h3 class="display-7 mb-0">How to reach the venue</h3>
                            <hr class="w-25 mx-auto bg-primary">
                        </div>
                        <div class="row g-3">
                            <div class="col-lg-6 col-md-6 transport-item attraction-card">
                                <div class="service-item text-center px-4">
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
                            <div class="col-lg-6 col-md-6 transport-item attraction-card">
                                <div class="service-item text-center px-4">
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
                            <div class="col-lg-6 col-md-6 transport-item attraction-card">
                                <div class="service-item text-center px-4">
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
                            <div class="col-lg-6 col-md-6 transport-item attraction-card">
                                <div class="service-item text-center px-4">
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
}

function getTestimonialItems() {

    const walkathonItem = `
    <div class="testimonial-item">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <h1 class="display-5 mb-4 text-black">Walkathon</h1>
                                        <p class="text-white fs-4 fw-normal mb-4"><i
                                                class="fa fa-quote-left text-white me-3"></i>
                                            സെപ്റ്റംബർ 20, 21 തീയതികളിൽ എറണാകുളത്ത് വെച്ച് നടക്കുന്ന
                                            അൻപത്തിയേഴാമത്‌ ദേശീയ സമ്മേളനത്തിന്റെ (പുഷ്പകായനം 2025, പുതുവഴികളിലൂടെ)
                                            പ്രചരണത്തിന്റെ
                                            ഭാഗമായി ശ്രീ പുഷ്പകബ്രാഹ്മണ സേവാ സംഘം എറണാകുളം വനിതാ വേദി നടത്തിയ
                                            വാക്കത്തോൺ 2025, 25/05/25 ന് തൃപ്പൂണിത്തുറയിൽ വെച്ച് നടന്നു.
                                            <br /><br />
                                            <b>SAY NO TO DRUGS</b> എന്നതായിരുന്നു വാക്കത്തോൺ ഉയർത്തിപ്പിടിച്ച
                                            സന്ദേശം. തൃപ്പൂണിത്തുറ Govt. ബോയ്സ് ഹൈസ്കൂളിൽ നിന്നും തുടങ്ങി
                                            നഗരത്തിലൂടെ 3 KM സഞ്ചരിച്ച്, ബോയ്സ് ഹൈസ്കൂളിൽ തന്നെ വാക്കത്തോൺ
                                            അവസാനിച്ചു.
                                            <br /><br />
                                            വാക്കത്തോണിനെപ്പറ്റിയുള്ള കൂടുതൽ വിവരങ്ങൾ അറിയുവാൻ
                                            <a class="link-txt-color-secondary"
                                                href="/main/content/announcements/walkathon.html">
                                                ഇവിടെ ക്ലിക്ക് ചെയ്യുക.
                                            </a>
                                        </p>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="d-flex img-fluid">
                                            <img src="https://lh3.googleusercontent.com/pw/AP1GczMJvz3bKnwgr45SBwXK5N_RBeJvZTZKigsaRdDCXGYhdzCvSVb_hJNl31vQglqhvJwhsui-QpIRW3OXCIbJc0y67RD1dlxw49fnO9xSYrwX7NBtA37NPwEmew88hgNJGmpb5qv6nt6H8SRkiRAP6BSU=w1280-h720"
                                                class="img-fluid">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;

    const vishuItem = `
    <div class="testimonial-item">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <h1 class="display-5 mb-4 text-black">വിഷു ഫോട്ടോഗ്രാഫി മത്സരം</h1>
                                        <p class="text-white fs-4 fw-normal mb-4"><i
                                                class="fa fa-quote-left text-white me-3"></i>
                                            വിഷുവിനെ മനോഹര സങ്കൽപ്പമാക്കി പുഷ്പകായനം 2025 നടത്തിയ ഫോട്ടോഗ്രാഫി
                                            മത്സര
                                            വിജയികളായി
                                            രണ്ട് പേരെ തിരഞ്ഞെടുത്തിരിക്കുന്നു.
                                            <br /><br />
                                            <b>1. രജിത വത്സരാജ്, കൊയിലാണ്ടി പ്രാദേശിക സഭ</b>
                                            <br />
                                            <b>2. രമണി എം ടി, പേരാമ്പ്ര പ്രാദേശിക സഭ</b>
                                            <br /><br />
                                            വിജയികൾക്ക് അഭിനന്ദനങ്ങൾ!
                                            <br /><br />
                                            കൂടുതൽ വിവരങ്ങൾക്കായി <a class="link-txt-color-secondary"
                                                href="/main/content/announcements/vishu-contest.html">ഇവിടെ
                                                ക്ലിക്ക്
                                                ചെയ്യുക</a>.
                                        </p>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="d-flex img-fluid w-50">
                                            <img src="https://lh3.googleusercontent.com/pw/AP1GczP884297GTKOFJewrpV5x3VS4bavmaEToudEPEnM_7U9fyrUamVHggm8IZ2H0cudRgoxXzqCyrAvknAfqUpO2QsySBqgrTFdTIvpuScIsN_rrOFFvK-2CoVsQAPoAnEdNIlQ3YCrTpenigrFLsCHpy5=w938-h922"
                                                class="img-fluid w-60c">
                                        </div>
                                        <b class="text-white">രജിത വത്സരാജ്</b>
                                        <br /><br />
                                        <div class="d-flex img-fluid w-50">
                                            <img src="https://lh3.googleusercontent.com/pw/AP1GczP7SmmqHlFdpza8_EO2cjiY3Ek3tiktV9RoRwsSwL9AChD7bNumbd6grhObde_kN8A6U35GOUztt1CiBfG4q5nm6_Vt7UDMTKAeS1JacL4fLUSt8aHQ1j9N8RHNA3_Yfm2yTbP_TeG2H5DTtyUPMovR=w855-h678"
                                                class="img-fluid w-60c">
                                        </div>
                                        <b class="text-white">രമണി എം ടി</b>
                                    </div>
                                </div>
                            </div>
                        </div>
  `;

    const logoItem = `
    <div class="testimonial-item">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <h1 class="display-5 mb-4 text-black">ലോഗോ പ്രകാശനം</h1>
                                        <p class="text-white fs-4 fw-normal mb-4"><i
                                                class="fa fa-quote-left text-white me-3"></i>
                                            57-ാം ദേശീയ സമ്മേളനത്തിന്റെ (പുഷ്പകായനം 2025) ഔദ്യോഗിക ലോഗോ പ്രകാശനം
                                            ചെയ്തു.
                                            <br /><br />
                                            മലപ്പുറം പോരൂരിൽ നടക്കുന്ന Pushpaka Champions Leagugue - 1 ന്റെ
                                            കലാസന്ധ്യയുമായി അനുബന്ധിച്ച് നടന്ന
                                            ചടങ്ങിൽ വെച്ചായിരുന്നു ലോഗോ പ്രകാശനം.
                                            <br /><br />
                                            കേന്ദ്ര പ്രസിഡണ്ട്
                                            ശ്രീ എൽ.പി.വിശ്വനാഥൻ അവർകൾ ആണ് ലോഗോ പ്രകാശനം നിർവഹിച്ചത്.
                                        </p>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="d-flex img-fluid">
                                            <img src="https://lh3.googleusercontent.com/pw/AP1GczPTtlc16lvlZvrsz5nYu0C6WKbaUptYvFsL_4ARkXOsoh1sbaG6XelFTdurnVnjvabP8pvkVLLORzL75IYsyQZmT6YMQdSMyXzyLmOg6vSTdOB7GCrDxAjZCuU18iL8300HadLkKDCxYn2IV385jnBA"
                                                class="img-fluid">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
  `;

    const reelsItem = `
   <div class="testimonial-item">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <h1 class="display-5 mb-4 text-black">റീൽസ് മത്സരം</h1>
                                        <p class="text-white fs-4 fw-normal mb-4"><i
                                                class="fa fa-quote-left text-white me-3"></i>
                                            57-ാം
                                            ദേശീയ സമ്മേളനത്തോടനുബന്ധിച്ച് നടത്തിയ റീൽസ് മത്സരത്തിലെ വിജയികളെ
                                            പ്രഖ്യാപിച്ചു.
                                            <br /><br />
                                            മത്സരത്തിലെ <b class="text-highlight">ഒന്നാം സമ്മാന വിജയി </b>
                                            തളിപ്പറമ്പ പ്രാദേശിക സഭയിലെ പ്രസാദ് അരയാലയാണ്.
                                            <br /><br />
                                            പ്രസാദ് അരയാലക്ക് അഭിനന്ദനങ്ങൾ!
                                        </p>
                                        <p class="text-white fs-4 fw-normal mb-4">
                                            മത്സരത്തിലെ മറ്റു വിജയികളെ അറിയുവാനും, മത്സരത്തിൽ പങ്കെടുത്ത മറ്റ്
                                            റീലുകൾ കാണുന്നതിനുമായി
                                            <a class="link-txt-color-secondary"
                                                href="/main/content/announcements/reels-contest.html">
                                                ഇവിടെ ക്ലിക്ക് ചെയ്യുക.
                                            </a>
                                        </p>
                                    </div>
                                    <div class="col-lg-6">
                                        <h1 class="display-5 mb-4 text-black"></h1>
                                        <iframe class="w-auto w-lg-550" height="315"
                                            src="https://www.youtube.com/embed/Mb8l1JY-4Ws">
                                        </iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
  `;

    const namingItem = `
    <div class="testimonial-item">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <h1 class="display-5 mb-4 text-black">നാമനിർദ്ദേശ മത്സരം</h1>
                                        <p class="text-white fs-4 fw-normal mb-4"><i
                                                class="fa fa-quote-left text-white me-3"></i>
                                            57-ാം ദേശീയ സമ്മേളനത്തോടനുബന്ധിച്ച് നടത്തിയ നാമനിർദ്ദേശ
                                            മത്സരത്തിലെ വിജയിയെ പ്രഖ്യാപിച്ചു.
                                            <br /><br />
                                            <b>പുഷ്പകായനം 2025</b> എന്നതാണ് തിരഞ്ഞെടുക്കപ്പെട്ട പേര്.
                                            <br /><br />
                                            തൃപ്പൂണിത്തുറ പ്രാദേശിക സഭയിലെ ശ്രീമതി ലളിതാ ദേവിയാണ് ഈ പേര്
                                            നിർദേശിച്ചത്.
                                            <br /><br />
                                            വിജയിക്ക് അഭിനന്ദനങ്ങൾ !
                                            <br /><br />
                                            കൂടുതൽ വിവരങ്ങൾക്കായി <a class="link-txt-color-secondary"
                                                href="/main/content/announcements/naming-contest.html">
                                                ഇവിടെ ക്ലിക്ക് ചെയ്യുക</a>.
                                        </p>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="d-flex img-fluid w-75">
                                            <img src="https://lh3.googleusercontent.com/pw/AP1GczM9twHetQ7cHjlEQgbGYk0el7MUbHNRe1f074Ac6FwfWl6oXYnAAnugxine3e5qxwx5-9whul6LVDtUrYWCYb6R7g3U5Rc8GPEr_iB0MKbneJ8HkETK2GpVamtJl2_Fq08pjuc9G00i_KIiMsRduD-T=w1042-h942"
                                                class="img-fluid w-80c">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

  `;

    const welcomeItem = `
    <div class="testimonial-item">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <h1 class="display-5 mb-4 text-black">സ്വാഗതസംഘ രൂപീകരണം</h1>
                                        <p class="text-white fs-4 fw-normal mb-4"><i
                                                class="fa fa-quote-left text-white me-3"></i>
                                            ശ്രീ പുഷ്പകബ്രാഹ്മണ സേവാ സംഘത്തിന്റെ 57-ാം ദേശീയ സമ്മേളന സ്വാഗതസംഘം
                                            2025
                                            ഫെബ്രുവരി 23 ന് തൃപ്പൂണിത്തുറയിൽ വെച്ച് രൂപീകരിച്ചു.
                                            <br /><br />
                                            സ്വാഗതസംഘ രൂപീകരണവുമായി ബന്ധപ്പെട്ട കൂടുതൽ വിശേഷങ്ങൾ അറിയുവാനായി <a
                                                class="link-txt-color-secondary"
                                                href="/main/content/announcements/orgcom.html">
                                                ഇവിടെ ക്ലിക്ക് ചെയ്യുക</a>.
                                        </p>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="d-flex img-fluid w-100">
                                            <img src="https://lh3.googleusercontent.com/pw/AP1GczMlnWOSO0vYfX9f4XjszcSueCd8CZA5eI5oSGfGcE3p696BTGDU0DEBXlkhYe2M75LmMTDKjeswxRF7IVuJWKp3RRBCrxsNjEsoQnL_seK4PWR7pK1yddJtVV5ZdePRU9bxszX_x2fe6P1HkMOFMypT=w2874-h1916"
                                                class="img-fluid">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
  `;

    const testimonialItems = [
        walkathonItem,
        vishuItem,
        logoItem,
        reelsItem,
        namingItem,
        welcomeItem
    ];
    return testimonialItems;
}

const programsEl = document.getElementById("programsContainer");
const venueEl = document.getElementById("venueContainer");
const testimonialEl = document.getElementById('testimonialContainer');

if (programsEl)
    programsEl.innerHTML = getProgramDetails();

if (venueEl)
    venueEl.innerHTML = getVenueDetails();

if (testimonialEl) {
    const testimonialWrapper = `
      <div class="container-fluid p-0">
        <div class="row g-0">
          <div class="col py-4 px-4 bg-primary">
            <div id="testimonial-carousel" class="owl-carousel testimonial-carousel testimonial-carousel-white pe-4">
              ${getTestimonialItems().join('')}
            </div>
          </div>
        </div>
      </div>
    `;
    testimonialEl.innerHTML = testimonialWrapper;
}

