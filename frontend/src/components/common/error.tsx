// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class OhNoErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div>
          Error!
          <span role="img" aria-label="oh no">
            😮
          </span>
          <button onClick={() => window.location.reload()} type="button">
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default OhNoErrorBoundary;
