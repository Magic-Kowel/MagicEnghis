import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader.jsx";
import MainWriteScreen from "./views/MainWriteScreen.jsx";

const Menu = lazy(() => import("./components/Menu/Menu.jsx"));
const NotFound = lazy(() => import("./views/NotFound.jsx"));
const IrregularsVerbs = lazy(() => import("./views/IrregularsVerbs.jsx"));
const Vs = lazy(() => import("./views/Vs.jsx"));
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
              <Menu>
                <MainWriteScreen />
              </Menu>
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
        <Route
          path="/vs"
          element={
            <Suspense fallback={<Loader />}>
              <Menu>
                <Vs />
              </Menu>
            </Suspense>
          }
        ></Route>
        <Route
          path={`/`}
          element={
            <Suspense fallback={<Loader />}>
              <Menu>
                <IrregularsVerbs />
              </Menu>
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<Loader />}>
              <Menu>
                <NotFound />
              </Menu>
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default App;
