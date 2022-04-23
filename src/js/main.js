import $ from 'jquery';
import { OrderForm } from './forms/order-form';

function init(){
    $('.beauty').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: '.actions__buttons',
        nextArrow: '.actions__button',
    });

    new OrderForm();
}

$(document).ready(init);