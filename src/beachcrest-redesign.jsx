import React, { useState, useEffect } from "react";

const COLORS = {
  tide: "#1f4e5a",
  tideDark: "#16383f",
  dune: "#c98a52",
  sand: "#f3ede2",
  sandCard: "#fbf8f2",
  driftwood: "#6b6457",
  ink: "#22201c",
  line: "#e0d8c8",
};

const HERO_IMG = "https://beachcrest.org/wp-content/uploads/20190630_152731-1280x720.jpg";

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "documents", label: "Documents & Rules" },
  { id: "resources", label: "Resident Resources" },
  { id: "news", label: "News & Events" },
  { id: "payments", label: "Pay Dues" },
  { id: "contact", label: "Contact" },
];

function Ext({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: COLORS.tide, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "3px" }}>
      {children} <span style={{ fontSize: "0.8em", opacity: 0.7 }}>↗</span>
    </a>
  );
}

function Eyebrow({ children }) {
  return (
    <div style={{ textTransform: "uppercase", letterSpacing: "0.14em", fontSize: 13, fontWeight: 700, color: COLORS.dune, marginBottom: 10 }}>
      {children}
    </div>
  );
}

function SectionTitle({ children, sub }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 34, lineHeight: 1.1, color: COLORS.tideDark, margin: 0, fontWeight: 600 }}>{children}</h2>
      {sub && <p style={{ fontSize: 18, color: COLORS.driftwood, marginTop: 10 }}>{sub}</p>}    </div>
  );
}

function Card({ title, children, accent }) {
  return (
    <div style={{
      background: COLORS.sandCard,
      border: `1px solid ${COLORS.line}`,
      borderTop: `4px solid ${accent || COLORS.tide}`,
      borderRadius: 10,
      padding: "22px 24px",
      boxShadow: "0 1px 3px rgba(34,32,28,0.04)",
    }}>
      {title && <h3 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 21, color: COLORS.tideDark, margin: "0 0 12px", fontWeight: 600 }}>{title}</h3>}
      <div style={{ fontSize: 16.5, lineHeight: 1.65, color: COLORS.ink }}>{children}</div>
    </div>
  );
}

