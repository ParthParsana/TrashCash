import { Menu } from "antd";
import { AppstoreOutlined, DollarOutlined, FileDoneOutlined, ProfileOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

function SideMenu() {
    const navigate = useNavigate();
    return ( 
    
    <div className="SideMenu">
      
      <Menu
      onClick={(item)=>{

        navigate(item.key);
      }}
        items={[
            {
                label: "Dashboard",
                icon: <AppstoreOutlined />,
                key: "/",
            },  
            {
                label: "Users",
                icon: <UserOutlined />,
                key: "/Users",
            },
            {
                label: "Orders",
                icon: <ShoppingCartOutlined />,
                key: "/Orders",
            },
            {
                label: "Trash Before Burn",
                icon: <ShoppingCartOutlined />,
                key: "/Tbb",
            },
            {
                label: "Trash Items",
                icon: <DollarOutlined/>,
                key: "/TrashPrices",
            },
            {
                label: "Payments",
                icon: <FileDoneOutlined />,
                key: "/Reviews",
            },

        ]}
      >   
      </Menu>
    </div>
    );
}
export default SideMenu;