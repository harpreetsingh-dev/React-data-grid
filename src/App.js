// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// import DataGrid from 'react-data-grid';
// import 'react-data-grid/dist/react-data-grid.css';
 
// const columns = [
//   { key: 'id', name: 'ID' },
//   { key: 'title', name: 'Title' }
// ];
 
// const rows = [
//   { id: 0, title: 'Example' },
//   { id: 1, title: 'Demo' }
// ];
 
// function App() {
//   return (
//     <DataGrid
//       columns={columns}
//       rows={rows}
//     />
//   );
// }

// export default App;

import React from 'react';
import './App.css';
import { store } from "./actions/store";
import { Provider } from "react-redux";
import Emp from './components/Rdxgrd';
//import { ToastProvider } from "react-toast-notifications";

function App() {
  return (
    <Provider store={store}>
          <Emp />
    </Provider>
  );
}

export default App;