function LinkList({ items }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
      {items.map((it, i) => (
        <li key={i} style={{ paddingBottom: 10, borderBottom: `1px solid ${COLORS.line}` }}>
          {it.href ? <Ext href={it.href}>{it.label}</Ext> : <span style={{ color: COLORS.driftwood }}>{it.label}</span>}
          {it.note && <div style={{ fontSize: 14, color: COLORS.driftwood, marginTop: 2 }}>{it.note}</div>}
        </li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------- Pages

function Home({ go }) {
  return (
    <>
      {/* FIX 1: Darker overlay + white text + text shadow */}
      <section style={{ position: "relative", height: 520, overflow: "hidden" }}>
        <img src={HERO_IMG} alt="Beachcrest waterfront on the South Puget Sound" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,30,35,0.35) 0%, rgba(10,30,35,0.82) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 48px 56px", color: "#fff" }}>
          <div style={{ textTransform: "uppercase", letterSpacing: "0.22em", fontSize: 14, fontWeight: 700, marginBottom: 14, color: "#f3ede2", textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}>A South Sound Private Community</div>
          <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 64, lineHeight: 1.02, margin: 0, fontWeight: 600, color: "#fff", textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>Beachcrest</h1>
          <p style={{ fontSize: 21, marginTop: 16, lineHeight: 1.5, color: "#f3ede2", textShadow: "0 1px 6px rgba(0,0,0,0.4)", textAlign: "center" }}>262 homes nestled west of Nisqually Reach, sharing a half-mile of private beach, a marina, parks, and trails — cared for entirely by the people who live here.
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 28, flexWrap: "wrap", justifyContent: "center" }}>
            <button onClick={() => go("payments")} style={btnPrimary}>Pay annual dues</button>
            <button onClick={() => go("resources")} style={btnGhost}>Resident resources</button>
          </div>
        </div>
      </section>

      <Wrap>
        <Eyebrow>Welcome</Eyebrow>
        <SectionTitle>A private community on the water</SectionTitle>
        {/* FIX 2: prose is left-aligned, maxWidth kept for readability but no centering */}
        <p style={proseLg}>
          The Beachcrest community is nestled just west of Nisqually Reach along the South Puget Sound, in northern Thurston County. Our assets give residents access to a half-mile of private beach, two cabanas for waterfront gatherings, a high-tide marina with 24 leased slips and 21 kayak/canoe rack slots, a boat ramp, mooring buoys, a nature trail, and a playground park with a basketball court.
        </p>
        <p style={proseLg}>
          Because we are a private community — owning our roads, stormwater infrastructure, and all of the above — we receive no funding from the Thurston County property taxes we pay. All maintenance and upkeep is supported by mandatory annual dues on each property. Thinking of joining us? Start with our Bylaws, Community Rules, and FAQs.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18, marginTop: 32 }}>
          <button style={navCard} onClick={() => go("about")}><strong>About the Association</strong><span>Board, meetings & how we run</span></button>
          <button style={navCard} onClick={() => go("documents")}><strong>Documents & Rules</strong><span>Bylaws, covenants, policies, forms</span></button>
          <button style={navCard} onClick={() => go("resources")}><strong>Resident Resources</strong><span>Marina, fobs, FAQs & links</span></button>
          <button style={navCard} onClick={() => go("news")}><strong>News & Events</strong><span>Calendar & The VIEW newsletter</span></button>
        </div>

        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="bc-two">
          <Card title="Getting here" accent={COLORS.dune}>
            From the north (Tacoma), take I-5 Nisqually exit 114. From the south (Olympia), take exit 111. Lacey, Olympia, Tumwater, DuPont, and JBLM are all under 20 minutes on a good day. Closest shopping is about 10 minutes away in Hawks Prairie.
          </Card>
          <Card title="Schools" accent={COLORS.dune}>
            North Thurston is our local district, with bus service from Beachcrest to Olympic View Elementary, Salish Middle School, and River Ridge High School.
          </Card>
        </div>
      </Wrap>
    </>
  );
}

