// ============== EVEXYA — shared interactions ==============

// Nav scroll state
const nav = document.querySelector('.nav');
if(nav){
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if(navToggle && navLinks){
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.textContent = '☰';
  }));
}

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window && revealEls.length){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:.15});
  revealEls.forEach((el, i) => {
    el.style.setProperty('--i', i % 8);
    io.observe(el);
  });
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// Count-up stats
const counters = document.querySelectorAll('[data-count]');
if('IntersectionObserver' in window && counters.length){
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        animateCount(entry.target);
        countIO.unobserve(entry.target);
      }
    });
  }, {threshold:.4});
  counters.forEach(c => countIO.observe(c));
}
function animateCount(el){
  const raw = el.getAttribute('data-count');
  const match = raw.match(/[\d.]+/);
  if(!match) return;
  const target = parseFloat(match[0]);
  const prefix = raw.split(match[0])[0];
  const suffix = raw.split(match[0])[1] || '';
  const isDecimal = match[0].includes('.');
  const duration = 1400;
  const start = performance.now();
  function tick(now){
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = target * eased;
    el.textContent = prefix + (isDecimal ? val.toFixed(1) : Math.round(val)) + suffix;
    if(p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  if(!q) return;
  q.addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if(!wasOpen) item.classList.add('open');
  });
});

// ============== Specialty Quiz (For Patients page) ==============
(function(){
  const quiz = document.querySelector('.quiz-shell');
  if(!quiz) return;

  const steps = Array.from(quiz.querySelectorAll('.quiz-step'));
  const result = quiz.querySelector('.quiz-result');
  const progressBar = quiz.querySelector('.quiz-progress-bar');
  let current = 0;
  const answers = {};

  const specialtyMap = {
    weight: {name:'Medical Weight Loss', copy:'Programs built around metabolic health, not just the number on a scale — physician-guided, sustainable, and monitored.'},
    hormones: {name:'Hormone Replacement Therapy', copy:'A provider who treats hormone health as a system, not a single symptom — with lab-driven, personalized protocols.'},
    skin: {name:'Dermatology & Aesthetics', copy:'Board-informed skin and aesthetic care focused on long-term results, not one-off treatments.'},
    sexual: {name:'Sexual Wellness Medicine', copy:'Discreet, evidence-based care from providers who treat this as core health — not an afterthought.'},
    fatigue: {name:'Functional Medicine', copy:'A root-cause approach for fatigue and sleep — looking at the whole system before reaching for a prescription pad.'},
    mental: {name:'Mental Wellness Care', copy:'Providers who treat mental health with the same rigor and privacy as any other clinical concern.'},
    recovery: {name:'Performance & Recovery Medicine', copy:'Care built for people who train hard and need a provider fluent in performance, not just illness.'},
    other: {name:'Concierge Primary Care', copy:'A dedicated primary provider who has the time to actually get to know your health — and coordinate the rest.'}
  };

  function updateProgress(){
    const pct = ((current) / steps.length) * 100 + 12;
    progressBar.style.width = Math.min(pct, 100) + '%';
  }

  function showStep(i){
    steps.forEach((s, idx) => s.classList.toggle('active', idx === i));
    quiz.querySelectorAll('.quiz-back').forEach(b => b.disabled = i === 0);
    updateProgress();
  }

  quiz.querySelectorAll('.quiz-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      const stepEl = opt.closest('.quiz-step');
      stepEl.querySelectorAll('.quiz-opt').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      const key = stepEl.getAttribute('data-key');
      answers[key] = opt.getAttribute('data-value');

      setTimeout(() => {
        if(current < steps.length - 1){
          current++;
          showStep(current);
        } else {
          finish();
        }
      }, 260);
    });
  });

  quiz.querySelectorAll('.quiz-back').forEach(b => {
    b.addEventListener('click', () => {
      if(current > 0){
        current--;
        showStep(current);
      }
    });
  });

  function finish(){
    steps.forEach(s => s.classList.remove('active'));
    const concern = answers.concern || 'other';
    const rec = specialtyMap[concern] || specialtyMap.other;
    result.querySelector('.result-name').textContent = rec.name;
    result.querySelector('.result-copy').textContent = rec.copy;
    result.classList.add('active');
    progressBar.style.width = '100%';
  }

  const restart = quiz.querySelector('.quiz-restart');
  if(restart){
    restart.addEventListener('click', () => {
      current = 0;
      quiz.querySelectorAll('.quiz-opt').forEach(o => o.classList.remove('selected'));
      result.classList.remove('active');
      showStep(0);
    });
  }

  showStep(0);
})();
