import { ImageResponse } from "next/og";

export const alt = "Rishi Khandelwal — a little world of curiosity";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const colors = ["#7b6bd6", "#cf9a1c", "#2e5bef", "#d1512b", "#2f9e79", "#cf4d8f"];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#faf9f6",
          padding: "80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* horizon glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 720,
            height: 720,
            background:
              "radial-gradient(circle at 80% 20%, #2e5bef22, transparent 60%)",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              background: "#e4f45a",
              border: "4px solid #101513",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 26,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#101513",
              display: "flex",
            }}
          >
            RISHI KHANDELWAL
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            maxWidth: 900,
          }}
        >
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "#101513",
              fontWeight: 700,
              display: "flex",
            }}
          >
            A little world of curiosity.
          </div>
          <div
            style={{
              fontSize: 34,
              lineHeight: 1.4,
              color: "#61686d",
              display: "flex",
            }}
          >
            Student · Teammate · Researcher — tennis, math, and the
            questions between.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 12 }}>
            {colors.map((c) => (
              <div
                key={c}
                style={{
                  width: 46,
                  height: 10,
                  borderRadius: 6,
                  background: c,
                  display: "flex",
                }}
              />
            ))}
          </div>
          <div style={{ fontSize: 24, color: "#61686d", display: "flex" }}>
            rishikhandelwal.me
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