function About() {
  const board = [
    ["David Kelley", "President + Cabana", "1-Year"],
    ["Dennis Simmons", "Vice President + Security Manager", "1-Year"],
    ["Steve Hoffman", "Secretary + FC + PMC + Website", "1-Year"],
    ["Anne Stone", "Treasurer + FC Chair + PMC Chair", "2-Year"],
    ["Sandi Levin", "Member at Large + FC", "2-Year"],
    ["John Strasser", "Member at Large + Marina Co-Manager", "2-Year"],
    ["Larry Carnahan", "Member at Large", "1-Year"],
  ];
  const minutes2026 = ["January", "February", "March", "April", "May — Annual Meeting", "June"];
  return (
    <Wrap>
      <Eyebrow>About the Association</Eyebrow>
      <SectionTitle sub="Beachcrest is governed by a seven-member volunteer Board of Trustees, elected by the membership. Here's who they are, when they meet, and how the money works.">How Beachcrest runs</SectionTitle>

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 24, marginBottom: 36 }} className="bc-two">
        <Card title="Board meetings">
          The Board meets <strong>6:30–8:30 pm on the first Wednesday of each month</strong> (except May, when a larger venue hosts the Annual Membership Meeting). Meetings are held at the VIS Group conference room, <Ext href="https://www.bing.com/local?lid=YN873x12127532164122081681">8617 Martin Way E, Lacey</Ext>, and on Zoom — all members welcome.
          <div style={{ marginTop: 14, padding: "12px 14px", background: COLORS.sand, borderRadius: 8, fontSize: 15 }}>
            <strong>Zoom:</strong> <Ext href="https://us06web.zoom.us/j/83238814623?pwd=vV2cY2hJNxR3ckC9r1CJDl5azj19Ck.1">One-click login</Ext><br />
            Meeting ID: 832 3881 4623 · Passcode: 372776
          </div>
        </Card>
        <Card title="Have a question for the board?" accent={COLORS.dune}>
          Leave a message at <strong>(360) 350-3610 ext 804</strong>, or use the Contact page. All board members' BCA business address is the association address.
        </Card>
      </div>

      <Card title="Board of Trustees — officers elected 5/20/2026">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 16 }}>
            <thead>
              <tr style={{ textAlign: "left", color: COLORS.driftwood, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                <th style={th}>Name</th><th style={th}>Position</th><th style={th}>Term remaining</th>
              </tr>
            </thead>
            <tbody>
              {board.map((r, i) => (
                <tr key={i} style={{ borderTop: `1px solid ${COLORS.line}` }}>
                  <td style={{ ...td, fontWeight: 600 }}>{r[0]}</td><td style={td}>{r[1]}</td><td style={td}>{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 14, color: COLORS.driftwood, marginTop: 12 }}>
          FC = Financial Committee · PMC = Property Management Committee · M@L = Member at Large. Four seats are elected in even years, three in odd years; each serves a two-year term.
        </p>
      </Card>

      <div style={{ marginTop: 28 }}>
        <Card title="Meeting minutes">
          Minutes include Financial and Property Management Committee reports. (Links open in Google Drive.)
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", gap: 10, marginTop: 14 }}>
            {minutes2026.map((m, i) => (
              <span key={i} style={chip}>{m} 2026</span>
            ))}
          </div>
          <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 16 }}>
            <Ext href="https://drive.google.com/drive/folders/1xB-zTPMNfDVaU1R0nx5g2efn9uVL68hN">Archive 2020–2023</Ext>
            <Ext href="https://drive.google.com/drive/folders/1ChHtbcz8gBh6EREW1ScJ6cr6mSiEycDL">Archive 2012–2019</Ext>
            <Ext href="https://drive.google.com/drive/folders/16Nyp1C-9hfJiqO7-Gy7ScXUPkIBJdCc0">Archive 2007–2011</Ext>
            <Ext href="https://drive.google.com/drive/folders/1t5O-fC8oZSStDuNnViZGulgn2OcAR5rq">Archive 1994–2006</Ext>
          </div>
        </Card>
      </div>
    </Wrap>
  );
}

