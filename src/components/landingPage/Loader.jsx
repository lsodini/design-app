import '../../style/Loader.css';

export default function Loader() {
  return (
    <div className="loader-page">
      <div className="grain-overlay" />

      <div className="loader-content">
        <div className="loader-enso-wrap">
          <svg className="loader-enso-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle
              className="loader-enso-circle"
              cx="100"
              cy="100"
              r="75"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <span className="loader-kanji">間</span>

        <div className="loader-lines">
          <span className="loader-line loader-line-1" />
          <span className="loader-line loader-line-2" />
          <span className="loader-line loader-line-3" />
        </div>
      </div>
    </div>
  );
}
