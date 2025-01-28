import WriteMemoryScreen from "./WriteMemoryScreen";
import { strategies } from "../tools/strategies";
import { useLocation } from "react-router-dom";
export default function MainWriteScreen() {
  const location = useLocation();
  const path = location.pathname.split("/").filter(Boolean);
  const strategy = strategies[`${path[0]}List`]|| [];  
  return <WriteMemoryScreen dataList={strategy} />;
}