function Documents() {
  return (
    <Wrap>
      <Eyebrow>Documents & Rules</Eyebrow>
      <SectionTitle sub="The documents that define how Beachcrest is held, managed, and maintained. All files open in Google Drive.">Governing documents</SectionTitle>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }} className="bc-two">
        <Card title="Governing documents">
          <LinkList items={[
            { label: "Plat / Covenants — updated 2021", href: "https://drive.google.com/file/d/1Tsxi5BRoO2cIyNv42YFowMU1bCN8PkV1/view" },
            { label: "Covenant modification (restrictive language), 2021", href: "https://drive.google.com/file/d/1mZdpUDoW7ph4UvP4hbM6H2KplvrOjMsi/view" },
            { label: "Articles of Incorporation, 1976", href: "https://drive.google.com/file/d/1NVG_yYrGxrVN8t6xHfLBdKcMNgf9vlJT/view" },
            { label: "Bylaws — May 2025", href: "https://drive.google.com/file/d/1L4sW3T2ybvSzcR1F_gTu5lZvtdgeK83Y/view", note: "Current; not yet fully WUCIOA-compliant for 2026 (Articles III & IX)." },
          ]} />
        </Card>
        <Card title="Membership rules">
          <LinkList items={[
            { label: "Community Rules — Feb 2025 (current)", href: "https://drive.google.com/file/d/1ozxNuUjnNcK6GUoY6Z7qNCiLUiW34tiZ/view" },
            { label: "Parking Rules — April 2020", href: "http://beachcrest.org/wp-content/uploads/Parking-Rule_April-2020_FINAL.pdf" },
          ]} />
        </Card>
        <Card title="Policies">
          <LinkList items={[
            { label: "Delinquent Dues Policy — Jan 2026 (current)", href: "https://drive.google.com/file/d/1VjDYnI3UqnzE_g1FY5f8g_iOO2ImNous/view" },
            { label: "Marina Policy — April 2020", href: "https://drive.google.com/file/d/1Ktn2EMv7mXDICyFmRDo175YVtbiahSrf/view" },
            { label: "Debit Card Policy — Nov 2022", href: "https://drive.google.com/file/d/1tT2UzTgvk7RT5cJ7dIRyfMUdowyWfkdW/view" },
            { label: "Tree & Vegetation Management — July 2011", href: "https://drive.google.com/file/d/1j-7iQ2FtYYru8GMUUH392wvuZMWj3kMx/view" },
          ]} />
        </Card>
        <Card title="Forms & committee docs">
          <LinkList items={[
            { label: "Account Adjustment Form", href: "https://drive.google.com/file/d/1nxh-hmYsjk4uEL-o-F_4_kOkvSCTOYOx/view" },
            { label: "Beachcrest ACC Form", href: "https://drive.google.com/file/d/1j9ImX-nWL1udlqYF5HGwE-UTcA3FS7dD/view" },
            { label: "Payment Plan Agreement Form", href: "https://drive.google.com/file/d/1D2H1gy1tPt1lJ_6Onp9Ni3gJnEdNQuEy/view" },
            { label: "Budget Finance Committee Charter — 2021", href: "https://drive.google.com/file/d/1UANdZIIqFVGgCqobucTK05tCIji_DZ_q/view" },
          ]} />
        </Card>
      </div>

      <div style={{ marginTop: 22 }}>
        <Card title="Reserve studies" accent={COLORS.dune}>
          State law (RCW 64.90.545) requires a full third-party site inspection every three years.
          <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 16 }}>
            <Ext href="https://drive.google.com/file/d/1mne376WdCIl60btTw3tIH9qRUoyKKSda/view">Reserve Study 2026 (current)</Ext>
            <Ext href="https://drive.google.com/file/d/1PJCp2qdkLCWdVAehMilKbi7JeUqqaSYi/view">Executive summary 2026</Ext>
            <Ext href="https://drive.google.com/drive/folders/1JNR9KrwFmtrcLAQ26S2_Wg3_nEen2SY4">Archive (2019–present)</Ext>
          </div>
        </Card>
      </div>
    </Wrap>
  );
}

