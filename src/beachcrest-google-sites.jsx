import { useState, useEffect } from "react";

const TEAL = "#1f4e5a";
const SAND = "#f3ede2";
const INK = "#22201c";
const DRIFT = "#6b6457";
const LINE = "#ddd";
const WHITE = "#ffffff";
const HERO_IMG = "https://beachcrest.org/wp-content/uploads/20190630_152731-1280x720.jpg";

const PAGES = [
  "Home", "About", "Documents & Rules",
  "Resident Resources", "News & Events", "Pay Dues", "Contact"
];

function GSNav({ page, go }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header style={{ background: TEAL, color: "#fff" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <span style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: 22, fontWeight: 600, letterSpacing: "0.01em" }}>Beachcrest</span>
        <nav style={{ display: "flex", gap: 0, flexWrap: "wrap" }} className="gs-nav">
          {PAGES.map(pg => (
            <button key={pg} onClick={() => { go(pg); setMenuOpen(false); }} style={{
              background: "none", border: "none", color: "#fff", cursor: "pointer",
              fontSize: 14, padding: "8px 10px", fontFamily: "inherit",
              borderBottom: page === pg ? "2px solid #fff" : "2px solid transparent",
              opacity: page === pg ? 1 : 0.85,
            }}>{pg}</button>
          ))}
        </nav>
        <button className="gs-burger" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "1px solid rgba(255,255,255,0.5)", color: "#fff", padding: "6px 12px", borderRadius: 4, cursor: "pointer", fontSize: 14 }}>☰</button>
      </div>
      {menuOpen && (
        <div style={{ background: "#16383f", padding: "8px 20px 12px" }}>
          {PAGES.map(pg => (
            <button key={pg} onClick={() => { go(pg); setMenuOpen(false); }} style={{ display: "block", width: "100%", background: "none", border: "none", color: "#fff", textAlign: "left", padding: "10px 0", fontSize: 16, cursor: "pointer", fontFamily: "inherit", borderBottom: `1px solid rgba(255,255,255,0.1)` }}>{pg}</button>
          ))}
        </div>
      )}
    </header>
  );
}

// FIX 1: Darker overlay + white text + text shadow for hero contrast
function GSBanner({ title, sub, short }) {
  return (
    <div style={{ position: "relative", height: short ? 200 : 420, overflow: "hidden" }}>
      <img src={HERO_IMG} alt="Beachcrest waterfront" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(10,30,35,0.72)" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "0 24px", color: "#fff" }}>
        <h1 style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: short ? 32 : 52, margin: 0, fontWeight: 600, lineHeight: 1.1, color: "#fff", textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>{title}</h1>
        {sub && <p style={{ fontSize: 18, marginTop: 12, maxWidth: 560, lineHeight: 1.5, opacity: 0.92, textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}>{sub}</p>}
      </div>
    </div>
  );
}

function GSSection({ bg, children }) {
  return (
    <section style={{ background: bg || WHITE, padding: "48px 20px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        {children}
      </div>
    </section>
  );
}

function GSH2({ children }) {
  return <h2 style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: 28, fontWeight: 600, color: INK, margin: "0 0 16px", lineHeight: 1.2 }}>{children}</h2>;
}

function GSH3({ children }) {
  return <h3 style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: 20, fontWeight: 600, color: INK, margin: "0 0 10px" }}>{children}</h3>;
}

function GSP({ children, muted }) {
  return <p style={{ fontSize: 16, lineHeight: 1.65, color: muted ? DRIFT : INK, margin: "0 0 14px" }}>{children}</p>;
}

function GSTwo({ left, right }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="gs-two">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

// FIX 2: GSFour now supports onClick for linked cards
function GSFour({ items }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }} className="gs-four">
      {items.map((it, i) => (
        <div key={i} onClick={it.onClick} style={{ padding: "16px 0", borderTop: `2px solid ${TEAL}`, cursor: it.onClick ? "pointer" : "default" }}>
          <div style={{ fontFamily: "'Spectral', serif", fontSize: 16, fontWeight: 600, color: it.onClick ? TEAL : INK, marginBottom: 6, textDecoration: it.onClick ? "underline" : "none" }}>{it.title}</div>
          <div style={{ fontSize: 14, color: DRIFT, lineHeight: 1.5 }}>{it.sub}</div>
        </div>
      ))}
    </div>
  );
}

