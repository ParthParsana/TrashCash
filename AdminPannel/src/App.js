import './App.css';
import {Space} from "antd";
import AppFooter from './Component/AppFooter';
import AppHeader from './Component/AppHeader';
import PageContent from './Component/PageContent';
import SideMenu from './Component/SideMenu';
function App() {
   return ( <div className="App">
    <AppHeader/>
    <Space className="SideMenuAndPageContent">
      <SideMenu></SideMenu>
      <PageContent></PageContent>
    </Space>
    <AppFooter></AppFooter>
   </div>
   );
  }

export default App;