function Resources() {
  const faqs = [
    ["How much are the annual dues?", "Ratified at the May 2026 annual meeting. (Note: confirm the current figure — the existing site shows two different numbers, $657 and $638, which the board should reconcile before publishing.)"],
    ["Is there a special assessment?", "There is no special assessment for the 2026–27 fiscal year. A one-time $800 road assessment was ratified back in May 2022."],
    ["What do dues pay for?", "Grounds and bluff maintenance, roadsides, parks and nature trail upkeep; infrastructure like roads, gates, stormwater, cabanas, and playground equipment; and administration — banking, taxes, accounting, insurance, utilities, reserve studies, and community events."],
    ["What does a marina slip cost?", "Beginning May 2026, slips rent for $500/year. Vessels must be licensed, operational, and insured against spill damage. Contact the marina manager through the Contact page."],
    ["What about kayak rack space?", "Kayak racks rent for $100/year. Watercraft can't be left overnight on the beachfront unless stored on racks or in the marina."],
    ["How do I get a beach gate fob?", "Each home gets two fobs (4:00 am–10:00 pm access) that transfer with the property. Replacements are $25 each through VIS; no more than two per address."],
    ["What needs board permission?", "Anything involving community property (streets, right-of-way, parks, beachfront, marina, trail), bluff vegetation management, and home construction (to confirm setbacks)."],
    ["Persistent dog barking?", "The most effective first step is a respectful conversation with the neighbor whose dog it is."],
    ["Mailbox lock repair?", "BCA maintains the mailbox clusters, but the lock and three keys are the homeowner's responsibility. Repair/replace it yourself (see the how-to tutorial), or call USPS or a locksmith for a fee."],
    ["Playground storage box combo?", "It's the BCA street address — 8846 — top-down in the lock's window."],
  ];
  const [open, setOpen] = useState(null);
  return (
    <Wrap>
      <Eyebrow>Resident Resources</Eyebrow>
      <SectionTitle sub="The practical, day-to-day answers and links residents reach for most.">Living in Beachcrest</SectionTitle>

      <Card title="Frequently asked questions">
        <div style={{ display: "grid", gap: 0 }}>
          {faqs.map((f, i) => (
            <div key={i} style={{ borderTop: i ? `1px solid ${COLORS.line}` : "none" }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={faqBtn}>
                <span>{f[0]}</span>
                <span style={{ color: COLORS.dune, fontSize: 22, lineHeight: 1 }}>{open === i ? "–" : "+"}</span>
              </button>
              {open === i && <p style={{ margin: "0 0 16px", fontSize: 16, lineHeight: 1.6, color: COLORS.ink, textAlign: "left" }}>{f[1]}</p>}
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginTop: 22 }} className="bc-two">
        <Card title="Around the community">
          <LinkList items={[
            { label: "Bluff Care", href: "https://beachcrest.org/bluff-care/" },
            { label: "Burn Bans", href: "https://beachcrest.org/resources/burn-bans/" },
            { label: "Fireworks", href: "https://beachcrest.org/fireworks/" },
            { label: "Cabana reservations", href: "https://beachcrest.org/beachfront-gatherings" },
            { label: "Septic · Sewer · Watershed", href: "https://drive.google.com/drive/folders/1Qsf0pokDMAFMLnTQBAQExrDwOiZU6etK" },
            { label: "Traffic calming info", href: "https://drive.google.com/drive/folders/1yXCMpajayd2JzCyXovY9Ow8LsKk7XWMB" },
            { label: "How-to tutorials", href: "https://drive.google.com/drive/folders/12LLs41l_sWQaP0YVTxr7BjP4pD2r3jgz" },
            { label: "Beachcrest history archive", href: "https://drive.google.com/drive/folders/1XFiEchWakWCnDA797xwlLVD2Rza5wXcx" },
          ]} />
        </Card>
        <Card title="Helpful outside links">
          <LinkList items={[
            { label: "Nisqually tide chart", href: "https://www.tides.net/washington/773/" },
            { label: "Thurston Co. Assessor", href: "https://tcproperty.co.thurston.wa.us/propsql/front.asp" },
            { label: "Recycling / trash chart (PDF)", href: "http://beachcrest.org/wp-content/uploads/CurbsideRecycling2019-revised.pdf" },
            { label: "Lacey watering schedule", href: "https://cityoflacey.org/odd-even-outdoor-watering-schedules/" },
            { label: "Remove restrictive covenant language", href: "https://www.thurstoncountywa.gov/auditor/Pages/recording-rrc.aspx" },
            { label: "VIS Group website", href: "https://www.vismanagement.com/" },
            { label: "VIS member portal", href: "https://frontsteps.cloud/CaliberWeb2_VIS" },
            { label: "Facebook group (residents only)", href: "https://www.facebook.com/groups/beachcrest/" },
          ]} />
        </Card>
      </div>
    </Wrap>
  );
}

function News() {
  const whatsNew = [
    "Updated upcoming BC events", "Final Sewer Survey results", "May Annual Meeting material",
    "New WUCIOA collection policy", "Spring 2026 VIEW newsletter", "May Annual Meeting summary",
    "Updated FAQs with ratified budget info", "Added FAQ on the Reserve Study",
  ];
  const events = [
    ["Jun", "Board Meeting", "3 Jun", true],
    ["Jul", "Board Meeting", "1 Jul", false],
    ["Aug", "Board Meeting", "5 Aug", false],
    ["Sep", "Board Meeting", "2 Sep", false],
    ["Oct", "Board Meeting", "7 Oct", false],
    ["Nov", "Board Meeting", "4 Nov", false],
    ["Dec", "Board Meeting", "2 Dec", false],
  ];
  return (
    <Wrap>
      <Eyebrow>News & Events</Eyebrow>
      <SectionTitle sub="What's changed lately, what's coming up, and three decades of community history in The VIEW.">News & events</SectionTitle>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 22 }} className="bc-two">
        <Card title="Upcoming events — 2026">
          <div style={{ display: "grid", gap: 10 }}>
            {events.map((e, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 12px", background: e[3] ? COLORS.sand : "transparent", borderRadius: 8, border: e[3] ? `1px solid ${COLORS.dune}` : `1px solid ${COLORS.line}` }}>
                <div style={{ textAlign: "center", minWidth: 46 }}>
                  <div style={{ fontSize: 12, textTransform: "uppercase", color: COLORS.dune, fontWeight: 700 }}>{e[0]}</div>
                  <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 20, color: COLORS.tideDark }}>{e[2].split(" ")[0]}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <strong>{e[1]}</strong>
                  {e[3] && <span style={{ marginLeft: 8, fontSize: 12, background: COLORS.dune, color: "#fff", padding: "2px 8px", borderRadius: 20 }}>Next up</span>}
                  <div style={{ fontSize: 14, color: COLORS.driftwood }}>{e[2]}, 6:30 pm · VIS conference room & Zoom</div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 14, color: COLORS.driftwood, marginTop: 12 }}>Click any board meeting in the live site to view its documents.</p>
        </Card>

        <div style={{ display: "grid", gap: 22 }}>
          <Card title="What's new on the site" accent={COLORS.dune}>
            <div style={{ fontSize: 13, color: COLORS.driftwood, marginBottom: 8 }}>As of 18 May 2026</div>
            <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.7, textAlign: "left" }}>
              {whatsNew.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </Card>
          <Card title="The Quarterly VIEW">
            Since 1991 — Sandy Morasky's vision — The VIEW has captured 30 years of Beachcrest history.
            <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 16 }}>
              <Ext href="https://drive.google.com/file/d/1dqHpbH81O2CzmxduEfYA_GxORPggOr94/view">Read Spring 2026</Ext>
              <Ext href="https://drive.google.com/drive/folders/1HN46mRpMW_pSxitwPARYZC2VQmt3siTF">Full archive</Ext>
            </div>
          </Card>
        </div>
      </div>
    </Wrap>
  );
}

