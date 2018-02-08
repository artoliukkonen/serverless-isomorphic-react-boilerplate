import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';

const config = {
  cdn: '',
};

const resolve = (files, props) => files.map((src) => {
  if (!props.manifest[src]) { return null; }
  return config.cdn + props.manifest[src];
}).filter(file => file !== undefined);

const Html = (props) => {
  // const head = Helmet.rewind();

  const { markup, store, styles, helmet } = props;

  const scripts = resolve(['manifest.js', 'vendor.js', 'app.js'], props);
  const renderScripts = scripts.map((src) => {
    if (!src) {
      return null;
    }

    return (
      <script src={`/${src}`} key={src} />
    );
  });

  const initialState = (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.__INITIAL_STATE__=${serialize(store ? store.getState() : {}, { isJSON: true })};`,
      }}
      charSet="UTF-8"
    />
  );

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {helmet.base.toComponent()}
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {helmet.script.toComponent()}
        {/* <link rel="shortcut icon" type="image/x-icon" href={assetsHelper('public/favicon.png')} />
        <link rel="icon" type="image/x-icon" href={assetsHelper('public/favicon.png')} /> */}
        {/* <link rel="shortcut icon" href="/favicon.ico" /> */}
        <link rel="manifest" href="/public/static-low-cache/manifest.json" />
        <meta name="msapplication-config" content="/public/static-low-cache/browserconfig.xml" />
        <meta name="theme-color" content="#444446" />
        {styles}
      </head>
      <body>
        <main
          id="app"
          dangerouslySetInnerHTML={{ __html: markup }} // eslint-disable-line react/no-danger
        />
        {initialState}
        {renderScripts}
      </body>
    </html>
  );
};

Html.propTypes = {
  markup: PropTypes.string,
  store: PropTypes.object,
  styles: PropTypes.node,
  helmet: PropTypes.object,
};

export default Html;
