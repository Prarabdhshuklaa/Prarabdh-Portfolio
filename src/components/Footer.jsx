export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg-primary)',
        borderTop: '1px solid transparent',
        borderImage: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.18), rgba(123,47,255,0.18), transparent) 1',
      }}
    >
      <div
        style={{
          height: 70,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.85rem',
            fontWeight: 500,
            color: '#A0A0A0',
            letterSpacing: '0.02em',
            margin: 0,
            userSelect: 'none',
          }}
        >
          © 2026 Prarabdh Shukla. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
