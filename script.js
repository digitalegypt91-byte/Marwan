// =============================
// التنقل السلس بين أقسام الموقع
// =============================

document.querySelectorAll('.nav-links a').forEach(function(link) {

    link.addEventListener('click', function(event) {

        const targetId = this.getAttribute('href');

        if (targetId && targetId.startsWith('#')) {

            const targetSection = document.querySelector(targetId);

            if (targetSection) {

                event.preventDefault();

                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

            }

        }

    });

});
// =============================
// تحديد القسم الظاهر حاليًا
// =============================

const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function() {

    let currentSection = 'home';

    // لو المستخدم نزل في الصفحة،
    // نحدد القسم الموجود حاليًا
    sections.forEach(function(section) {

        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 200) {

            const sectionId = section.getAttribute('id');

            if (sectionId) {
                currentSection = sectionId;
            }

        }

    });

    // لو المستخدم في أعلى الصفحة، الرئيسية تكون مفعلة
    if (window.scrollY < 200) {
        currentSection = 'home';
    }

    navLinks.forEach(function(link) {

        link.classList.remove('active');

        if (link.getAttribute('href') === '#' + currentSection) {

            link.classList.add('active');

        }

    });

});

// =============================
// زر العودة لأعلى الصفحة
// =============================

const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', function() {

    if (window.scrollY > 500) {

        backToTop.classList.add('show');

    } else {

        backToTop.classList.remove('show');

    }

});


backToTop.addEventListener('click', function() {

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

});

// =============================
// تشغيل حركة ظهور العناصر
// =============================

const revealElements = document.querySelectorAll(
    '.achievement-card, .project-card, .timeline-content, .source-card, .goal-card, .guide-step'
);


revealElements.forEach(function(element) {

    element.classList.add('reveal');

});


const revealObserver = new IntersectionObserver(function(entries) {

    entries.forEach(function(entry) {

        if (entry.isIntersecting) {

            entry.target.classList.add('show');

            revealObserver.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.15
});


revealElements.forEach(function(element) {

    revealObserver.observe(element);

});
// =============================
// Dark Mode
// =============================

const themeToggle = document.getElementById('themeToggle');

// قراءة الوضع المحفوظ
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
}

// عند الضغط على زر الوضع الليلي
themeToggle.addEventListener('click', function() {

    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {

        themeToggle.textContent = '☀️';

        localStorage.setItem('theme', 'dark');

    } else {

        themeToggle.textContent = '🌙';

        localStorage.setItem('theme', 'light');

    }

});
