import React, { Suspense, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import PlaylistPage from "./pages/PlaylistPage/PlaylistPage";
import useExchangeToken from "./hooks/useExchangeToken";
const AppLayout = React.lazy(() => import("./layout/AppLayout"));
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage/SearchPage"));

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const codeVerifier = localStorage.getItem("code_verifier");

  const { mutate: exchangeToken } = useExchangeToken();

  useEffect(() => {
    if (code && codeVerifier) {
      exchangeToken({ code, codeVerifier });
    }
  }, [code, codeVerifier]);

  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/playlist" element={<PlaylistPage />} />
          {/* <Route path="/search/:keyword" element={<SearchWithKeywordPage />} />
      <Route path="/playlist/:id" element={<PlaylistDetailPage />} />
     */}
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
