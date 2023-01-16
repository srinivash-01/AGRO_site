import React from 'react';
import Banner1 from "../images/banner1.jpg";
import Banner2 from "../images/banner2.jpg";
import Banner3 from "../images/banner3.jpg";
import "../css/carousal.css";
export default function ImageCarousel(props) {
    return (
        <div id="carouselExampleControls" class="carousel slide car" data-ride="carousel">
            <div class="carousel-inner">
                {/* <div class="carousel-item active">
                    <img class="d-block w-100" src={Banner1} alt="First slide"/>
                </div> */}
                <div class="carousel-item active">
                    <img class="d-block w-100" src={Banner2} alt="Second slide"/>
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100" src={Banner3} alt="Third slide"/>
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    )
};