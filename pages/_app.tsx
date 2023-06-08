import type { AppProps } from 'next/app';
import Router from "next/router";
import { Provider } from 'react-redux';
import store from '../app/store';
import ProgressBar from '../components/ProgressBar';
import '../styles/globals.css';

const progress = new ProgressBar({
  size: 2,
  color: "#996600",
  className: "bar-of-progress",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
