import { useEffect, useState, useMemo, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface RsvpResponse {
  id: string;
  name: string;
  phone: string;
  guest_count: number;
  events_attending: string[] | null;
  dietary_preference: string | null;
  message: string | null;
  created_at: string;
}

type SortKey = "name" | "created_at" | "guest_count";
type SortDir = "asc" | "desc";

const Admin = () => {
  const [responses, setResponses] = useState<RsvpResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [secondsAgo, setSecondsAgo] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const { data, error } = await supabase
      .from("rsvp_responses")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setResponses(data);
    setLoading(false);
    setLastUpdated(new Date());
    setSecondsAgo(0);
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60_000);
    return () => clearInterval(interval);
  }, [fetchData]);

  useEffect(() => {
    const tick = setInterval(() => setSecondsAgo((s) => s + 1), 1000);
    return () => clearInterval(tick);
  }, [lastUpdated]);

  const totalGuests = responses.reduce((s, r) => s + r.guest_count, 0);
  const weddingCount = responses.filter((r) =>
    r.events_attending?.some((e) => e.toLowerCase().includes("wedding"))
  ).length;
  const receptionCount = responses.filter((r) =>
    r.events_attending?.some((e) => e.toLowerCase().includes("reception"))
  ).length;

  const stats = [
    { label: "Total RSVPs", value: responses.length },
    { label: "Total Guests", value: totalGuests },
    { label: "Wedding", value: weddingCount },
    { label: "Reception", value: receptionCount },
  ];

  const filtered = useMemo(() => {
    let list = responses;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.phone.includes(q)
      );
    }
    list = [...list].sort((a, b) => {
      let valA: string | number, valB: string | number;
      if (sortKey === "guest_count") {
        valA = a.guest_count;
        valB = b.guest_count;
      } else if (sortKey === "name") {
        valA = a.name.toLowerCase();
        valB = b.name.toLowerCase();
      } else {
        valA = a.created_at;
        valB = b.created_at;
      }
      if (valA < valB) return sortDir === "asc" ? -1 : 1;
      if (valA > valB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [responses, search, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  const arrow = (key: SortKey) =>
    sortKey === key ? (sortDir === "asc" ? " ↑" : " ↓") : "";

  const exportCSV = () => {
    const header = ["#", "Name", "Phone", "Guests", "Events Attending", "Dietary", "Message", "Submitted"];
    const rows = filtered.map((r, i) => [
      i + 1,
      `"${r.name}"`,
      `"${r.phone}"`,
      r.guest_count,
      `"${(r.events_attending || []).join('; ')}"`,
      `"${r.dietary_preference || ''}"`,
      `"${(r.message || '').replace(/"/g, '""')}"`,
      format(new Date(r.created_at), "dd MMM yyyy, h:mm a"),
    ]);
    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rsvp-export-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#FFF8F4", color: "#1A1611", minHeight: "100vh", padding: "2rem 1.5rem" }}>
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "2.5rem", paddingBottom: "1.5rem", borderBottom: "0.5px solid rgba(74,124,89,0.25)" }}>
          <div>
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: 32, fontWeight: 400, letterSpacing: "0.02em", margin: 0, color: "#4A7C59" }}>
              Ramya <span style={{ color: "#E06B82" }}>&</span> Kishan
            </h1>
            <p style={{ fontSize: 12, color: "#8B7B6B", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>
              RSVP Dashboard · Wedding
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4A7C59", display: "inline-block", animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: 12, color: "#6B6154" }}>Live</span>
            </div>
            <span style={{ fontSize: 11, color: "#8B7B6B" }}>{secondsAgo}s ago</span>
            <button onClick={fetchData} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, padding: "6px 14px", borderRadius: 6, border: "1px solid rgba(74,124,89,0.3)", background: "#fff", color: "#4A7C59", cursor: "pointer" }}>
              Refresh
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: "2.5rem" }}>
          {stats.map((s) => (
            <div key={s.label} style={{ background: "#fff", border: "0.5px solid rgba(74,124,89,0.2)", borderRadius: 10, padding: "1.2rem 1rem", textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "#8B7B6B", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                {s.label}
              </div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 36, fontWeight: 400, color: "#4A7C59" }}>
                {loading ? "–" : s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Table Card */}
        <div style={{ background: "#fff", border: "0.5px solid rgba(74,124,89,0.2)", borderRadius: 10, overflow: "hidden" }}>
          {/* Toolbar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, padding: "1rem 1.25rem", borderBottom: "0.5px solid rgba(74,124,89,0.12)" }}>
            <input
              type="text"
              placeholder="Search by name or phone…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, padding: "6px 14px", borderRadius: 6, border: "1px solid rgba(74,124,89,0.2)", background: "transparent", color: "#1A1611", outline: "none", width: 240 }}
            />
            <button onClick={exportCSV} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, padding: "6px 14px", borderRadius: 6, border: "1px solid rgba(74,124,89,0.3)", background: "#4A7C59", color: "#fff", cursor: "pointer" }}>
              Export CSV
            </button>
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", fontSize: 14, borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "0.5px solid rgba(74,124,89,0.15)", textAlign: "left" }}>
                  <th style={thStyle}>#</th>
                  <th style={{ ...thStyle, cursor: "pointer", userSelect: "none" }} onClick={() => toggleSort("name")}>Name{arrow("name")}</th>
                  <th style={thStyle}>Phone</th>
                  <th style={{ ...thStyle, cursor: "pointer", userSelect: "none" }} onClick={() => toggleSort("guest_count")}>Guests{arrow("guest_count")}</th>
                  <th style={thStyle}>Events</th>
                  <th style={thStyle}>Dietary</th>
                  <th style={{ ...thStyle, cursor: "pointer", userSelect: "none" }} onClick={() => toggleSort("created_at")}>Submitted{arrow("created_at")}</th>
                  <th style={thStyle}></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} style={{ padding: "2.5rem", textAlign: "center", color: "#8B7B6B" }}>Loading…</td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ padding: "2.5rem", textAlign: "center", color: "#8B7B6B" }}>
                      <div style={{ fontSize: 20, color: "#E06B82", marginBottom: 8 }}>🌸</div>
                      No responses yet.
                    </td>
                  </tr>
                ) : (
                  filtered.map((r, i) => (
                    <>
                      <tr
                        key={r.id}
                        style={{ borderBottom: "0.5px solid rgba(74,124,89,0.08)", cursor: "pointer" }}
                        onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#FDFAF5")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <td style={tdStyle}>{i + 1}</td>
                        <td style={{ ...tdStyle, fontWeight: 500 }}>{r.name}</td>
                        <td style={{ ...tdStyle, fontSize: 13 }}>{r.phone}</td>
                        <td style={tdStyle}>
                          {r.guest_count} {r.guest_count === 1 ? "person" : "people"}
                        </td>
                        <td style={tdStyle}>
                          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                            {(r.events_attending || []).map((ev) => (
                              <span key={ev} style={{ display: "inline-block", padding: "2px 8px", borderRadius: 12, fontSize: 11, fontWeight: 500, background: ev.toLowerCase().includes("wedding") ? "#EAF3DE" : "#FFF0E8", color: ev.toLowerCase().includes("wedding") ? "#3B6D11" : "#B85C2F" }}>
                                {ev.toLowerCase().includes("wedding") ? "Wedding" : "Reception"}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td style={{ ...tdStyle, fontSize: 13 }}>{r.dietary_preference || "—"}</td>
                        <td style={{ ...tdStyle, color: "#6B6154", fontSize: 13 }}>
                          {format(new Date(r.created_at), "dd MMM, h:mm a")}
                        </td>
                        <td style={tdStyle}>
                          <span style={{ fontSize: 12, color: "#8B7B6B" }}>{expandedId === r.id ? "▲" : "▼"}</span>
                        </td>
                      </tr>
                      {expandedId === r.id && (
                        <tr key={`${r.id}-detail`} style={{ background: "#FDFAF5" }}>
                          <td colSpan={8} style={{ padding: "1rem 1.25rem 1.25rem 3.5rem" }}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem 2rem", fontSize: 13 }}>
                              <div>
                                <span style={{ color: "#8B7B6B", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>Full Name</span>
                                <div style={{ marginTop: 2, fontWeight: 500 }}>{r.name}</div>
                              </div>
                              <div>
                                <span style={{ color: "#8B7B6B", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>Phone</span>
                                <div style={{ marginTop: 2 }}>{r.phone}</div>
                              </div>
                              <div>
                                <span style={{ color: "#8B7B6B", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>Guest Count</span>
                                <div style={{ marginTop: 2 }}>{r.guest_count}</div>
                              </div>
                              <div>
                                <span style={{ color: "#8B7B6B", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>Dietary Preference</span>
                                <div style={{ marginTop: 2 }}>{r.dietary_preference || "No Preference"}</div>
                              </div>
                              <div style={{ gridColumn: "1 / -1" }}>
                                <span style={{ color: "#8B7B6B", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>Events Attending</span>
                                <div style={{ marginTop: 2 }}>{(r.events_attending || []).join(", ") || "None selected"}</div>
                              </div>
                              {r.message && (
                                <div style={{ gridColumn: "1 / -1" }}>
                                  <span style={{ color: "#8B7B6B", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>Message</span>
                                  <div style={{ marginTop: 2, fontStyle: "italic", color: "#4A7C59" }}>"{r.message}"</div>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
};

const thStyle: React.CSSProperties = {
  padding: "0.75rem 1.25rem",
  fontSize: 11,
  color: "#8B7B6B",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  fontWeight: 500,
};

const tdStyle: React.CSSProperties = {
  padding: "0.75rem 1.25rem",
  color: "#1A1611",
};

export default Admin;
