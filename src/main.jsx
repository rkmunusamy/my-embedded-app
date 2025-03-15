import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Mount function to render the Booking Widget into a container element.
// It reads the customer ID from a data attribute and uses a Shadow DOM for encapsulation.
export function mountBookingWidget(containerId = 'booking-widget-container', customerIdProp) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id "${containerId}" not found.`);
    return;
  }
  
  // Get the customer ID from the container's data attribute if not provided.
  const customerId = customerIdProp || container.getAttribute('data-customer-id') || '';
  
  // Create a Shadow DOM for style encapsulation.
  const shadowRoot = container.attachShadow({ mode: 'open' });
  const mountPoint = document.createElement('div');
  shadowRoot.appendChild(mountPoint);
  
  // Use React 18's createRoot API.
  const root = ReactDOM.createRoot(mountPoint);
  root.render(<App customerId={customerId} />);
}

// Auto-mount the widget if the default container exists.
function autoMount() {
  if (document.getElementById('booking-widget-container')) {
    mountBookingWidget();
  }
}

// Wait for the DOM to load before auto-mounting.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', autoMount);
} else {
  autoMount();
}

// Export the mount function in case manual mounting is needed.
export default { mountBookingWidget };
