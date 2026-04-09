import venuePhoto from "@/assets/venue-photo.webp";

const VenueSection = () => {
  return (
    <section
      id="venue"
      className="relative overflow-hidden"
      style={{ background: "#FFF8F4", padding: "72px 24px 80px" }}
    >
      <div className="flex flex-col items-center" style={{ maxWidth: "860px", margin: "0 auto" }}>
        {/* Header */}
        <p
          className="uppercase text-center"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.22em",
            color: "#C9A84C",
            marginBottom: "10px",
          }}
        >
          Join Us Here
        </p>
        <h2
          className="text-center"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "36px",
            fontWeight: 400,
            color: "#2D2D2D",
            marginBottom: "40px",
          }}
        >
          The Venue
        </h2>

        {/* Hero Image */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            maxWidth: "860px",
            height: "380px",
            borderRadius: "20px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.08)",
          }}
        >
          <img
            src={venuePhoto}
            alt="L'Elegant Banquet Hall"
            className="w-full h-full object-cover block"
            style={{ objectPosition: "center" }}
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, transparent 40%, rgba(15,30,20,0.75) 100%)",
              borderRadius: "20px",
            }}
          />
          {/* Venue tag */}
          <div
            className="absolute z-[2] flex items-end justify-between flex-wrap gap-3"
            style={{ bottom: "28px", left: "32px", right: "32px" }}
          >
            <div>
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "28px",
                  color: "#FFF8F4",
                  fontWeight: 400,
                  lineHeight: 1.2,
                }}
              >
                L'Elegant Banquet Hall
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  color: "rgba(255,248,244,0.6)",
                  letterSpacing: "0.1em",
                  marginTop: "4px",
                }}
              >
                KALINDI KUNJ · DELHI 110076
              </p>
            </div>
            <div
              className="flex-shrink-0 flex items-center"
              style={{
                padding: "8px 16px",
                borderRadius: "40px",
                background: "rgba(201,168,76,0.2)",
                border: "0.5px solid rgba(201,168,76,0.5)",
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "18px",
                color: "#C9A84C",
              }}
            >
              7 PM
            </div>
          </div>
        </div>

        {/* Detail Cards */}
        <div
          className="w-full grid gap-4"
          style={{
            maxWidth: "860px",
            gridTemplateColumns: "1fr 1fr",
            marginTop: "20px",
            marginBottom: "24px",
          }}
        >
          {/* Date & Time */}
          <div
            style={{
              background: "white",
              borderRadius: "14px",
              padding: "20px 22px",
              border: "0.5px solid rgba(0,0,0,0.06)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
            }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                color: "#C9A84C",
                marginBottom: "6px",
              }}
            >
              DATE & TIME
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "17px",
                color: "#2D2D2D",
                lineHeight: 1.5,
              }}
            >
              Sunday, 17th May 2026
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                color: "#999",
                marginTop: "4px",
              }}
            >
              Doors open at 7:00 PM
            </p>
          </div>

          {/* Address */}
          <div
            style={{
              background: "white",
              borderRadius: "14px",
              padding: "20px 22px",
              border: "0.5px solid rgba(0,0,0,0.06)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
            }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                color: "#C9A84C",
                marginBottom: "6px",
              }}
            >
              ADDRESS
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "17px",
                color: "#2D2D2D",
                lineHeight: 1.5,
              }}
            >
              Kalindi Kunj
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                color: "#999",
                marginTop: "4px",
              }}
            >
              New Delhi · 110076
            </p>
          </div>
        </div>

        {/* Google Maps */}
        <div
          className="w-full overflow-hidden"
          style={{
            maxWidth: "860px",
            borderRadius: "16px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          }}
        >
          <iframe
            src="https://maps.google.com/maps?q=L%27Elegant+Banquet+Hall+Kalindi+Kunj+Delhi+110076&output=embed"
            className="w-full block"
            style={{ height: "260px", border: "none" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="L'Elegant Banquet Hall Location"
          />
        </div>

        {/* Get Directions */}
        <a
          href="https://share.google/3a8JpXaaGKD8WNKhF"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center no-underline"
          style={{
            marginTop: "20px",
            gap: "8px",
            padding: "12px 28px",
            background: "#2D5A3D",
            color: "#FFF8F4",
            borderRadius: "40px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
            fontWeight: 500,
            letterSpacing: "0.04em",
            boxShadow: "0 4px 16px rgba(45,90,61,0.3)",
          }}
        >
          Get Directions
          <span
            className="flex items-center justify-center"
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              fontSize: "12px",
            }}
          >
            →
          </span>
        </a>
      </div>

      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          #venue .relative.w-full.overflow-hidden {
            height: 280px !important;
          }
          #venue .absolute.z-\\[2\\] {
            bottom: 20px !important;
            left: 20px !important;
            right: 20px !important;
          }
          #venue .absolute.z-\\[2\\] p:first-child {
            font-size: 22px !important;
          }
          #venue .w-full.grid {
            grid-template-columns: 1fr 1fr !important;
          }
          #venue .w-full.grid > div {
            padding: 14px 16px !important;
          }
          #venue iframe {
            height: 220px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default VenueSection;
