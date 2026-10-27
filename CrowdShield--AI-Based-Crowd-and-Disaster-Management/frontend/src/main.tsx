import React, { Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('KumbhRakshak UI Error Caught:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', color: '#ff4d4f', background: '#0a0a0b', minHeight: '100vh', fontFamily: 'monospace' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', background: '#111827', border: '1px solid #dc2626', borderRadius: '16px', padding: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#f87171', marginBottom: '12px' }}>
              🚨 KumbhRakshak UI Diagnostic Warning
            </h2>
            <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>
              The application encountered a runtime issue during rendering. Details below:
            </p>
            <pre style={{ whiteSpace: 'pre-wrap', color: '#fca5a5', background: '#1f2937', padding: '16px', borderRadius: '12px', fontSize: '12px', overflowX: 'auto' }}>
              {this.state.error?.toString()}
            </pre>
            {this.state.errorInfo?.componentStack && (
              <pre style={{ whiteSpace: 'pre-wrap', color: '#6b7280', marginTop: '12px', fontSize: '11px', maxHeight: '200px', overflowY: 'auto' }}>
                {this.state.errorInfo.componentStack}
              </pre>
            )}
            <button 
              onClick={() => window.location.reload()}
              style={{ marginTop: '20px', padding: '10px 24px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              🔄 Reload Dashboard
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