function GSBtn({ children, onClick, ghost }) {
  return (
    <button onClick={onClick} style={{
      background: ghost ? "transparent" : TEAL,
      color: ghost ? TEAL : "#fff",
      border: `2px solid ${TEAL}`,
      padding: "10px 22px", borderRadius: 4, fontSize: 15,
      fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
      marginRight: 12, marginTop: 8,
    }}>{children}</button>
  );
}

// FIX 4: Left-aligned FAQ answers
function GSCollapsible({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ border: `1px solid ${LINE}`, borderRadius: 4, overflow: "hidden" }}>
      {items.map((it, i) => (
        <div key={i} style={{ borderTop: i ? `1px solid ${LINE}` : "none" }}>
          <button onClick={() => setOpen(open === i ? null : i)} style={{
            width: "100%", background: open === i ? "#f5f5f5" : WHITE,
            border: "none", textAlign: "left", padding: "14px 16px",
            fontSize: 16, fontWeight: open === i ? 600 : 400,
            cursor: "pointer", display: "flex", justifyContent: "space-between",
            alignItems: "center", fontFamily: "inherit", color: INK,
          }}>
            <span>{it.q}</span>
            <span style={{ color: TEAL, fontSize: 18 }}>{open === i ? "▲" : "▼"}</span>
          </button>
          {open === i && (
            <div style={{ padding: "12px 16px 16px", background: WHITE, fontSize: 15, lineHeight: 1.65, color: INK, borderTop: `1px solid ${LINE}`, textAlign: "left" }}>
              {it.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function GSLinks({ items }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {items.map((it, i) => (
        <li key={i} style={{ padding: "8px 0", borderBottom: `1px solid ${LINE}`, fontSize: 15 }}>
          {it.href
            ? <a href={it.href} target="_blank" rel="noopener noreferrer" style={{ color: TEAL, textDecoration: "underline" }}>{it.label}</a>
            : <span style={{ color: DRIFT }}>{it.label}</span>}
          {it.note && <div style={{ fontSize: 13, color: DRIFT, marginTop: 2 }}>{it.note}</div>}
        </li>
      ))}
    </ul>
  );
}

function GSTable({ headers, rows }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
        <thead>
          <tr style={{ background: TEAL, color: "#fff" }}>
            {headers.map((h, i) => <th key={i} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600 }}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ background: i % 2 ? "#f9f9f9" : WHITE }}>
              {r.map((c, j) => <td key={j} style={{ padding: "10px 12px", borderBottom: `1px solid ${LINE}` }}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------- Pages

function Home({ go }) {
  return <>
    <GSBanner title="Beachcrest" sub="A South Sound private community of 262 homes" />
    <GSSection>
      {/* FIX 3: Title case */}
      <GSH2>Welcome To Beachcrest</GSH2>
      <GSP>The Beachcrest community is nestled just west of Nisqually Reach along the South Puget Sound, in northern Thurston County. Our assets give residents access to a half-mile of private beach, two cabanas for waterfront gatherings, a high-tide marina with 24 leased slips and 21 kayak/canoe rack slots, a boat ramp, mooring buoys, a nature trail, and a playground park with a basketball court.</GSP>
      <GSP>Because we are a private community — owning our roads, stormwater infrastructure, and all of the above — we receive no funding from the Thurston County property taxes we pay. All maintenance and upkeep is supported by mandatory annual dues on each property.</GSP>
      <GSBtn onClick={() => go("Pay Dues")}>Pay annual dues</GSBtn>
      <GSBtn ghost onClick={() => go("Resident Resources")}>Resident resources</GSBtn>
    </GSSection>
    <GSSection bg={SAND}>
      {/* FIX 3: Title case */}
      <GSH2>Find What You Need</GSH2>
      {/* FIX 2: Cards now link to subpages */}
      <GSFour items={[
        { title: "About", sub: "Board, meetings & how we run", onClick: () => go("About") },
        { title: "Documents & Rules", sub: "Bylaws, covenants, policies, forms", onClick: () => go("Documents & Rules") },
        { title: "Resident Resources", sub: "Marina, FAQs & links", onClick: () => go("Resident Resources") },
        { title: "News & Events", sub: "Calendar & The VIEW newsletter", onClick: () => go("News & Events") },
      ]} />
    </GSSection>
    <GSSection>
      <GSTwo
        left={<><GSH3>Getting Here</GSH3><GSP>From Tacoma, take I-5 Nisqually exit 114. From Olympia, take exit 111. Lacey, Olympia, Tumwater, DuPont, and JBLM are all under 20 minutes. Closest shopping is about 10 minutes in Hawks Prairie.</GSP></>}
        right={<><GSH3>Schools</GSH3><GSP>North Thurston is our local district, with bus service to Olympic View Elementary, Salish Middle School, and River Ridge High School.</GSP></>}
      />
    </GSSection>
  </>;
}

function About() {
  return <>
    <GSBanner title="About" short />
    <GSSection>
      {/* FIX 3: Title case */}
      <GSH2>How Beachcrest Runs</GSH2>
      <GSP muted>Beachcrest is governed by a seven-member volunteer Board of Trustees, elected by the membership.</GSP>
      <GSTwo
        left={<>
          <GSH3>Board Meetings</GSH3>
          <GSP>The Board meets <strong>6:30–8:30 pm on the first Wednesday of each month</strong> (except May — Annual Membership Meeting) at VIS Group, 8617 Martin Way E, Lacey, and on Zoom.</GSP>
          <div style={{ background: SAND, padding: "12px 14px", borderRadius: 4, fontSize: 14, marginTop: 8 }}>
            <strong>Zoom:</strong> Meeting ID 832 3881 4623 · Passcode 372776
          </div>
        </>}
        right={<>
          <GSH3>Questions For The Board?</GSH3>
          <GSP>Call <strong>(360) 350-3610 ext 804</strong> or use the Contact page.</GSP>
        </>}
      />
    </GSSection>
    <GSSection bg={SAND}>
      {/* FIX 3: Title case */}
      <GSH2>Board Of Trustees — Elected 5/20/2026</GSH2>
      <GSTable
        headers={["Name", "Position", "Term"]}
        rows={[
          ["David Kelley", "President + Cabana", "1-Year"],
          ["Dennis Simmons", "Vice President + Security Manager", "1-Year"],
          ["Steve Hoffman", "Secretary + FC + PMC + Website", "1-Year"],
          ["Anne Stone", "Treasurer + FC Chair + PMC Chair", "2-Year"],
          ["Sandi Levin", "Member at Large + FC", "2-Year"],
          ["John Strasser", "Member at Large + Marina Co-Manager", "2-Year"],
          ["Larry Carnahan", "Member at Large", "1-Year"],
        ]}
      />
      <p style={{ fontSize: 13, color: DRIFT, marginTop: 10 }}>FC = Financial Committee · PMC = Property Management Committee</p>
    </GSSection>
    <GSSection>
      {/* FIX 3: Title case */}
      <GSH2>Meeting Minutes</GSH2>
      <GSP>All minutes include Financial and Property Management Committee reports. Files open in Google Drive.</GSP>
      <GSLinks items={[
        { label: "January 2026", href: "https://drive.google.com/file/d/1yZJK8IQt7gHbyEurKj7LVDXpBWamfbIt/view" },
        { label: "February 2026", href: "https://drive.google.com/file/d/1vo1Qbf_vDXslHobv_z-_sgh3r1SBSTq1s/view" },
        { label: "March 2026", href: "https://drive.google.com/file/d/12RPDLF2ctQ5LfIrfx_lDLV17r0ZQ8gcO/view" },
        { label: "April 2026", href: "https://drive.google.com/drive/folders/1qZI2q9F7xm0kcZLDvkKSHoL6is2Mzvj3" },
        { label: "May 2026 — Annual Meeting", href: "https://drive.google.com/drive/folders/1kNNP6yW2Xp_ZiJoBl2cYoeS4y2hVM4DG" },
        { label: "June 2026", href: "https://drive.google.com/drive/folders/1XhtiUa_ocR5VaEoXBLqy01R6B7L0dXsk" },
        { label: "Archive 2020–2023", href: "https://drive.google.com/drive/folders/1xB-zTPMNfDVaU1R0nx5g2efn9uVL68hN" },
        { label: "Archive 2012–2019", href: "https://drive.google.com/drive/folders/1ChHtbcz8gBh6EREW1ScJ6cr6mSiEycDL" },
        { label: "Archive 2007–2011", href: "https://drive.google.com/drive/folders/16Nyp1C-9hfJiqO7-Gy7ScXUPkIBJdCc0" },
        { label: "Archive 1994–2006", href: "https://drive.google.com/drive/folders/1t5O-fC8oZSStDuNnViZGulgn2OcAR5rq" },
      ]} />
    </GSSection>
  </>;
}

function Documents() {
  return <>
    <GSBanner title="Documents & Rules" short />
    <GSSection>
      {/* FIX 3: Title case */}
      <GSH2>Governing Documents</GSH2>
      <GSP muted>All files open in Google Drive.</GSP>
      <GSTwo
        left={<>
          <GSH3>Governing Documents</GSH3>
          <GSLinks items={[
            { label: "Plat / Covenants — updated 2021", href: "https://drive.google.com/file/d/1Tsxi5BRoO2cIyNv42YFowMU1bCN8PkV1/view" },
            { label: "Covenant modification (restrictive language)", href: "https://drive.google.com/file/d/1mZdpUDoW7ph4UvP4hbM6H2KplvrOjMsi/view" },
            { label: "Articles of Incorporation, 1976", href: "https://drive.google.com/file/d/1NVG_yYrGxrVN8t6xHfLBdKcMNgf9vlJT/view" },
            { label: "Bylaws — May 2025", href: "https://drive.google.com/file/d/1L4sW3T2ybvSzcR1F_gTu5lZvtdgeK83Y/view", note: "Not yet fully WUCIOA-compliant for 2026" },
          ]} />
          <div style={{ marginTop: 20 }}><GSH3>Membership Rules</GSH3></div>
          <GSLinks items={[
            { label: "Community Rules — Feb 2025", href: "https://drive.google.com/file/d/1ozxNuUjnNcK6GUoY6Z7qNCiLUiW34tiZ/view" },
            { label: "Parking Rules — April 2020", href: "http://beachcrest.org/wp-content/uploads/Parking-Rule_April-2020_FINAL.pdf" },
          ]} />
        </>}
        right={<>
          <GSH3>Policies</GSH3>
          <GSLinks items={[
            { label: "Delinquent Dues Policy — Jan 2026", href: "https://drive.google.com/file/d/1VjDYnI3UqnzE_g1FY5f8g_iOO2ImNous/view" },
            { label: "Marina Policy — April 2020", href: "https://drive.google.com/file/d/1Ktn2EMv7mXDICyFmRDo175YVtbiahSrf/view" },
            { label: "Debit Card Policy — Nov 2022", href: "https://drive.google.com/file/d/1tT2UzTgvk7RT5cJ7dIRyfMUdowyWfkdW/view" },
            { label: "Tree & Vegetation Policy — 2011", href: "https://drive.google.com/file/d/1j-7iQ2FtYYru8GMUUH392wvuZMWj3kMx/view" },
          ]} />
          <div style={{ marginTop: 20 }}><GSH3>Forms</GSH3></div>
          <GSLinks items={[
            { label: "Account Adjustment Form", href: "https://drive.google.com/file/d/1nxh-hmYsjk4uEL-o-F_4_kOkvSCTOYOx/view" },
            { label: "Beachcrest ACC Form", href: "https://drive.google.com/file/d/1j9ImX-nWL1udlqYF5HGwE-UTcA3FS7dD/view" },
            { label: "Payment Plan Agreement", href: "https://drive.google.com/file/d/1D2H1gy1tPt1lJ_6Onp9Ni3gJnEdNQuEy/view" },
            { label: "Budget Finance Committee Charter", href: "https://drive.google.com/file/d/1UANdZIIqFVGgCqobucTK05tCIji_DZ_q/view" },
          ]} />
        </>}
      />
    </GSSection>
    <GSSection bg={SAND}>
      {/* FIX 3: Title case */}
      <GSH2>Reserve Studies</GSH2>
      <GSP>State law (RCW 64.90.545) requires a full third-party site inspection every three years.</GSP>
      <GSLinks items={[
        { label: "Reserve Study 2026 (current)", href: "https://drive.google.com/file/d/1mne376WdCIl60btTw3tIH9qRUoyKKSda/view" },
        { label: "Executive summary 2026", href: "https://drive.google.com/file/d/1PJCp2qdkLCWdVAehMilKbi7JeUqqaSYi/view" },
        { label: "Archive (2019–present)", href: "https://drive.google.com/drive/folders/1JNR9KrwFmtrcLAQ26S2_Wg3_nEen2SY4" },
      ]} />
    </GSSection>
  </>;
}

function Resources() {
  const faqs = [
    { q: "How much are the annual dues?", a: "Ratified at the May 2026 annual meeting. (Board: confirm and insert the correct figure here before publishing — the old site listed two different numbers.)" },
    { q: "Is there a special assessment?", a: "There is no special assessment for the 2026–27 fiscal year. A one-time $800 road assessment was ratified in May 2022." },
    { q: "What do dues pay for?", a: "Grounds and bluff maintenance, roadsides, parks and trail upkeep; infrastructure including roads, gates, stormwater, cabanas, and playground equipment; and administration — banking, taxes, accounting, insurance, utilities, reserve studies, and community events." },
    { q: "What does a marina slip cost?", a: "Beginning May 2026, slips rent for $500/year. Vessels must be licensed, operational, and insured. Contact the marina manager through the Contact page." },
    { q: "What about kayak rack space?", a: "Kayak racks rent for $100/year. Watercraft cannot be left overnight on the beachfront unless stored on racks or in the marina." },
    { q: "How do I get a beach gate fob?", a: "Each home gets two fobs (4:00 am–10:00 pm access). They transfer with the property. Replacements are $25 each through VIS." },
    { q: "What needs board permission?", a: "Anything involving community property (streets, right-of-way, parks, beachfront, marina, trail), bluff vegetation management, and home construction." },
    { q: "Mailbox lock repair?", a: "BCA maintains the clusters; the lock and three keys are the homeowner's responsibility. See the how-to tutorial link below, or call USPS or a locksmith." },
    { q: "Playground storage box combo?", a: "It's the BCA street address — 8846 — top-down in the lock's window." },
  ];
  return <>
    <GSBanner title="Resident Resources" short />
    <GSSection>
      {/* FIX 3: Title case */}
      <GSH2>Frequently Asked Questions</GSH2>
      <GSCollapsible items={faqs} />
    </GSSection>
    <GSSection bg={SAND}>
      <GSTwo
        left={<>
          {/* FIX 3: Title case */}
          <GSH3>Around The Community</GSH3>
          <GSLinks items={[
            { label: "Bluff Care", href: "https://beachcrest.org/bluff-care/" },
            { label: "Burn Bans", href: "https://beachcrest.org/resources/burn-bans/" },
            { label: "Fireworks", href: "https://beachcrest.org/fireworks/" },
            { label: "Cabana reservations", href: "https://beachcrest.org/beachfront-gatherings" },
            { label: "Septic · Sewer · Watershed", href: "https://drive.google.com/drive/folders/1Qsf0pokDMAFMLnTQBAQExrDwOiZU6etK" },
            { label: "Traffic calming info", href: "https://drive.google.com/drive/folders/1yXCMpajayd2JzCyXovY9Ow8LsKk7XWMB" },
            { label: "How-to tutorials", href: "https://drive.google.com/drive/folders/12LLs41l_sWQaP0YVTxr7BjP4pD2r3jgz" },
            { label: "Beachcrest history archive", href: "https://drive.google.com/drive/folders/1XFiEchWakWCnDA797xwlLVD2Rza5wXcx" },
          ]} />
        </>}
        right={<>
          {/* FIX 3: Title case */}
          <GSH3>Helpful Outside Links</GSH3>
          <GSLinks items={[
            { label: "Nisqually tide chart", href: "https://www.tides.net/washington/773/" },
            { label: "Thurston Co. Assessor", href: "https://tcproperty.co.thurston.wa.us/propsql/front.asp" },
            { label: "Recycling / trash chart (PDF)", href: "http://beachcrest.org/wp-content/uploads/CurbsideRecycling2019-revised.pdf" },
            { label: "Lacey watering schedule", href: "https://cityoflacey.org/odd-even-outdoor-watering-schedules/" },
            { label: "Remove restrictive covenant language", href: "https://www.thurstoncountywa.gov/auditor/Pages/recording-rrc.aspx" },
            { label: "VIS Group website", href: "https://www.vismanagement.com/" },
            { label: "VIS member portal", href: "https://frontsteps.cloud/CaliberWeb2_VIS" },
            { label: "Facebook group (residents only)", href: "https://www.facebook.com/groups/beachcrest/" },
          ]} />
        </>}
      />
    </GSSection>
  </>;
}

function News() {
  const events = [
    ["Jun 3", "Board Meeting", true],
    ["Jul 1", "Board Meeting", false],
    ["Aug 5", "Board Meeting", false],
    ["Sep 2", "Board Meeting", false],
    ["Oct 7", "Board Meeting", false],
    ["Nov 4", "Board Meeting", false],
    ["Dec 2", "Board Meeting", false],
  ];
  return <>
    <GSBanner title="News & Events" short />
    <GSSection>
      <GSTwo
        left={<>
          {/* FIX 3: Title case */}
          <GSH3>Upcoming Events — 2026</GSH3>
          <div style={{ border: `1px solid ${LINE}`, borderRadius: 4, overflow: "hidden" }}>
            {events.map((e, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "center", padding: "12px 14px", background: e[2] ? SAND : (i % 2 ? "#fafafa" : WHITE), borderBottom: `1px solid ${LINE}` }}>
                <span style={{ fontFamily: "'Spectral', serif", fontSize: 15, fontWeight: 600, minWidth: 48, color: TEAL }}>{e[0]}</span>
                <span style={{ fontSize: 15 }}>{e[1]}{e[2] && <span style={{ marginLeft: 8, fontSize: 12, background: TEAL, color: "#fff", padding: "2px 8px", borderRadius: 10 }}>Next up</span>}</span>
                <span style={{ fontSize: 13, color: DRIFT }}>6:30 pm · VIS & Zoom</span>
              </div>
            ))}
          </div>
        </>}
        right={<>
          {/* FIX 3: Title case */}
          <GSH3>What's New On The Site</GSH3>
          <p style={{ fontSize: 13, color: DRIFT, marginBottom: 8 }}>As of 18 May 2026</p>
          {/* FIX 5: Left-aligned list items */}
          <ul style={{ paddingLeft: 18, margin: 0, fontSize: 15, lineHeight: 1.8, color: INK, textAlign: "left" }}>
            {["Updated upcoming events", "Final Sewer Survey results", "May Annual Meeting material", "New WUCIOA collection policy", "Spring 2026 VIEW newsletter", "Updated FAQs with ratified budget info"].map((w, i) => <li key={i}>{w}</li>)}
          </ul>
          <div style={{ marginTop: 20 }}>
            <GSH3>The Quarterly VIEW</GSH3>
            <GSP>Since 1991, The VIEW has captured Beachcrest history.</GSP>
            <GSLinks items={[
              { label: "Read Spring 2026", href: "https://drive.google.com/file/d/1dqHpbH81O2CzmxduEfYA_GxORPggOr94/view" },
              { label: "Full archive (30 years)", href: "https://drive.google.com/drive/folders/1HN46mRpMW_pSxitwPARYZC2VQmt3siTF" },
            ]} />
          </div>
        </>}
      />
    </GSSection>
  </>;
}

function PayDues() {
  return <>
    <GSBanner title="Pay Dues" short />
    <GSSection>
      {/* FIX 3: Title case */}
      <GSH2>Paying Your Annual Dues</GSH2>
      <GSP>Send all payments to VIS Group's <strong>corporate office</strong> — not their local Lacey address:</GSP>
      <div style={{ background: SAND, padding: "16px 20px", borderRadius: 4, fontSize: 16, lineHeight: 1.8, display: "inline-block", marginBottom: 16 }}>
        Beachcrest Community Association<br />
        c/o VIS Group, Inc.<br />
        PO Box 7218<br />
        San Francisco, CA 94120-7218
      </div>
      <GSP muted>You'll need your account number to set up an account — one per property, not per owner. Update any automatic payments (ACH, bill pay); they will not be forwarded.</GSP>
      <GSTwo
        left={<>
          <GSH3>Forms & Instructions</GSH3>
          <GSLinks items={[
            { label: "VIS welcome letter", href: "https://drive.google.com/file/d/1JB60wUboQx2_zsLyAMQ-_8Tv5scKhaHd/view" },
            { label: "VIS contact info form", href: "https://drive.google.com/file/d/1hDhsAnEfLwScVuCt2SXnyAy-N67WVqX6/view" },
            { label: "VIS ACH fillable form", href: "https://drive.google.com/file/d/1-_r2ixzW0As0VI2dyBJpa113_dJHQ1eP/view" },
            { label: "BCA welcome letter", href: "https://drive.google.com/file/d/1Ohg0S3NWdERGgChCLFRDMTBXeHuE-ZgC/view" },
          ]} />
        </>}
        right={<>
          <GSH3>How-To Guides</GSH3>
          <GSLinks items={[
            { label: "VIS owner how-to guide", href: "https://drive.google.com/file/d/1eissHAs1_GF-vDhJ6U17KuV8HZAObi2T/view" },
            { label: "VIS payment instructions", href: "https://drive.google.com/file/d/1WJ6DQ8TQ7Seksi-feBb2hFxG6gEAaofJ/view" },
            { label: "VIS member portal", href: "https://frontsteps.cloud/CaliberWeb2_VIS" },
          ]} />
          <p style={{ fontSize: 14, color: DRIFT, marginTop: 14 }}>Not receiving Beachcrest mailings? Call VIS at 1-800-537-9619.</p>
        </>}
      />
    </GSSection>
  </>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  return <>
    <GSBanner title="Contact" short />
    <GSSection>
      {/* FIX 3: Title case */}
      <GSH2>Get In Touch</GSH2>
      <GSTwo
        left={<>
          <GSH3>Send A Message</GSH3>
          <GSP muted>The live site uses an embedded Google Form here — submissions go directly to the board's email.</GSP>
          <div style={{ border: `1px solid ${LINE}`, borderRadius: 4, padding: 20, background: "#f9f9f9" }}>
            <div style={{ fontSize: 13, color: DRIFT, marginBottom: 16, fontStyle: "italic" }}>[ Google Form embedded here ]</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
              <input placeholder="First name" style={inputStyle} />
              <input placeholder="Last name" style={inputStyle} />
            </div>
            <input placeholder="Email" style={{ ...inputStyle, width: "100%", marginBottom: 12, boxSizing: "border-box" }} />
            <input placeholder="Subject" style={{ ...inputStyle, width: "100%", marginBottom: 12, boxSizing: "border-box" }} />
            <textarea placeholder="Your message" rows={4} style={{ ...inputStyle, width: "100%", marginBottom: 14, resize: "vertical", boxSizing: "border-box" }} />
            <GSBtn onClick={() => setSent(true)}>{sent ? "Submitted ✓" : "Submit"}</GSBtn>
            {sent && <span style={{ fontSize: 13, color: DRIFT, marginLeft: 8 }}>(Mockup only)</span>}
          </div>
        </>}
        right={<>
          <GSH3>Beachcrest Community Association</GSH3>
          <GSP>8846 51st Avenue NE<br />Olympia, WA 98516</GSP>
          <GSP><strong>(360) 350-3610</strong></GSP>
          <GSP muted>For board questions, leave a message at ext 804.</GSP>
          <GSP muted>For cabana reservations, visit Resident Resources.</GSP>
        </>}
      />
    </GSSection>
  </>;
}

const inputStyle = { padding: "10px 12px", border: `1px solid ${LINE}`, borderRadius: 4, fontSize: 15, fontFamily: "inherit", background: WHITE };

function GSFooter({ go }) {
  return (
    <footer style={{ background: "#2c2c2c", color: "#ccc", padding: "32px 20px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "'Spectral', serif", fontSize: 18, color: "#fff", marginBottom: 6 }}>Beachcrest</div>
          <div style={{ fontSize: 14, lineHeight: 1.7 }}>
            8846 51st Avenue NE, Olympia, WA 98516<br />
            (360) 350-3610 · beachcrest.org
          </div>
        </div>
        <div style={{ display: "grid", gap: 6 }}>
          {PAGES.map(pg => (
            <button key={pg} onClick={() => go(pg)} style={{ background: "none", border: "none", color: "#ccc", cursor: "pointer", textAlign: "left", fontSize: 14, padding: 0, fontFamily: "inherit" }}>{pg}</button>
          ))}
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: 24, fontSize: 12, opacity: 0.5 }}>
        Built with Google Sites
      </div>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState("Home");
  const go = p => { setPage(p); window.scrollTo(0, 0); };

  useEffect(() => {
    const id = "gs-fonts";
    if (!document.getElementById(id)) {
      const l = document.createElement("link");
      l.id = id; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Spectral:wght@400;600&display=swap";
      document.head.appendChild(l);
    }
    const s = document.createElement("style");
    s.textContent = `
      body { margin: 0; font-family: Arial, sans-serif; }
      @media (max-width: 700px) {
        .gs-nav { display: none !important; }
        .gs-burger { display: block !important; }
        .gs-two { grid-template-columns: 1fr !important; }
        .gs-four { grid-template-columns: 1fr 1fr !important; }
      }
    `;
    document.head.appendChild(s);
  }, []);

  const pageMap = {
    "Home": <Home go={go} />,
    "About": <About />,
    "Documents & Rules": <Documents />,
    "Resident Resources": <Resources />,
    "News & Events": <News />,
    "Pay Dues": <PayDues />,
    "Contact": <Contact />,
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: WHITE, minHeight: "100vh" }}>
      <div style={{
        background: '#f5f0e8',
        borderBottom: '0.5px solid #8ab09a',
        padding: '7px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}>
        <span style={{ color: '#3a6b52', fontSize: 13 }}>←</span>
        <a href="/" style={{ color: '#3a6b52', fontSize: 12, letterSpacing: '0.04em', textDecoration: 'none' }}>Pixels & Stitches</a>
        <span style={{ color: '#8ab09a', fontSize: 11 }}>›</span>
        <span style={{ color: '#1e4a35', fontWeight: 500, fontSize: 12 }}>{page}</span>
      </div>
      <GSNav page={page} go={go} />
      <main>{pageMap[page]}</main>
      <GSFooter go={go} />
    </div>
  );
}
