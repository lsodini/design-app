import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#f7f5f0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Georgia, serif',
          padding: '2rem',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: '6rem',
            fontWeight: 100,
            color: '#1a1a1a',
            opacity: 0.08,
            marginBottom: '2rem',
          }}>
            無
          </div>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 300,
            color: '#1a1a1a',
            letterSpacing: '0.3em',
            margin: '0 0 1rem',
          }}>
            Something went wrong
          </h1>
          <p style={{
            fontSize: '0.85rem',
            color: '#1a1a1a',
            opacity: 0.5,
            letterSpacing: '0.1rem',
            margin: '0 0 2rem',
          }}>
            An unexpected error has occurred
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'none',
              border: '1px solid rgba(26,26,26,0.15)',
              padding: '0.8rem 2rem',
              fontSize: '0.75rem',
              letterSpacing: '0.2rem',
              textTransform: 'uppercase',
              color: '#1a1a1a',
              cursor: 'pointer',
              fontFamily: 'Georgia, serif',
            }}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
