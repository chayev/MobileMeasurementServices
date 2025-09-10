/* === SignalFlow — Modern, High-Contrast Theme === */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");

/* -------------------------------------------------
   Design tokens
--------------------------------------------------*/
:root {
  /* Brand */
  --color-primary: #0891b2; /* can be overridden by app.js */
  --color-accent: #ec4899;

  /* Surface & text (LIGHT) */
  --color-bg: #ffffff;
  --color-fg: #0b1220;         /* darker for strong contrast */
  --color-muted: #1f2937;      /* was #334155 -> stronger on white */
  --color-border: #e5e7eb;
  --color-card: #f9fafb;

  /* Feedback */
  --color-success: #10b981;
  --color-error: #ef4444;
  --color-warning: #f59e0b;

  /* Nav */
  --nav-bg: rgba(255,255,255,0.92);
  --nav-fg: #0b1220;
  --nav-link: #4b5563;         /* clearer default */
  --nav-link-active: var(--color-primary);

  /* Type scale */
  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-display: var(--font-sans);
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: clamp(2.5rem, 5vw, 4rem);

  /* Spacing */
  --space-1: .25rem;
  --space-2: .5rem;
  --space-3: .75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;

  /* Layout */
  --container-max: 1200px;
  --border-radius: 1rem;       /* slightly rounder, more modern */
  --border-radius-sm: .625rem;
  --shadow: 0 1px 2px rgba(0,0,0,.06), 0 1px 1px rgba(0,0,0,.05);
  --shadow-lg: 0 10px 18px rgba(0,0,0,.10);
  --shadow-xl: 0 22px 28px rgba(0,0,0,.12);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0b1020;
    --color-fg: #f1f5f9;       /* brighter for contrast on dark */
    --color-muted: #cbd5e1;    /* was #94a3b8 -> easier to read */
    --color-border: #334155;
    --color-card: #0f172a;

    --nav-bg: rgba(13,18,33,.88);
    --nav-fg: #f1f5f9;
    --nav-link: #cbd5e1;       /* clearer nav links on dark */
  }
}

/* -------------------------------------------------
   Base & layout
--------------------------------------------------*/
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }

