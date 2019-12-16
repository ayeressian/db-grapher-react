import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'db-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
