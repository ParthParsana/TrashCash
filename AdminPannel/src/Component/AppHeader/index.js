import { Typography } from "antd";
import logo from "D:/TrashCash/Admin Pannel/trash-cash/src/Image/3785dbcd-e704-4ee2-bb85-b01499dd1a57.jpeg";

function AppHeader() {
    return (<div className="AppHeader">
          <img src={logo} alt="logo" width="100" />
          <Typography.Title>Trash-Cash Admin</Typography.Title>
    </div> 
    );
}
export default AppHeader;