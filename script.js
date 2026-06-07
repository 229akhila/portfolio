/* ==========================================
   AKINAPALLY AKHILA - PORTFOLIO LOGIC
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- Typing Effect for Hero Subtitle ---
    const words = ["Machine Learning Developer.", "Software Engineer.", "B.Tech Graduate.", "CEO of Sonic A Square B solutions Pvt.Ltd."];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingDelay = 100;
    const erasingDelay = 50;
    const newWordDelay = 2000;
    const typingTextSpan = document.getElementById('typing-text');

    function type() {
        if (!typingTextSpan) return;
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingTextSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingTextSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(type, newWordDelay);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? erasingDelay : typingDelay);
        }
    }

    // Start typing animation
    setTimeout(type, 1000);


    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinksContainer = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars-staggered');
                icon.classList.toggle('fa-xmark');
            }
        });

        // Close menu on click of link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars-staggered');
                    icon.classList.remove('fa-xmark');
                }
            });
        });
    }


    // --- Sticky Header Scroll Styling ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });


    // --- Active Nav Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });


    // --- Project Filtering System ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');

            const category = e.currentTarget.getAttribute('data-filter');

            projectCards.forEach(card => {
                // Fade out animation
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95) translateY(10px)';

                setTimeout(() => {
                    const cardCategory = card.getAttribute('data-category');
                    if (category === 'all' || cardCategory === category) {
                        card.style.display = 'flex';
                        // Trigger reflow for animation
                        card.offsetHeight;
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1) translateY(0)';
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });


    // --- Project Details Modal Injector ---
    const projectDetailsData = {
        ddos: {
            title: "Detection of DoS & DDoS Attacks Using ML",
            badge: "Machine Learning / Security",
            desc: "This project addresses critical web security vulnerabilities by developing a high-accuracy, machine learning-powered classifier to screen incoming network request logs for Denial of Service anomalies.",
            features: [
                "Cleansed and structured raw socket connection logs, extracting key features like request intervals, packet size ratios, and source-destination traffic densities.",
                "Trained and cross-validated multiple algorithms including Support Vector Machines (SVM), Random Forests, and Decision Trees.",
                "Built an ensemble model achieving high classification accuracy, minimizing false-positives for legitimate user traffic.",
                "Constructed testing scenarios with mock attack traffic logs to measure response latencies and prediction speeds."
            ],
            tech: ["Python", "Scikit-Learn", "Pandas", "NumPy", "SVM", "Random Forest", "Matplotlib"]
        },
        translator: {
            title: "Hybrid Language Translator Using ML",
            badge: "Natural Language Processing",
            desc: "Designed an intelligent language translator that fuses rule-based grammar structures with statistical translation patterns to increase precision and maintain structural flow across language outputs.",
            features: [
                "Engineered syntactic parsing rules that retain parts-of-speech context during token conversion.",
                "Utilized statistical corpus alignment to select semantic translations dynamically based on context.",
                "Constructed dictionary databases mapped across languages to serve as primary translation keys.",
                "Integrated evaluation metrics to compare output against traditional baseline dictionaries, highlighting accuracy improvements."
            ],
            tech: ["Python", "NLTK", "Regex", "Statistical Modeling", "Custom Lexicons", "Tkinter"]
        },
        spam: {
            title: "Spam Mail Detection Classifier",
            badge: "Machine Learning / Text Mining",
            desc: "A text-mining classifier that processes raw email strings and predicts with high precision whether the message represents safe communications or spam content.",
            features: [
                "Engineered a tokenization pipeline implementing lowercase conversions, punctuation stripping, and lemmatization.",
                "Mapped clean text lists using Term Frequency-Inverse Document Frequency (TF-IDF) feature matrices.",
                "Trained and evaluated a Multinomial Naive Bayes classifier model.",
                "Achieved over 97% detection accuracy on standard evaluation datasets, tracking recall metrics to avoid filtering important mails."
            ],
            tech: ["Python", "NLTK", "Scikit-Learn", "TF-IDF Vectorizer", "Naive Bayes", "Pandas"]
        },
        notes: {
            title: "Tuition Notes Mobile Application",
            badge: "Mobile App Development",
            desc: "An educational mobile platform designed to bridge communication gaps between tuition teachers, students, and parents. Serves as a digital portal for notes distribution and performance updates.",
            features: [
                "Created role-based authentication setups supporting distinct flows for Teacher, Parent, and Student profiles.",
                "Implemented secure cloud database integration allowing teachers to upload daily syllabus notes and homework guides.",
                "Designed a performance tracking module where parents view progress metrics, grades, and attendance flags.",
                "Built a real-time notification mechanism to alert parents of notes releases or upcoming exams."
            ],
            tech: ["Android SDK", "Java/Kotlin", "Firebase Firestore", "Firebase Auth", "Material UI", "Push Notifications"]
        }
    };

    const projectModal = document.getElementById('project-modal');
    const projectModalBody = document.getElementById('project-modal-body');
    const projectModalClose = document.getElementById('project-modal-close');
    const projectDetailBtns = document.querySelectorAll('.btn-project-detail');

    if (projectModal && projectModalBody && projectModalClose) {
        // Open Modal
        projectDetailBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const projectId = e.currentTarget.getAttribute('data-project');
                const data = projectDetailsData[projectId];

                if (data) {
                    // Populate modal html
                    let techSpans = data.tech.map(t => `<span class="meta-pill">${t}</span>`).join('');
                    let featureList = data.features.map(f => `<li><i class="fa-solid fa-circle-check"></i> <span>${f}</span></li>`).join('');

                    projectModalBody.innerHTML = `
                        <div class="project-details-layout">
                            <span class="subtitle">${data.badge}</span>
                            <h2>${data.title}</h2>
                            <div class="project-meta-pills">
                                ${techSpans}
                            </div>
                            <p class="modal-project-desc">${data.desc}</p>
                            <div class="project-feature-list">
                                <h4>Key Highlights & Deliverables</h4>
                                <ul>
                                    ${featureList}
                                </ul>
                            </div>
                        </div>
                    `;

                    projectModal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Lock background scroll
                }
            });
        });

        // Close Modal
        const closeProjectModal = () => {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        projectModalClose.addEventListener('click', closeProjectModal);

        // Close on click outside content
        const overlay = projectModal.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', closeProjectModal);
        }
    }


    // --- Certificate Mock Viewer Modal ---
    const certModal = document.getElementById('cert-modal');
    const certModalClose = document.getElementById('cert-modal-close');
    const certViewBtns = document.querySelectorAll('.btn-view-cert');
    const modalCertTitle = document.getElementById('modal-cert-title');
    const modalCertOrg = document.getElementById('modal-cert-org');
    const modalCertDate = document.getElementById('modal-cert-date');

    if (certModal && certModalClose) {
        certViewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const title = e.currentTarget.getAttribute('data-cert-name');
                const org = e.currentTarget.getAttribute('data-cert-org');
                const date = e.currentTarget.getAttribute('data-cert-date');

                if (modalCertTitle) modalCertTitle.textContent = title;
                if (modalCertOrg) modalCertOrg.textContent = org;
                if (modalCertDate) modalCertDate.textContent = date;

                certModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeCertModal = () => {
            certModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        certModalClose.addEventListener('click', closeCertModal);

        const certOverlay = certModal.querySelector('.modal-overlay');
        if (certOverlay) {
            certOverlay.addEventListener('click', closeCertModal);
        }
    }


    // --- Interactive Contact Form with Validation & Feedback ---
    const contactForm = document.getElementById('portfolio-contact-form');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Form inputs
            const nameVal = document.getElementById('form-name').value.trim();
            const emailVal = document.getElementById('form-email').value.trim();
            const subjectVal = document.getElementById('form-subject').value.trim();
            const messageVal = document.getElementById('form-message').value.trim();

            if (!nameVal || !emailVal || !subjectVal || !messageVal) {
                alert('Please fill out all fields.');
                return;
            }

            // Animate submission
            const originalBtnHTML = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `Sending... <i class="fa-solid fa-spinner fa-spin"></i>`;
            submitBtn.style.opacity = '0.8';

            // Simulate server network latency
            setTimeout(() => {
                // Success State animation
                submitBtn.innerHTML = `Message Sent! <i class="fa-solid fa-circle-check"></i>`;
                submitBtn.style.background = 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)';
                submitBtn.style.color = '#ffffff';
                submitBtn.style.boxShadow = '0 4px 15px rgba(34, 197, 94, 0.3)';

                // Clear Form
                contactForm.reset();

                // Revert button state after a delay
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHTML;
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                    submitBtn.style.boxShadow = '';
                    submitBtn.style.opacity = '';
                }, 4000);
            }, 1800);
        });
    }


    // --- Scroll Reveal Animation System ---
    const scrollElements = document.querySelectorAll('.glass-card, .timeline-item, .section-header');

    // Add default reveal style via JS to keep text accessible without JS enabled
    scrollElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    const revealOnScroll = () => {
        scrollElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 120;

            if (elementTop < window.innerHeight - elementVisible) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Trigger on scroll and on load
    window.addEventListener('scroll', revealOnScroll);
    // Initial call
    setTimeout(revealOnScroll, 300);
});
