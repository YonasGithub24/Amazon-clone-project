import React, { useContext } from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { BsCart3 } from "react-icons/bs";
import LowerHeader from "./LowerHeader";
import { SlLocationPin } from "react-icons/sl";
import amazonLogo from "./amazon_logo.png";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/Firebase";

const Header = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  // console.log(basket.length);
  

  return (
    <section className={classes.fixed}>
      <div className={classes.header_container}>
        <div className={classes.logo_container}>
          <Link to="/">
            <img src={amazonLogo} alt="amazon logo" />
          </Link>
          <div className={classes.delivery}>
            <span>
              <SlLocationPin />
            </span>
            <div>
              <p>Deliver to</p>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>
        <div className={classes.search}>
          <select name="" id="">
            <option value="">All</option>
          </select>

          <input type="text" placeholder="serch amazon" />
          <BsSearch size={35} />
        </div>

        <div className={classes.order_container}>
          <Link to="" className={classes.language}>
            <img
              src="https://pngimg.com/uploads/flags/flags_PNG14655.png"
              alt=""
            />

            <select name="" id="">
              <option value="">EN</option>
            </select>
          </Link>

          <Link to={!user && "/auth"}>
            <div>
              {user ? (
                <>
                  <p>Hello {user?.email?.split("@")[0]} </p>
                  <span onClick={() => auth.signOut()}>sign Out</span>
                </>
              ) : (
                <>
                  <p>Hello, sign In</p>
                  <span>Account & Lists</span>
                </>
              )}
            </div>
          </Link>

          <Link to="/orders">
            <p>returns</p>
            <span>& Orders</span>
          </Link>

          <Link to="/cart" className={classes.cart}>
            <BsCart3 size={35} />
            {/* <span>{totalItem}</span> */}
            <span>{basket.length}</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Header;
