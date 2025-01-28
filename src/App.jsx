import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader.jsx";
import MainWriteScreen from "./views/MainWriteScreen.jsx";
import Menu from "./components/Menu/Menu.jsx";
const NotFound = lazy(() => import("./views/NotFound.jsx"));
const IrregularsVerbs = lazy(() => import("./views/IrregularsVerbs.jsx"));
// list path
import { listPathMemorizeWords } from "./pathList.js";
function App() {
  return (
    <>
      <Routes>
        {listPathMemorizeWords.map((path) => (
          <Route
            key={path}
            path={`/${path}`}
            element={
              <Suspense fallback={<Loader />}>
                <Menu>
                  <MainWriteScreen />
                </Menu>
              </Suspense>
            }
          />
        ))}
        <Route
          path={`/irregularsverbs`}
          element={
            <Suspense fallback={<Loader />}>
              <Menu>
                <IrregularsVerbs />
              </Menu>
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
