const members = [
  { name: "👑 黃婷筠", romanized: "HUANG TING-YUN",  id: "110306053", role: "隊長", crown: true },
  { name: "林沁儒",  romanized: "LIN CHIN-JU",     id: "111306019", role: "組員", crown: false },
  { name: "王莉騏",  romanized: "WANG LI-CHI",     id: "111306023", role: "組員", crown: false },
  { name: "張雅媗",  romanized: "CHANG YA-HSUAN",  id: "110405134", role: "組員", crown: false },
  { name: "張筠榛",  romanized: "CHANG YUN-CHEN",  id: "111203056", role: "組員", crown: false },
]

function GroupAvatar() {
  return (
    <svg viewBox="0 0 200 80" width="200" height="80" fill="none" stroke="#a8b8c8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {[20, 55, 100, 145, 180].map((cx, i) => (
        <g key={i}>
          <circle cx={cx} cy="28" r="12" />
          {i === 0 ? (
            <path d={`M${cx - 10} 18 L${cx - 5} 11 L${cx} 15 L${cx + 5} 11 L${cx + 10} 18`} />
          ) : (
            <path d={`M${cx - 10} 17 Q${cx} 11 ${cx + 10} 17`} />
          )}
          <path d={`M${cx - 14} 70 Q${cx - 14} 54 ${cx} 52 Q${cx + 14} 54 ${cx + 14} 70`} />
        </g>
      ))}
    </svg>
  )
}

export default function Credits() {
  return (
    <div
      style={{ background: "#e8eaf0", minHeight: "100vh" }}
      className="flex items-center justify-center py-16 px-4"
    >
      <div
        style={{
          background: "linear-gradient(160deg, #1c2535 0%, #1a2030 60%, #151c2a 100%)",
          borderRadius: "28px",
          width: "300px",
          boxShadow: "0 12px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
        className="flex flex-col items-center pt-12 pb-10 px-8"
      >
        <div style={{ opacity: 0.8 }}>
          <GroupAvatar />
        </div>
        <div style={{ width: "50px", height: "1px", background: "rgba(168,184,200,0.25)", margin: "16px 0 14px" }} />
        <p style={{ color: "#c8d8e8", fontSize: "0.65rem", letterSpacing: "0.3em", fontFamily: "sans-serif" }}>
          1142 WEB GAME
        </p>
        <div style={{ width: "50px", height: "1px", background: "rgba(168,184,200,0.15)", margin: "14px 0 16px" }} />
        <div className="flex flex-col items-center gap-4 w-full">
          {members.map((member, i) => (
            <div key={member.id} className="flex flex-col items-center">
              <div className="flex items-baseline gap-2">
                <p style={{
                  color: member.crown ? "#d8e8f8" : "#a8c0d8",
                  fontSize: member.crown ? "1.1rem" : "0.95rem",
                  fontWeight: member.crown ? 700 : 500,
                  letterSpacing: "0.18em",
                  textShadow: "0 1px 0 rgba(0,0,0,0.5), 0 -1px 0 rgba(255,255,255,0.05)",
                  fontFamily: "serif",
                }}>
                  {member.name}
                </p>
                <p style={{
                  color: member.crown ? "#9ab8d0" : "#5a7a98",
                  fontSize: "0.55rem",
                  letterSpacing: "0.15em",
                  fontFamily: "sans-serif",
                }}>
                  {member.role}
                </p>
              </div>
              <p style={{
                color: "#506a88",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                fontFamily: "monospace",
                marginTop: "2px",
              }}>
                {member.id}
              </p>
              {i < members.length - 1 && (
                <div style={{ width: "24px", height: "1px", background: "rgba(168,184,200,0.1)", marginTop: "12px" }} />
              )}
            </div>
          ))}
        </div>
        <div style={{ width: "50px", height: "1px", background: "rgba(168,184,200,0.15)", margin: "18px 0 14px" }} />
        <p style={{ color: "#3a5a78", fontSize: "0.55rem", letterSpacing: "0.25em", fontFamily: "sans-serif" }}>
          國立政治大學
        </p>
      </div>
    </div>
  )
}
