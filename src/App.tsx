
import { useEffect, useRef, useState } from 'react';

const contactItems = [
  { label: 'Email', value: 'yadagiripradyumrao87@gmail.com' },
  { label: 'Mobile', value: '9966943111' },
];

const skillGroups = [
  ['Team Leadership', 'Social Media Marketing', 'Strategic Communication'],
  ['Digital Marketing', 'MS Excel', 'Adaptability & Teamwork'],
  ['Market Simulation & Analysis', 'Event Coordination & Outreach'],
];

const certifications = [
  'Tarde-A-Thon – Trading competition organized by the National Stock Exchange Academy',
  'Macroeconomics for Business Management – Fundação Instituto de Administração (Coursera)',
  'AI-Powered Business Analytics – National University of Singapore',
  'Enterprise Risk Management (ERM) Level-1 – Institute of Risk Management',
];

const sports = [
  'Captained and won in inter-college volleyball, throwball tournaments in Hyderabad and Goa',
  'Secured 3rd place in the 43rd Senior National Throw-ball Championship',
  'Represented CBSE at U-17 Nationals, Secured 1st & 3rd Positions at State Level',
];

const education = [
  {
    title: 'BBA in Computational Business Analytics',
    meta: 'Mahindra University, Telangana • Aug’22 – May’25',
    details: 'Secured a CGPA of 7.25 out of 10',
  },
  {
    title: 'Class XII',
    meta: 'alphores junior college • Apr’22 (State Board)',
    details: 'Secured 792 marks out of 1000',
  },
  {
    title: 'Class X',
    meta: 'paramita high school • Mar’20 (SSC)',
    details: 'Secured 10 CGPA',
  },
];

const academicInsights = [
  {
    title: 'Marketplace Simulation',
    meta: 'Apr’23 – Jun’23',
    details:
      'Tasked with marketing a product in a defined universe where classmates, operating separate teams, served as competitors. Created multiple brands for a single product using unique pricing strategies, overseeing a virtual business in a competitive market.',
  },
  {
    title: 'Global Immersion Programme',
    meta: 'Jun’24',
    details:
      'Completed a project on AI-powered business analytics at The National University of Singapore under Corporate Gurukul’s immersion programme.',
  },
];

const experience = [
  {    title: 'Digital Technologies Internship',
    meta: 'TECNICS Integration Technologies Pvt Ltd',
    details:
      'Internship program focused on Digital Technologies, gaining hands-on experience with cutting-edge digital solutions and integration technologies.',
  },
  {    title: 'Outreach & Design Lead (Internship)',
    meta: 'TiHAN – IITH • Jun’25 – Aug’25',
    details:
      'Led industry outreach, designed pitch decks, posters, brochures, and proposals; managed digital marketing and co-coordinated a national hackathon with ITS.',
  },
];

const baseUrl = import.meta.env.BASE_URL;

type View = 'home' | 'certificates';