body {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: 1.65;
  color: var(--color-fg);
  background: var(--color-bg);
  letter-spacing: -0.01em;                 /* tighter, pro look */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container { max-width: var(--container-max); margin: 0 auto; padding: 0 var(--space-4); }

/* -------------------------------------------------
   Typography
--------------------------------------------------*/
h1,h2,h3,h4,h5,h6{
  font-family: var(--font-display);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.025em;
  color: var(--color-fg);
  transition: color .2s ease;
}
h1{ font-size: var(--text-5xl); font-weight: 800; }
h2{ font-size: var(--text-4xl); font-weight: 800; }
h3{ font-size: var(--text-2xl); font-weight: 700; }
h4{ font-size: var(--text-xl); font-weight: 700; }
p{ text-wrap: pretty; }

/* -------------------------------------------------
   Navigation
--------------------------------------------------*/
.nav{
  position: fixed; inset: 0 0 auto 0;
  background: var(--nav-bg);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
  z-index: 100;
}
.nav .container{
  display:flex; align-items:center; justify-content:space-between;
  padding: var(--space-4) 0;
}
.nav-brand{ display:flex; align-items:center; gap: var(--space-3); }
.logo{
  width:48px; height:48px; border-radius: var(--border-radius);
  display:flex; align-items:center; justify-content:center;
  color:#fff; font-weight:800; font-size: var(--text-lg);
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  box-shadow: var(--shadow);
}
.brand-name{ font-weight:800; font-size: var(--text-lg); color: var(--nav-fg); }
.nav-links{ display:none; list-style:none; gap: var(--space-6); }
.nav-link{
  color: var(--nav-link); text-decoration:none; font-weight:600;
  transition: color .2s ease;
}
.nav-link:hover, .nav-link.active{ color: var(--nav-link-active); }
@media (min-width:768px){ .nav-links{ display:flex; } }

/* -------------------------------------------------
   Hero
--------------------------------------------------*/
.hero{
  padding: calc(80px + var(--space-24)) 0 var(--space-24);
  background: linear-gradient(135deg, #eef2ff 0%, #e5edf6 100%);
  position: relative; overflow: hidden;
}
.hero::before{
  content:""; position:absolute; inset:0;
  background-image: radial-gradient(800px 400px at 20% 0%, rgba(14,165,233,.08), rgba(0,0,0,0));
  pointer-events:none;
}
.hero-content{ position:relative; z-index:1; text-align:center; max-width:900px; margin:0 auto; }
.hero-title{ margin-bottom: var(--space-8); }
.hero-subtitle{
  font-size: var(--text-xl);
  color: var(--color-muted);                   /* darker on light, brighter in dark */
  margin: 0 auto var(--space-12);
  max-width: 720px; font-weight: 500; line-height: 1.5;
}
@media (prefers-color-scheme: dark){
  .hero{ background: radial-gradient(1000px 600px at 50% -10%, rgba(14,165,233,.15), transparent), #0b1020; }
  .hero-title{ text-shadow: 0 1px 0 rgba(0,0,0,.35); }
}

/* -------------------------------------------------
   Buttons
--------------------------------------------------*/
.btn{
  display:inline-flex; align-items:center; justify-content:center;
  min-height:48px; padding: var(--space-4) var(--space-8);
  border-radius: var(--border-radius);
  border: 2px solid transparent;
  font-size: var(--text-base); font-weight: 700;
  cursor:pointer; text-decoration:none; transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease;
  box-shadow: var(--shadow); position:relative; overflow:hidden;
}
.btn:focus{ outline:3px solid var(--color-primary); outline-offset:2px; border-radius: var(--border-radius-sm); }

.btn-primary{ background: linear-gradient(135deg, var(--color-primary) 0%, #0ea5e9 100%); color:#fff; }
.btn-primary:hover{ transform: translateY(-1px); box-shadow: var(--shadow-lg); }

.btn-secondary{
  background: #fff; color: var(--color-primary);
  border-color: var(--color-primary); box-shadow:none;
}
@media (prefers-color-scheme: dark){
  .btn-secondary{ background: transparent; color: #e0f2fe; border-color:#38bdf8; }
}
.btn-secondary:hover{ background: var(--color-primary); color:#fff; box-shadow: var(--shadow-lg); transform: translateY(-1px); }

.btn-ghost{ background: transparent; color: var(--color-muted); box-shadow:none; }
.btn-ghost:hover{ color: var(--color-fg); background: var(--color-card); }

/* -------------------------------------------------
   Cards & logos
--------------------------------------------------*/
.card{
  background: var(--color-card); border:1px solid var(--color-border);
  border-radius: var(--border-radius); padding: var(--space-8);
  box-shadow: var(--shadow); transition: transform .2s ease, box-shadow .2s ease;
}
.card:hover{ transform: translateY(-2px); box-shadow: var(--shadow-xl); }

.social-proof{ padding: var(--space-16) 0; background: #fff; border-block: 1px solid var(--color-border); }
.social-proof-text{
  color: var(--color-muted); margin-bottom: var(--space-8);
  font-size: var(--text-sm); font-weight:600; text-transform:uppercase; letter-spacing:.06em; text-align:center;
}
.logo-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(140px,1fr)); gap: var(--space-6); max-width:900px; margin:0 auto; }
.client-logo{
  padding: var(--space-6);
  color: var(--color-fg);        /* stronger than muted */
  opacity: .95;
  text-align:center; font-weight:700;
  background: var(--color-card); border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm); transition: transform .2s ease, box-shadow .2s ease, opacity .2s ease;
}
.client-logo:hover{ opacity:1; transform: translateY(-2px); box-shadow: var(--shadow); }

/* -------------------------------------------------
   Outcomes / Services
--------------------------------------------------*/
.outcomes{ padding: var(--space-24) 0; background: linear-gradient(135deg, #fafafa 0%, #f4f4f5 100%); }
.outcomes-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); gap: var(--space-8); }
.outcome-card{ text-align:center; padding: var(--space-8); background:#fff; border-radius: var(--border-radius); box-shadow: var(--shadow); border:1px solid var(--color-border); }
.outcome-icon{ font-size: var(--text-5xl); margin-bottom: var(--space-6); display:block; }
.outcome-card h3{ margin-bottom: var(--space-4); }
.outcome-card p{ color: var(--color-muted); font-size: var(--text-lg); }

.services{ padding: var(--space-24) 0; border-block:1px solid var(--color-border); }
.section-title{ margin-bottom: var(--space-16); }
.services-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(350px,1fr)); gap: var(--space-8); }
.service-card{
  background: var(--nav-bg);
  padding: var(--space-8); border-radius: var(--border-radius); box-shadow: var(--shadow-lg); border:none;
  color: var(--color-fg); transition: transform .3s ease, box-shadow .3s ease, background .3s ease;
}
.service-card:hover{ transform: translateY(-4px); box-shadow: var(--shadow-xl); background:#fff; }
.service-icon{ font-size: var(--text-4xl); margin-bottom: var(--space-6); display:block; }
.service-card p{ color: var(--color-muted); }

/* -------------------------------------------------
   Process / Use cases
--------------------------------------------------*/
.process{ padding: var(--space-20) 0; }
.process-steps{ display:grid; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); gap: var(--space-8); }
.process-step{ text-align:center; }
.step-number{
  width:60px; height:60px; background: var(--color-primary); color:#fff; border-radius:50%;
  display:flex; align-items:center; justify-content:center; font-size: var(--text-xl); font-weight:700; margin:0 auto var(--space-4);
}
.process-step p{ color: var(--color-muted); }

.use-cases{ padding: var(--space-20) 0; background: var(--color-border); }
.use-cases-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap: var(--space-6); }
.use-case-card{ background: var(--color-bg); padding: var(--space-6); border-radius: var(--border-radius); box-shadow: var(--shadow); }
.use-case-card p{ color: var(--color-muted); }

/* -------------------------------------------------
   Case studies / Resources
--------------------------------------------------*/
.case-studies{ padding: var(--space-20) 0; }
.case-studies-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(400px,1fr)); gap: var(--space-8); }
.case-study-card{ padding: var(--space-8); border:1px solid var(--color-border); border-radius: var(--border-radius); }

.resources{ padding: var(--space-20) 0; background: var(--color-border); }
.lead-magnet{
  background: var(--color-bg); padding: var(--space-8); border-radius: var(--border-radius);
  text-align:center; margin-bottom: var(--space-12); box-shadow: var(--shadow);
}
.lead-magnet p{ color: var(--color-muted); margin-bottom: var(--space-6); }

/* Accordion */
.glossary{ margin-bottom: var(--space-12); }
.accordion{ background: var(--color-bg); border-radius: var(--border-radius); overflow:hidden; box-shadow: var(--shadow); }
.accordion-item{ border-bottom:1px solid var(--color-border); }
.accordion-item:last-child{ border-bottom:none; }
.accordion-header{
  width:100%; padding: var(--space-4) var(--space-6); background:none; border:none; text-align:left;
  font-size: var(--text-base); font-weight:600; cursor:pointer; display:flex; justify-content:space-between; align-items:center; color: var(--color-fg);
}
.accordion-header:hover{ background: var(--color-border); }
.accordion-content{ padding: 0 var(--space-6) var(--space-4); color: var(--color-muted); display:none; }
.accordion-item.active .accordion-content{ display:block; }
.accordion-item.active .accordion-icon{ transform: rotate(45deg); }
.accordion-icon{ transition: transform .2s ease; }

/* Comparison table */
.table-wrapper{ overflow-x:auto; background: var(--color-bg); border-radius: var(--border-radius); box-shadow: var(--shadow); }
table{ width:100%; border-collapse: collapse; }
th,td{ padding: var(--space-4); text-align:left; border-bottom:1px solid var(--color-border); }
th{ background: var(--color-card); font-weight:700; color: var(--color-fg); }
tbody tr:nth-child(odd){ background: rgba(0,0,0,.02); }
@media (prefers-color-scheme: dark){ tbody tr:nth-child(odd){ background: rgba(255,255,255,.04); } }

/* -------------------------------------------------
   About / Contact / Footer
--------------------------------------------------*/
.about{ padding: var(--space-20) 0; }
.about-content{ display:grid; grid-template-columns:1fr; gap: var(--space-12); }
@media (min-width:768px){ .about-content{ grid-template-columns:2fr 1fr; } }
.about-story p, .bio-placeholder p{ margin-bottom: var(--space-3); color: var(--color-muted); }

.contact{
  padding: var(--space-20) 0; background: var(--color-border); text-align:center;
}
.contact-content p{
  color: var(--color-muted); margin-bottom: var(--space-8);
  max-width:600px; margin-inline:auto;
}

.footer{ padding: var(--space-12) 0; border-top:1px solid var(--color-border); }
.footer-content{ display:flex; flex-direction:column; gap: var(--space-6); align-items:center; text-align:center; }
@media (min-width:768px){ .footer-content{ flex-direction:row; justify-content:space-between; text-align:left; } }
.footer-links{ display:flex; flex-wrap:wrap; gap: var(--space-6); justify-content:center; }
.footer-links a{ color: var(--color-fg); text-decoration:none; font-size: var(--text-sm); }
.footer-links a:hover{ color: var(--color-primary); }

/* -------------------------------------------------
   Forms & modal
--------------------------------------------------*/
.modal{
  position:fixed; inset:0; z-index:200; display:none; align-items:center; justify-content:center; padding: var(--space-4);
}
.modal.active{ display:flex; }
.modal-overlay{ position:absolute; inset:0; background: rgba(0,0,0,.5); }
.modal-content{
  position:relative; background: var(--color-bg); border-radius: var(--border-radius);
  box-shadow: var(--shadow-lg); max-width:520px; width:100%; max-height:90vh; overflow-y:auto;
}
.modal-close{
  position:absolute; top: var(--space-4); right: var(--space-4);
  background:none; border:none; font-size: var(--text-2xl); cursor:pointer; color: var(--color-muted); z-index:1;
}
.modal-close:hover{ color: var(--color-fg); }

.form-container{ padding: var(--space-8); }
.form-header{ text-align:center; margin-bottom: var(--space-8); }
.form-header h2{ margin-bottom: var(--space-6); }

.stepper{ display:flex; justify-content:center; gap: var(--space-4); }
.step{
  width:40px; height:40px; border-radius:50%; background: var(--color-border); color: var(--color-muted);
  display:flex; align-items:center; justify-content:center; font-weight:700; transition: all .2s ease;
}
.step.active{ background: var(--color-primary); color:#fff; }
.step.completed{ background: var(--color-success); color:#fff; }

.form-step{ display:none; }
.form-step.active{ display:block; }

.form-group{ margin-bottom: var(--space-6); }
.form-group label{ display:block; margin-bottom: var(--space-2); font-weight:600; color: var(--color-fg); }
.form-group input, .form-group select, .form-group textarea{
  width:100%; min-height:44px; padding: var(--space-3);
  border:1px solid var(--color-border); border-radius: var(--border-radius);
  background: var(--color-bg); color: var(--color-fg); font-size: var(--text-base);
}
.form-group input:focus, .form-group select:focus, .form-group textarea:focus{
  outline:none; border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(14,165,233,.15);
}
.form-group textarea{ resize: vertical; min-height: 90px; }

.checkbox-group{ display:flex; flex-direction:column; gap: var(--space-3); }
.checkbox-label{ display:flex; align-items:center; gap: var(--space-3); cursor:pointer; font-weight:normal; }
.checkbox-label input[type="checkbox"]{ width:auto; margin:0; }

.error-message{ color: var(--color-error); font-size: var(--text-sm); margin-top: var(--space-2); display:none; }
.error-message.active{ display:block; }
.form-group.error input, .form-group.error select, .form-group.error textarea{ border-color: var(--color-error); }

.form-actions{ display:flex; gap: var(--space-4); justify-content:space-between; margin-top: var(--space-8); }
.form-actions .btn{ flex:1; }

/* Success view */
.success-view{ text-align:center; padding: var(--space-8); }
.success-content{ max-width:400px; margin:0 auto; }
.success-icon{ font-size: var(--text-4xl); margin-bottom: var(--space-6); }
.success-content p{ color: var(--color-muted); margin-bottom: var(--space-8); }

/* -------------------------------------------------
   Mobile sticky CTA
--------------------------------------------------*/
.mobile-cta{
  position:fixed; inset: auto 0 0 0; background: var(--color-bg);
  border-top:1px solid var(--color-border); padding: var(--space-4);
  display:flex; gap: var(--space-3); z-index:50;
}
.mobile-cta .btn{ flex:1; font-size: var(--text-sm); }
@media (min-width:768px){ .mobile-cta{ display:none; } }

/* -------------------------------------------------
   Utilities & a11y
--------------------------------------------------*/
.sr-only{
  position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0;
}

/* ===== Contrast Hotfix (cards & tiles) ===== */
.outcome-card h3,
.service-card h3,
.use-case-card h3 {
  color: var(--color-fg) !important;
  opacity: 1 !important;
}

.outcome-card p,
.service-card p,
.use-case-card p {
  color: #1f2937 !important;   /* strong slate on light */
  opacity: 1 !important;
}

@media (prefers-color-scheme: dark) {
  .outcome-card p,
  .service-card p,
  .use-case-card p {
    color: #cbd5e1 !important; /* readable on dark */
  }
}

/* Ensure card surfaces don't reduce text contrast */
.outcome-card,
.service-card,
.use-case-card {
  background: #ffffff !important;            /* solid white on light */
  border: 1px solid var(--color-border) !important;
}

@media (prefers-color-scheme: dark) {
  .outcome-card,
  .service-card,
  .use-case-card {
    background: var(--color-card) !important; /* solid dark surface */
  }
}

/* ===== MMP Comparison (high-contrast, polished) ===== */
.comparison-table { margin-bottom: var(--space-12); }

.table-wrapper{
  overflow: hidden;                 /* keep rounded corners clean */
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 18px;
  box-shadow: var(--shadow);
}

table{ width:100%; border-collapse: separate; border-spacing: 0; color: var(--color-fg); }

th, td{
  padding: 18px 20px;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

th{
  font-weight: 800;
  letter-spacing: -0.01em;
  background: #eef2f7;              /* light */
  color: #0b1220;
}

tbody tr:nth-child(odd){ background: #f7f8fb; } /* subtle zebra */

tbody tr:last-child td{ border-bottom: 0; }

/* Row hover for readability */
tbody tr:hover{
  background: #eaf2ff;
}

/* Dark mode overrides */
@media (prefers-color-scheme: dark){
  .table-wrapper{ background: #0f172a; border-color: #2b3547; }
  th{
    background: #111827;            /* deep header */
    color: #f1f5f9;
    border-bottom-color: #2b3547;
  }
  td{
    color: #e5e7eb;
    border-bottom-color: #2b3547;
  }
  tbody tr:nth-child(odd){ background: rgba(255,255,255,0.04); }
  tbody tr:hover{ background: rgba(56,189,248,0.10); } /* cyan tint */
}

/* Table caption note */
.table-note{
  margin-top: 12px;
  font-size: var(--text-sm);
  color: var(--color-muted);
  font-style: italic;
}

/* ===== Blog / Latest Insights readability ===== */
.blog-teaser h3{
  margin: 28px 0 16px;
}

.blog-grid{ gap: 20px; }

.blog-card{
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow);
  border-radius: 14px;
}

.blog-card h4{
  font-weight: 800;
  color: var(--color-fg);
}

.blog-card p{
  color: var(--color-muted);
}

.reading-time{
  background: rgba(0,0,0,0.06);
  color: var(--color-fg);
}
@media (prefers-color-scheme: dark){
  .reading-time{
    background: rgba(255,255,255,0.08);
    color: #e5e7eb;
  }
}

/* ===== Latest Insights - layout + contrast fix ===== */
.blog-teaser h3 { margin: 0 0 16px !important; }

.blog-grid{
  display: grid !important;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)) !important;
  gap: 24px !important;
}

.blog-card{
  background: var(--color-bg) !important;
  border: 1px solid var(--color-border) !important;
  border-radius: 14px !important;
  padding: var(--space-6) !important;
  box-shadow: var(--shadow) !important;
  transition: transform .2s ease, box-shadow .2s ease !important;
}
.blog-card:hover{
  transform: translateY(-2px) !important;
  box-shadow: var(--shadow-lg) !important;
}

.blog-card h4{
  margin-bottom: 8px !important;
  font-weight: 700 !important;      /* slightly lighter than 800 */
  color: var(--color-fg) !important;
  letter-spacing: -0.01em !important;
}
.blog-card p{
  color: var(--color-muted) !important;
  margin-bottom: 10px !important;
}

.blog-meta{
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
}

.reading-time{
  display: inline-block !important;
  padding: 2px 8px !important;
  border-radius: 999px !important;
  font-size: var(--text-sm) !important;
  background: rgba(0,0,0,0.07) !important;
  color: var(--color-fg) !important;
}

@media (prefers-color-scheme: dark){
  .blog-card{ background: #111827 !important; border-color: #2b3547 !important; }
  .reading-time{ background: rgba(255,255,255,0.08) !important; color: #e5e7eb !important; }
}
