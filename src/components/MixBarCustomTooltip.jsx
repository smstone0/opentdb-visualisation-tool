import "../styles/MixBarCustomTooltip.css";

// Custom tooltip to display category name with difficulty counts
const MixBarCustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const easy = payload.find((p) => p.dataKey === "easy")?.value || null;
    const medium = payload.find((p) => p.dataKey === "medium")?.value || null;
    const hard = payload.find((p) => p.dataKey === "hard")?.value || null;

    return (
      <div className="custom-tooltip">
        <strong>{label}</strong>
        <br />
        {hard && <span style={{ color: "#F16F6F" }}>Hard: {hard}</span>}
        {medium && <span style={{ color: "#FFBB28" }}>Medium: {medium}</span>}
        {easy && <span style={{ color: "#00C49F" }}>Easy: {easy}</span>}
      </div>
    );
  }
  return null;
};

export default MixBarCustomTooltip;
