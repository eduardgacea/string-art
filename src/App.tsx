import CanvasControls from "./components/controls/CanvasControls";
import FilePicker from "./components/controls/FilePicker";
import Canvas from "./components/canvas/Canvas";
import RootLayout from "./layouts/RootLayout";

function App() {
  return <RootLayout Canvas={Canvas} CanvasControls={CanvasControls} FilePicker={FilePicker} />;
}

export default App;