function Payments() {
  return (
    <Wrap>
      <Eyebrow>Pay Dues</Eyebrow>
      <SectionTitle sub="Everything you need to pay your annual dues through VIS Group, our financial management company.">Paying your dues</SectionTitle>

      <Card title="Where to send payment" accent={COLORS.dune}>
        <p style={{ marginTop: 0 }}>Send all assessments to VIS Group's <strong>corporate</strong> office — <strong>not</strong> their local Lacey address:</p>
        <div style={{ background: COLORS.sand, padding: "16px 18px", borderRadius: 8, fontSize: 17, lineHeight: 1.6 }}>
          Beachcrest Community Association<br />
          c/o VIS Group, Inc.<br />
          PO Box 7218<br />
          San Francisco, CA 94120-7218
        </div>
        <p style={{ fontSize: 15, color: COLORS.driftwood, marginTop: 12 }}>
          You'll need your account number to set up an account — one number per <em>property</em>, not per owner. Any automatic payments (ACH, bank bill pay) must be updated; they will not be forwarded. Be sure to set the correct current dues amount, which the board should confirm here before publishing.
        </p>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginTop: 22 }} className="bc-two">
        <Card title="Forms & instructions">
          <LinkList items={[
            { label: "VIS welcome letter", href: "https://drive.google.com/file/d/1JB60wUboQx2_zsLyAMQ-_8Tv5scKhaHd/view" },
            { label: "VIS contact info form", href: "https://drive.google.com/file/d/1hDhsAnEfLwScVuCt2SXnyAy-N67WVqX6/view" },
            { label: "VIS ACH fillable form", href: "https://drive.google.com/file/d/1-_r2ixzW0As0VI2dyBJpa113_dJHQ1eP/view" },
            { label: "BCA welcome letter", href: "https://drive.google.com/file/d/1Ohg0S3NWdERGgChCLFRDMTBXeHuE-ZgC/view" },
          ]} />
        </Card>
        <Card title="How-to guides">
          <LinkList items={[
            { label: "VIS owner \"how-to\" guide", href: "https://drive.google.com/file/d/1eissHAs1_GF-vDhJ6U17KuV8HZAObi2T/view" },
            { label: "VIS payment instructions", href: "https://drive.google.com/file/d/1WJ6DQ8TQ7Seksi-feBb2hFxG6gEAaofJ/view" },
            { label: "VIS member portal", href: "https://frontsteps.cloud/CaliberWeb2_VIS" },
          ]} />
          <div style={{ marginTop: 14, fontSize: 15, color: COLORS.driftwood }}>
            Not receiving Beachcrest mailings or emails? Call VIS at 1-800-537-9619 to update your contact info.
          </div>
        </Card>
      </div>
    </Wrap>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <Wrap>
      <Eyebrow>Contact</Eyebrow>
      <SectionTitle sub="Questions or comments about life in Beachcrest? Send a note and the board will follow up.">Get in touch</SectionTitle>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24 }} className="bc-two">
        <Card title="Send a message">
          <div style={{ display: "grid", gap: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <input placeholder="First name" style={input} />
              <input placeholder="Last name" style={input} />
            </div>
            <input placeholder="Email" style={input} />
            <input placeholder="Subject" style={input} />
            <textarea placeholder="Your message" rows={5} style={{ ...input, resize: "vertical" }} />
            <button onClick={() => setSent(true)} style={btnPrimary}>{sent ? "Message sent ✓" : "Send message"}</button>
            {sent && <span style={{ fontSize: 14, color: COLORS.driftwood }}>(Mockup only — no message is actually sent.)</span>}
          </div>
        </Card>
        <Card title="Beachcrest Community Association" accent={COLORS.dune}>
          8846 51st Avenue NE<br />Olympia, WA 98516<br />
          <div style={{ margin: "12px 0" }}><strong>(360) 350-3610</strong></div>
          For cabana beach gatherings, visit Resident Resources and open "Cabana reservations."
          <div style={{ marginTop: 14, fontSize: 15, color: COLORS.driftwood }}>
            For a board question, leave a message at ext 804.
          </div>
        </Card>
      </div>
    </Wrap>
  );
}

