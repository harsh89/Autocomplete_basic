import "./styles.css";
import Autocomplete from "./Autocomplete/Autocomplete";

export default function App() {
  return (
    <div className="App">
      <Autocomplete debouncetime={500} maxResults={5} />
    </div>
  );
}
