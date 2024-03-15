import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
const Header = () => {
  return (
    <div>
      <div className="flex items-center justify-between px-10 py-7">
        <div className="flex justify-center items-center gap-2.5">
          <img
            src={`${process.env.PUBLIC_URL}/store.jpg`}
            alt="Logo"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="font-bold text-xl">SARDOR'S STORE</h2>
            <h3 className="text-gray-400 text-sm">Магазин лучших товаров</h3>
          </div>
        </div>
        <div style={{}}>
          <ul className="flex items-center justify-center gap-5">
            <li>
              <a
                href="#"
                className="flex items-center justify-center gap-1.5 text-gray-500 hover:text-gray-600"
              >
                <ShoppingCartOutlinedIcon />
                <p>0 sum</p>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center gap-1.5 text-gray-500 hover:text-gray-600"
              >
                <FavoriteBorderOutlinedIcon />
                <p>Закладки</p>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center gap-1.5 text-gray-500  hover:text-gray-600"
              >
                <AccountCircleOutlinedIcon />
                <p>Профиль</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
