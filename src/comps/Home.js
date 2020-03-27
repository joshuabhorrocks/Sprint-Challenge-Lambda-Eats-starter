import React from "react";
import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div>
            <Link className="home" to={"/"}>
                <div className="homePage">Home</div>
            </Link>
            <h1>Lambda Pizza</h1>
            <h2>Get Pizza Delivered To You While You Code!</h2>
            <h3>Click here to order your pizza now!</h3>
            <Link className="pizza" to={"/pizza"}>
                <div className="order-here">Order Pizza!</div>
            </Link>
        </div>
    )
}

export default Home;