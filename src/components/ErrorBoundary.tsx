import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, RefreshCw, Home, Mail, Shield } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  errorId?: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { 
      hasError: true, 
      error,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }

    // Log error to external service in production
    if (process.env.NODE_ENV === 'production') {
      this.logErrorToService(error, errorInfo);
    }

    this.setState({ errorInfo });
  }

  private logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
    // In a real application, you would send this to your error tracking service
    // like Sentry, LogRocket, or your own error logging API
    const errorData = {
      errorId: this.state.errorId,
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // Example: Send to error logging service
    // fetch('/api/errors', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(errorData)
    // }).catch(console.error);

    console.error('Error logged:', errorData);
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private handleReportError = () => {
    const errorData = {
      errorId: this.state.errorId,
      message: this.state.error?.message,
      stack: this.state.error?.stack,
      componentStack: this.state.errorInfo?.componentStack,
      url: window.location.href,
    };

    const emailBody = `Error Report\n\nError ID: ${errorData.errorId}\nMessage: ${errorData.message}\nURL: ${errorData.url}\n\nPlease provide any additional context about what you were doing when this error occurred.`;

    const mailtoLink = `mailto:support@10ebooks.com?subject=Error Report - ${errorData.errorId}&body=${encodeURIComponent(emailBody)}`;
    
    window.open(mailtoLink, '_blank');
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-gradient-light flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <Card className="shadow-soft border-0">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Oops! Something went wrong
                </CardTitle>
                <CardDescription className="text-lg">
                  We're sorry, but something unexpected happened. Our team has been notified.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Error Details (only in development) */}
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      <div className="font-semibold mb-2">Error Details:</div>
                      <div className="text-sm font-mono bg-red-100 p-2 rounded">
                        {this.state.error.message}
                      </div>
                      {this.state.error.stack && (
                        <details className="mt-2">
                          <summary className="cursor-pointer text-sm font-medium">
                            Stack Trace
                          </summary>
                          <pre className="text-xs bg-red-100 p-2 rounded mt-1 overflow-auto">
                            {this.state.error.stack}
                          </pre>
                        </details>
                      )}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Error ID */}
                {this.state.errorId && (
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Error ID: <span className="font-mono">{this.state.errorId}</span>
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={this.handleReload}
                    className="flex-1 bg-gradient-to-r from-trust-blue to-trust-green hover:from-trust-blue/90 hover:to-trust-green/90 text-white font-semibold"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reload Page
                  </Button>
                  
                  <Button 
                    onClick={this.handleGoHome}
                    variant="outline"
                    className="flex-1"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Go Home
                  </Button>
                </div>

                {/* Report Error */}
                <Button 
                  onClick={this.handleReportError}
                  variant="ghost"
                  className="w-full text-muted-foreground hover:text-foreground"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Report This Error
                </Button>

                {/* Security Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <div className="font-semibold mb-1">Your data is safe</div>
                      <div>
                        This error doesn't affect your personal information or order data. 
                        All your information remains secure and protected.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Helpful Links */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    Need immediate help?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <a 
                      href="mailto:support@10ebooks.com"
                      className="text-sm text-trust-blue hover:text-trust-blue/80 font-medium"
                    >
                      Contact Support
                    </a>
                    <span className="text-muted-foreground hidden sm:inline">•</span>
                    <a 
                      href="/faq"
                      className="text-sm text-trust-blue hover:text-trust-blue/80 font-medium"
                    >
                      FAQ
                    </a>
                    <span className="text-muted-foreground hidden sm:inline">•</span>
                    <a 
                      href="/help"
                      className="text-sm text-trust-blue hover:text-trust-blue/80 font-medium"
                    >
                      Help Center
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