function App() {
  const [view, setView] = useState<View>('home');
  const pdfCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pdfPreviewFailed, setPdfPreviewFailed] = useState(false);

  useEffect(() => {
    if (view !== 'certificates' || !pdfCanvasRef.current) {
      return;
    }

    let cancelled = false;

    async function renderPdfPreview() {
      try {
        setPdfPreviewFailed(false);
        const pdfJsUrl = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs';
        const pdfjsLib = await import(/* @vite-ignore */ pdfJsUrl);
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs';

        const pdf = await pdfjsLib.getDocument(`${baseUrl}internship.pdf`).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.6 });
        const canvas = pdfCanvasRef.current;

        if (!canvas || cancelled) {
          return;
        }

        const context = canvas.getContext('2d');
        if (!context) {
          throw new Error('Canvas is unavailable');
        }

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: context, viewport }).promise;
      } catch {
        if (!cancelled) {
          setPdfPreviewFailed(true);
        }
      }
    }

    renderPdfPreview();

    return () => {
      cancelled = true;
    };
  }, [view]);

  return (
    <>
      <header className="site-header">
        <div className="brand-block">
          <p className="brand-name">Yadagiri Pradyum Rao</p>
          <p className="brand-tag">BBA Student • Portfolio</p>
        </div>
        <nav className="site-nav" aria-label="Primary navigation">
          <button
            type="button"
            className={view === 'home' ? 'nav-button active' : 'nav-button'}
            onClick={() => setView('home')}
          >
            Home
          </button>
          <button
            type="button"
            className={view === 'certificates' ? 'nav-button active' : 'nav-button'}
            onClick={() => setView('certificates')}
          >
            Certificates
          </button>
        </nav>
      </header>

      <main className="page-shell">
        {view === 'home' ? (
          <>
            <section id="home" className="hero-section">
              <div className="hero-copy">
                <p className="eyebrow">BBA in Computational Business Analytics</p>
                <h1>Yadagiri Pradyum Rao</h1>
                <p className="intro-text">
                  A driven BBA student at Mahindra University, passionate about business analytics, marketing, and leadership. Experienced in market simulations, global immersion, and event coordination. Strong communicator and team player with a record of academic and extracurricular excellence.
                </p>
                <div className="hero-highlights" aria-label="Profile highlights">
                  <div>
                    <strong>Business Analytics</strong>
                    <span>Academic focus</span>
                  </div>
                  <div>
                    <strong>Marketing</strong>
                    <span>Digital campaigns</span>
                  </div>
                  <div>
                    <strong>Leadership</strong>
                    <span>Events and sports</span>
                  </div>
                </div>
                <div className="cta-row">
                  <button type="button" className="primary-btn" onClick={() => setView('certificates')}>
                    View Certificates
                  </button>
                  <a href={`${baseUrl}internship.pdf`} target="_blank" rel="noreferrer" className="secondary-btn">
                    Internship Program
                  </a>
                </div>
              </div>

              <div className="hero-card">
                <img src={`${baseUrl}passport-photo.jpeg`} alt="Portrait of Yadagiri Pradyum Rao" className="profile-photo" />
                <div className="hero-meta">
                  <h2>Quick Snapshot</h2>
                  <p>
                    Passionate about market research, strategic communication, digital campaigns, and data-driven decision making.
                  </p>
                  <ul style={{ wordBreak: 'break-word', whiteSpace: 'pre-line' }}>
                    <li>Focus: business analytics + marketing</li>
                    <li>Strengths: leadership, adaptability, teamwork</li>
                    <li>Ambition: building practical business insights and outreach impact</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="info-grid" id="about">
              <article className="info-panel">
                <h2>About</h2>
                <p style={{ wordBreak: 'break-word', whiteSpace: 'pre-line' }}>
                  Yadagiri Pradyum Rao is a BBA student at Mahindra University with a strong academic record and hands-on exposure to business analytics, marketing, and student leadership. His profile reflects a balance of performance, communication, and real-world initiative.
                </p>
              </article>

              <article className="info-panel">
                <h2>Contact</h2>
                <div className="contact-list">
                  {contactItems.map((item) => (
                    <p key={item.label} style={{ wordBreak: 'break-word', whiteSpace: 'pre-line' }}>
                      <strong>{item.label}:</strong>{' '}
                      {item.value}
                    </p>
                  ))}
                </div>
              </article>
            </section>

            <section id="skills" className="section-block">
              <div className="section-title-row">
                <h2>Key Skills</h2>
              </div>
              <div className="skill-grid">
                {skillGroups.map((group, idx) => (
                  <div key={idx} className="skill-group">
                    {group.map((skill) => (
                      <span key={skill} className="skill-pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </section>

            <section id="education" className="section-block">
              <div className="section-title-row">
                <h2>Education</h2>
              </div>
              <div className="timeline">
                {education.map((item) => (
                  <article key={item.title} className="timeline-card">
                    <p className="timeline-meta" style={{ wordBreak: 'break-word', whiteSpace: 'pre-line' }}>{item.meta}</p>
                    <h3 style={{ wordBreak: 'break-word', whiteSpace: 'pre-line' }}>{item.title}</h3>
                    <p style={{ wordBreak: 'break-word', whiteSpace: 'pre-line' }}>{item.details}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="academics" className="section-block">
              <div className="section-title-row">
                <h2>Academic Insights</h2>
              </div>
              <div className="timeline">
                {academicInsights.map((item) => (
                  <article key={item.title} className="timeline-card">
                    <p className="timeline-meta">{item.meta}</p>
                    <h3>{item.title}</h3>
                    <p>{item.details}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="experience" className="section-block">
              <div className="section-title-row">
                <h2>Experience</h2>
              </div>
              <div className="timeline">
                {experience.map((item) => (
                  <article key={item.title} className="timeline-card">
                    <p className="timeline-meta">{item.meta}</p>
                    <h3>{item.title}</h3>
                    <p>{item.details}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="certifications" className="section-block">
              <div className="section-title-row">
                <h2>Certifications</h2>
              </div>
              <div className="card-list">
                {certifications.map((item) => (
                  <p key={item} className="bullet-card" style={{ wordBreak: 'break-word', whiteSpace: 'pre-line' }}>
                    {item}
                  </p>
                ))}
              </div>
            </section>

            <section id="extra-curricular" className="section-block">
              <div className="section-title-row">
                <h2>Extra-Curricular & Sports</h2>
              </div>
              <div className="card-list">
                {sports.map((item) => (
                  <p key={item} className="bullet-card" style={{ wordBreak: 'break-word', whiteSpace: 'pre-line' }}>
                    {item}
                  </p>
                ))}
                <p className="bullet-card" style={{ wordBreak: 'break-word', whiteSpace: 'pre-line' }}>
                  Cultural Events Volunteer (2022–2025) – worked with Artfelt & Aeforia Clubs – Managed logistics, decor, hosting, and marathon events, Mahindra University
                </p>
              </div>
            </section>
          </>
        ) : (
          <section className="certificate-page">
            <div className="certificate-header-row">
              <div>
                <p className="eyebrow">Certificates</p>
                <h1>Certificates & Internship</h1>
                <p className="intro-text">
                  My certificates and internship, including my internship certificate for Digital Technologies with TECNICS Integration Technologies PVT LTD.
                </p>
              </div>
              <button type="button" className="secondary-btn" onClick={() => setView('home')}>
                Back to Home
              </button>
            </div>

            <div className="certificate-layout">
              <article className="info-panel certificate-summary">
                <h2>Internship Details</h2>
                <p style={{ wordBreak: 'break-word', whiteSpace: 'pre-line' }}>
                  Internship certificate for Digital Technologies with TECNICS Integration Technologies PVT LTD.
                </p>
                <h2 style={{ marginTop: '2rem' }}>Other Certificates</h2>
                <ul className="certificate-details-list">
                  <li><strong>Tarde-A-Thon</strong> – Trading competition organized by the National Stock Exchange Academy.</li>
                  <li><strong>Macroeconomics for Business Management</strong> – Online course authorized by Fundação Instituto de Administração via Coursera. (Feb’23 – Mar’23)</li>
                  <li><strong>AI-Powered Business Analytics – NUS</strong> – Corporate Gurukul Immersion Program, National University of Singapore.</li>
                  <li><strong>Enterprise Risk Management (ERM) Level-1</strong> – Completed a project on Risk Analysis for Nike, Institute of Risk Management. (Jun’24 – Nov’24)</li>
                </ul>
                <h2 style={{ marginTop: '2rem' }}>Sports & Extra-Curricular</h2>
                <ul className="certificate-details-list">
                  <li><strong>Airo’ MU, BITS Sphree, etc. Sports Fest</strong> – Captained and won in inter-college volleyball, throwball tournaments in Hyderabad and Goa.</li>
                  <li><strong>Throw-ball Nationals</strong> – Secured 3rd place in the 43rd Senior National Throw-ball Championship.</li>
                  <li><strong>Kho-kho Nationals</strong> – Represented CBSE at U-17 Nationals, Secured 1st & 3rd Positions at State Level (2018-2019).</li>
                  <li><strong>Cultural Events Volunteer (2022–2025)</strong> – Worked with Artfelt & Aeforia Clubs – Managed logistics, decor, hosting, and marathon events, Mahindra University.</li>
                </ul>
                <p style={{ wordBreak: 'break-word', whiteSpace: 'pre-line', marginTop: '2rem' }}>
                  This certificate page is designed to showcase your achievements clearly and keep the main portfolio focused on your academic and professional profile.
                </p>
              </article>

              <div className="resume-viewer certificate-viewer">
                <div className="pdf-preview-frame">
                  <canvas ref={pdfCanvasRef} className="pdf-preview-canvas" aria-label="Internship certificate preview" />
                  {pdfPreviewFailed ? (
                    <div className="pdf-preview-message">
                      <p>Preview is unavailable. Use the button above to open the internship PDF.</p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export default App;
