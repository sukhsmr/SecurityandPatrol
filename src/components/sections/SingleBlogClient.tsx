'use client';

import Link from 'next/link';

export default function SingleBlogClient() {
  return (
    <article style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", backgroundColor: '#f8f9fa', minHeight: '100vh' }}>

      {/* ── Hero Banner ── */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '520px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      }}>
        <img
          src="https://www.adsguards.com/wp-content/uploads/2026/08/security-officer-vs-security-guard-featured.webp"
          alt="Two ADS Security Guards reviewing post orders"
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            opacity: 0.35, position: 'absolute', top: 0, left: 0,
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          maxWidth: '860px', margin: '0 auto', padding: '0 24px 50px',
        }}>
          <span style={{
            display: 'inline-block', backgroundColor: '#ee8e09', color: '#fff',
            fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px',
            textTransform: 'uppercase', padding: '5px 14px', borderRadius: '4px',
            marginBottom: '18px',
          }}>Benefits &amp; Best Practices</span>
          <h1 style={{
            color: '#fff', fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800,
            lineHeight: 1.25, margin: '0 0 20px', textShadow: '0 2px 12px rgba(0,0,0,0.6)',
          }}>
            Security officer vs. security guard: What&apos;s the difference?
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <span style={{ color: '#ccc', fontSize: '14px' }}>By <strong style={{ color: '#ee8e09' }}>Toot Technologies</strong></span>
            <span style={{ color: '#777', fontSize: '13px' }}>|</span>
            <span style={{ color: '#ccc', fontSize: '14px' }}>August 20, 2026</span>
            <span style={{ color: '#777', fontSize: '13px' }}>|</span>
            <span style={{ color: '#ccc', fontSize: '14px' }}>8 min read</span>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '56px 24px 80px' }}>

        {/* Intro */}
        <p style={prose}>
          The security officer vs. security guard question sounds like it should have a clean answer. Search for security
          services or read a few job postings and you&apos;ll run into both titles. Some companies use them for different
          positions. Others use them for the same job. So, is there a real difference?
        </p>
        <p style={prose}>
          Usually, no. The U.S. Bureau of Labor Statistics says security guards are also called security officers, and O*NET
          lists both among the reported job titles for the same occupation. An employer may reserve &ldquo;security officer&rdquo;
          for a lead or more experienced role, but the title alone doesn&apos;t tell you what the person is trained, licensed,
          or assigned to do.
        </p>

        {/* Section heading */}
        <h2 style={h2Style}>Security officer vs. security guard: a quick comparison</h2>

        {/* Comparison Image */}
        <div style={{ borderRadius: '12px', overflow: 'hidden', margin: '28px 0', boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}>
          <img
            src="https://www.adsguards.com/wp-content/uploads/2026/08/security-guard-officer-core-duties-infographic.webp"
            alt="Security guard and security officer core duties infographic"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        {/* Comparison Table */}
        <div style={{ overflowX: 'auto', margin: '32px 0' }}>
          <table style={{
            width: '100%', borderCollapse: 'collapse', fontSize: '15px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderRadius: '12px', overflow: 'hidden',
          }}>
            <thead>
              <tr style={{ background: 'linear-gradient(90deg, #1a1a2e 0%, #16213e 100%)' }}>
                {['Question', 'Security Guard', 'Security Officer'].map(h => (
                  <th key={h} style={{ color: '#fff', padding: '14px 18px', textAlign: 'left', fontWeight: 700, fontSize: '14px', letterSpacing: '0.5px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Separate occupation nationwide?', 'No — it is the standard government occupational term.', 'Usually no — often another title for the same occupation.'],
                ['Typical use of the title', 'Front-line position: post, patrol, entrance, or monitoring station.', 'Sometimes used for a lead, specialized, or client-facing position.'],
                ['Usual duties', 'Patrols, access control, observation, incident response, and reporting.', 'Often the same duties, with possible added coordination or supervisory work.'],
                ['Does the title prove more authority?', 'No.', 'No. Authority comes from law, licensing, company policy, and the assignment.'],
                ['Does the title mean armed or unarmed?', 'No.', 'No. Armed status requires the proper permits and an armed assignment.'],
              ].map(([q, g, o], i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                  <td style={{ padding: '14px 18px', fontWeight: 600, color: '#1a1a2e', borderBottom: '1px solid #e9ecef' }}>{q}</td>
                  <td style={{ padding: '14px 18px', color: '#444', borderBottom: '1px solid #e9ecef' }}>{g}</td>
                  <td style={{ padding: '14px 18px', color: '#444', borderBottom: '1px solid #e9ecef' }}>{o}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Highlight callout */}
        <Callout text="When you compare proposals or job descriptions, the scope of work matters more than the name on the uniform." />

        <h2 style={h2Style}>Why the two titles overlap</h2>
        <p style={prose}>
          There is no nationwide rule that makes every security officer senior to every security guard. In fact, the{' '}
          <a href="https://www.bls.gov/ooh/protective-service/security-guards.htm" target="_blank" rel="noreferrer" style={link}>
            U.S. Bureau of Labor Statistics
          </a>{' '}
          describes security guards as &ldquo;also called security officers.&rdquo; Its standard list of duties includes patrolling
          property, monitoring alarms and video systems, controlling access, responding to emergencies, enforcing property rules,
          and writing reports.
        </p>
        <p style={prose}>
          <a href="https://www.onetonline.org/link/details/33-9032.00" target="_blank" rel="noreferrer" style={link}>
            O*NET&apos;s profile for security guards
          </a>{' '}
          lists Armed Security Officer, Campus Security Officer, Hotel Security Officer, Security Agent, Security Guard, and
          Security Officer under the same occupational code.
        </p>
        <p style={prose}>
          Those are workplace naming choices, not a reliable national ranking system.
        </p>

        <h2 style={h2Style}>What both roles usually do</h2>
        <p style={prose}>The daily assignment depends on the property, but most guard and officer positions pull from the same group of responsibilities.</p>

        {/* Duties Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', margin: '28px 0' }}>
          {[
            { icon: '🔐', title: 'Control Access', desc: 'Check credentials, verify visitors, manage sign-in procedures, and prevent unauthorized entry.' },
            { icon: '🚶', title: 'Patrol & Monitor', desc: 'Inspect doors, gates, parking areas, stairwells, and monitor cameras from a control room.' },
            { icon: '📋', title: 'Respond & Report', desc: 'Assess problems, follow site procedures, contact emergency services, and document incidents.' },
            { icon: '⚠️', title: 'Enforce Site Rules', desc: 'Address trespassing, unsafe behavior, restricted areas, and after-hours access using post orders.' },
          ].map(d => (
            <div key={d.title} style={{
              backgroundColor: '#fff', borderRadius: '12px', padding: '24px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
              borderTop: '4px solid #ee8e09',
              transition: 'transform 0.2s',
            }}>
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>{d.icon}</div>
              <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 700, color: '#1a1a2e' }}>{d.title}</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#666', lineHeight: 1.6 }}>{d.desc}</p>
            </div>
          ))}
        </div>

        <h2 style={h2Style}>When &ldquo;security officer&rdquo; may signal a different job</h2>
        <p style={prose}>
          Although the titles overlap, employers sometimes use &ldquo;officer&rdquo; for a position with a wider assignment. That
          person might supervise a shift, coordinate responses, review incident reports, train new staff, or communicate with
          property management and emergency services.
        </p>
        <p style={prose}>
          Still, none of this is guaranteed by the title. A security guard may lead a shift. A security officer may work a fixed
          lobby post. The employer&apos;s staffing plan and job description settle the question.
        </p>

        <h2 style={h2Style}>The California distinction businesses should know</h2>
        <div style={{ borderRadius: '12px', overflow: 'hidden', margin: '28px 0', boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}>
          <img
            src="https://www.adsguards.com/wp-content/uploads/2026/08/california-security-guard-proprietary-officer-infographic.webp"
            alt="California security guard vs. Proprietary Security Officer infographic"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
        <p style={prose}>
          California adds a specific wrinkle to the security officer vs. security guard question. The state has separate
          registration categories for a security guard and a Proprietary Private Security Officer (PSO).
        </p>
        <p style={prose}>
          A PSO is generally an unarmed person who works exclusively for one employer and cannot be contracted to another business.
          A California security guard may work for a licensed private patrol operator that provides guard services to clients.
        </p>
        <Callout text={"This legal distinction is narrower than the everyday use of \u201csecurity officer.\u201d Always verify the worker\u2019s actual registration."} />

        <h2 style={h2Style}>Armed status is a separate question</h2>
        <Callout text="Neither title tells you whether a person carries a firearm." />
        <p style={prose}>
          In California, carrying a firearm on duty requires BSIS permits and the assignment must call for armed coverage.
          Changing the job title doesn&apos;t change the risk or the permit requirements.
        </p>

        <h2 style={h2Style}>What to ask before hiring security staff</h2>
        <div style={{ borderRadius: '12px', overflow: 'hidden', margin: '28px 0', boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}>
          <img
            src="https://www.adsguards.com/wp-content/uploads/2026/08/security-services-hiring-review.webp"
            alt="Property manager reviews security proposals"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
        <ul style={{ paddingLeft: '0', listStyle: 'none', margin: '24px 0' }}>
          {[
            'Who employs and supervises the staff assigned to the property?',
            'What licenses, registrations, permits, and background checks apply?',
            'What training does the assignment require beyond the legal minimum?',
            'Will staff work a fixed post, perform patrols, monitor cameras, or handle access control?',
            'Who responds when an incident exceeds the on-site person\'s role?',
            'How are daily activity reports and incident reports delivered?',
            'What happens if the assigned person is absent?',
            'Who creates and updates the post orders?',
          ].map((item, i) => (
            <li key={i} style={{
              display: 'flex', gap: '14px', alignItems: 'flex-start',
              padding: '14px 0', borderBottom: '1px solid #eee',
            }}>
              <span style={{
                flexShrink: 0, width: '26px', height: '26px', borderRadius: '50%',
                backgroundColor: '#ee8e09', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '13px', fontWeight: 700, marginTop: '1px',
              }}>{i + 1}</span>
              <span style={{ fontSize: '16px', color: '#333', lineHeight: 1.5 }}>{item}</span>
            </li>
          ))}
        </ul>

        {/* FAQ */}
        <h2 style={h2Style}>Frequently asked questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '28px 0' }}>
          {[
            {
              q: 'Is a security officer higher ranking than a security guard?',
              a: 'Sometimes, but not automatically. An employer may use "security officer" for a lead or supervisory position. Other employers use the two titles interchangeably. Check the job description, reporting structure, and assigned duties.',
            },
            {
              q: 'Are a security guard and a security officer the same thing?',
              a: 'In many workplaces, yes. Federal occupational sources group the titles together. State licensing categories and individual employers can create more specific distinctions.',
            },
            {
              q: 'Can a security officer carry a gun?',
              a: 'Only if the person has the permits required by the state and is working an armed assignment. The word "officer" does not provide firearms authority.',
            },
            {
              q: 'Does a security officer have more legal authority?',
              a: 'Not because of the title. A private security worker\'s authority depends on applicable law, licensing, employer policy, and the circumstances. Security officers are not automatically police officers.',
            },
            {
              q: 'What is a Proprietary Private Security Officer in California?',
              a: 'A California PSO is generally an unarmed, uniformed security employee who works exclusively for one employer and interacts with the public. It is a specific BSIS registration category, not a general label for every person called a security officer.',
            },
          ].map(({ q, a }) => (
            <details key={q} style={{
              backgroundColor: '#fff', borderRadius: '10px', overflow: 'hidden',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)', cursor: 'pointer',
            }}>
              <summary style={{
                padding: '18px 22px', fontWeight: 700, fontSize: '16px', color: '#1a1a2e',
                listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                {q}
                <span style={{ fontSize: '20px', color: '#ee8e09', marginLeft: '12px', flexShrink: 0 }}>+</span>
              </summary>
              <p style={{ padding: '0 22px 18px', margin: 0, color: '#555', lineHeight: 1.7, fontSize: '15px' }}>{a}</p>
            </details>
          ))}
        </div>

        {/* Conclusion */}
        <h2 style={h2Style}>Final thoughts on security officer vs. security guard</h2>
        <p style={prose}>
          For most searches, security officer vs. security guard is a comparison between two titles for the same broad occupation.
          Some employers use &ldquo;officer&rdquo; for a senior or specialized job, and California has a distinct in-house PSO
          category, but the label by itself proves very little.
        </p>
        <p style={prose}>
          Before hiring, look at the licenses, duties, supervision, training, post orders, and response plan. Those details
          determine what protection you&apos;re getting.
        </p>

        {/* CTA Card */}
        <div style={{
          marginTop: '56px', padding: '48px 40px', borderRadius: '16px',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          textAlign: 'center', boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
        }}>
          <h3 style={{ color: '#fff', fontSize: '26px', fontWeight: 800, margin: '0 0 14px' }}>
            Need licensed security professionals?
          </h3>
          <p style={{ color: '#bbb', fontSize: '16px', margin: '0 0 28px', lineHeight: 1.6 }}>
            ADS Guards provides licensed, trained security staff for commercial properties, events, and more across California.
          </p>
          <Link href="/contact-us" style={{
            display: 'inline-block', backgroundColor: '#ee8e09', color: '#fff',
            padding: '14px 36px', borderRadius: '8px', fontWeight: 700, fontSize: '16px',
            textDecoration: 'none', letterSpacing: '0.5px',
            boxShadow: '0 6px 20px rgba(238,142,9,0.35)',
          }}>
            Get a Free Consultation
          </Link>
        </div>

        {/* Tags */}
        <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '2px solid #e9ecef' }}>
          <p style={{ fontSize: '13px', fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>Tags</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['armed security', 'California security', 'commercial security', 'private security', 'security guard', 'security officer', 'security licensing', 'unarmed security'].map(tag => (
              <span key={tag} style={{
                backgroundColor: '#f1f3f5', color: '#495057', fontSize: '13px', fontWeight: 600,
                padding: '6px 14px', borderRadius: '20px', letterSpacing: '0.2px',
              }}>#{tag}</span>
            ))}
          </div>
        </div>

        {/* Related Posts Nav */}
        <div style={{
          marginTop: '40px', padding: '24px', borderRadius: '12px', backgroundColor: '#fff',
          boxShadow: '0 4px 16px rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', gap: '16px',
        }}>
          <span style={{ fontSize: '22px' }}>←</span>
          <div>
            <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#999', textTransform: 'uppercase', letterSpacing: '1px' }}>Previous Post</p>
            <Link href="/ads-blog/loss-prevention-in-retail" style={{ color: '#1a1a2e', fontWeight: 700, fontSize: '15px', textDecoration: 'none' }}>
              Loss prevention in retail: 12 ways to reduce theft and shrinkage
            </Link>
          </div>
        </div>

      </div>
    </article>
  );
}

// ── Shared Styles ──
const prose: React.CSSProperties = {
  fontSize: '17px',
  lineHeight: 1.85,
  color: '#333',
  margin: '0 0 20px',
};

const h2Style: React.CSSProperties = {
  fontSize: 'clamp(20px, 3vw, 28px)',
  fontWeight: 800,
  color: '#1a1a2e',
  margin: '48px 0 18px',
  paddingBottom: '12px',
  borderBottom: '3px solid #ee8e09',
  display: 'inline-block',
};

const link: React.CSSProperties = {
  color: '#ee8e09',
  textDecoration: 'none',
  fontWeight: 600,
  borderBottom: '1px solid rgba(238,142,9,0.3)',
};

function Callout({ text }: { text: string }) {
  return (
    <div style={{
      backgroundColor: '#fff8ee',
      borderLeft: '5px solid #ee8e09',
      padding: '18px 22px',
      borderRadius: '0 10px 10px 0',
      margin: '28px 0',
      display: 'flex',
      gap: '14px',
      alignItems: 'flex-start',
    }}>
      <span style={{ fontSize: '22px', flexShrink: 0 }}>💡</span>
      <p style={{ margin: 0, fontSize: '16px', color: '#5a3b00', fontWeight: 500, lineHeight: 1.65 }}>{text}</p>
    </div>
  );
}