// ---------------------------------------------------------------- Shell

function Wrap({ children }) {
  return <div style={{ maxWidth: 1080, margin: "0 auto", padding: "56px 24px 72px", textAlign: "left" }}>{children}</div>;
}

export default function App() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const go = (p) => { setPage(p); setMenuOpen(false); window.scrollTo(0, 0); };

  useEffect(() => {
    const id = "bc-fonts";
    if (!document.getElementById(id)) {
      const l = document.createElement("link");
      l.id = id; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap";
      document.head.appendChild(l);
    }
    const s = document.createElement("style");
    s.textContent = `
      @media (max-width: 760px) {
        .bc-two { grid-template-columns: 1fr !important; }
        .bc-desktop-nav { display: none !important; }
        .bc-burger { display: block !important; }
      }
      button:focus-visible, a:focus-visible, input:focus-visible, textarea:focus-visible {
        outline: 3px solid ${COLORS.dune}; outline-offset: 2px;
      }
    `;
    document.head.appendChild(s);
  }, []);

  const PAGES = {
    home: <Home go={go} />,
    about: <About />,
    documents: <Documents />,
    resources: <Resources />,
    news: <News />,
    payments: <Payments />,
    contact: <Contact />,
  };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: COLORS.sand, color: COLORS.ink, minHeight: "100vh" }}>
      {/* HomeBanner */}
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
        <span style={{ color: '#1e4a35', fontWeight: 500, fontSize: 12 }}>Beachcrest Redesign</span>
      </div>

      <header style={{ position: "sticky", top: 0, zIndex: 50, background: COLORS.tide, color: "#fff" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <button onClick={() => go("home")} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 600, letterSpacing: "0.01em" }}>Beachcrest</span>
            <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", opacity: 0.8, borderLeft: "1px solid rgba(255,255,255,0.3)", paddingLeft: 10 }}>South Sound Community</span>
          </button>
          <nav className="bc-desktop-nav" style={{ display: "flex", gap: 4 }}>
            {NAV.map((n) => (
              <button key={n.id} onClick={() => go(n.id)} style={{
                background: page === n.id ? "rgba(255,255,255,0.16)" : "none",
                border: "none", color: "#fff", cursor: "pointer", fontSize: 15.5, fontWeight: 500,
                padding: "8px 13px", borderRadius: 7, fontFamily: "inherit",
              }}>{n.label}</button>
            ))}
          </nav>
          <button className="bc-burger" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "1px solid rgba(255,255,255,0.4)", color: "#fff", borderRadius: 7, padding: "8px 12px", cursor: "pointer", fontSize: 15 }}>Menu</button>
        </div>
        {menuOpen && (
          <nav style={{ background: COLORS.tideDark, padding: "8px 24px 16px", display: "grid", gap: 4 }}>
            {NAV.map((n) => (
              <button key={n.id} onClick={() => go(n.id)} style={{ background: page === n.id ? "rgba(255,255,255,0.16)" : "none", border: "none", color: "#fff", textAlign: "left", padding: "12px", borderRadius: 7, fontSize: 17, cursor: "pointer", fontFamily: "inherit" }}>{n.label}</button>
            ))}
          </nav>
        )}
      </header>

      <main>{PAGES[page]}</main>

      <footer style={{ background: COLORS.tideDark, color: "#e8e0d2", padding: "40px 24px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 30, justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: "#fff" }}>Beachcrest</div>
            <div style={{ fontSize: 14, opacity: 0.8, marginTop: 6, maxWidth: 280 }}>A South Sound private community of 262 homes in northern Thurston County.</div>
          </div>
          <div style={{ fontSize: 15, lineHeight: 1.7 }}>
            Beachcrest Community Association<br />8846 51st Avenue NE, Olympia, WA 98516<br />(360) 350-3610 · beachcrest.org
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            {NAV.map((n) => (
              <button key={n.id} onClick={() => go(n.id)} style={{ background: "none", border: "none", color: "#e8e0d2", cursor: "pointer", textAlign: "left", fontSize: 14, padding: 0, fontFamily: "inherit", opacity: 0.85 }}>{n.label}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

// ---------------------------------------------------------------- shared styles
// FIX 2: Removed textAlign: "center" from proseLg so body text is left-aligned
const proseLg = { fontSize: 18, lineHeight: 1.7, color: COLORS.ink, marginBottom: 18 };
const btnPrimary = { background: COLORS.dune, color: "#fff", border: "none", padding: "14px 26px", borderRadius: 8, fontSize: 16.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" };
const btnGhost = { background: "rgba(255,255,255,0.14)", color: "#fff", border: "1px solid rgba(255,255,255,0.5)", padding: "14px 26px", borderRadius: 8, fontSize: 16.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" };
const navCard = { background: COLORS.sandCard, border: `1px solid ${COLORS.line}`, borderRadius: 10, padding: "20px 22px", cursor: "pointer", textAlign: "left", display: "flex", flexDirection: "column", gap: 4, fontFamily: "inherit" };
const th = { padding: "8px 10px", fontWeight: 700 };
const td = { padding: "12px 10px", verticalAlign: "top" };
const chip = { background: COLORS.sand, border: `1px solid ${COLORS.line}`, borderRadius: 7, padding: "8px 10px", fontSize: 14.5, textAlign: "center", color: COLORS.driftwood };
const faqBtn = { width: "100%", background: "none", border: "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "16px 0", cursor: "pointer", fontSize: 17, fontWeight: 600, color: COLORS.tideDark, textAlign: "left", fontFamily: "inherit" };
const input = { padding: "13px 14px", borderRadius: 8, border: `1px solid ${COLORS.line}`, fontSize: 16, fontFamily: "inherit", background: "#fff", color: COLORS.ink };
