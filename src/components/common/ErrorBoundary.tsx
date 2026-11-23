import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error?.message || 'Terjadi kendala saat memuat modul pembelajaran.'
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error('App ErrorBoundary caught error:', error, info);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    this.setState({ hasError: false, message: '' });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="app-error-boundary" role="alert">
          <div className="app-error-card">
            <span className="app-error-tag">PEMULIHAN SESI PEMBELAJARAN</span>
            <h2>Halaman Tidak Dapat Dimuat</h2>
            <p className="app-error-desc">
              Koneksi mungkin terputus saat mengambil modul interaktif, atau peramban mengalami gangguan sementara.
            </p>
            <div className="app-error-actions">
              <button type="button" className="btn btn-magma" onClick={this.handleReload}>
                Muat Ulang Halaman
              </button>
              <button type="button" className="btn btn-outline" onClick={this.handleGoHome}>
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
