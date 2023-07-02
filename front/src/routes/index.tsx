import type { FC } from 'react';
import { Suspense } from 'react';
import { Header, Footer } from 'components/organisms';
import { SignIn, useAuth } from 'features/authentication';
import { Helmet } from 'react-helmet-async';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from 'components/templates/Home';
import MyPage from 'components/templates/MyPage';
import Update from 'components/templates/Update';

const IndexRoutes: FC = () => {
  const [auth] = useAuth();

  if (auth == null) return <SignIn />;

  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_TITLE}</title>
        <meta name="description" content={import.meta.env.VITE_DESCRIPTION} />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta
          name="msapplication-config"
          content="/img/favicons/browserconfig.xml"
        />
        <meta name="theme-color" content="#ffffff" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/img/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/img/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/img/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/img/favicons/manifest.json" />
        <link
          rel="mask-icon"
          href="/img/favicons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/img/favicons/favicon.ico" />
      </Helmet>
      <Header />
      <Suspense>
        <Routes>
          <Route path="update" element={<Update />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
};

export default IndexRoutes;
