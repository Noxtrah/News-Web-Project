// _app.tsx
import { Provider } from 'react-redux';
import store from './redux/store'; // Adjust the path as per your project structure
import '../styles/globals.css'; // Example import for global styles
import { AppProps } from 'next/app'; // Import the AppProps type from Next.js

function MyApp({ Component, pageProps }: AppProps) { // Explicitly type the Component prop
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
