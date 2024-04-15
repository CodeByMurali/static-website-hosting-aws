// JavaScript Document

$(window).load(function () {
    "use strict";
    // makes sure the whole site is loaded
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({
        'overflow': 'visible'
    });
})

$(document).ready(function () {
    "use strict";

    $('#hb').hide();
    $('body').show();

    // for the certifications
    var total_certs = $('.col-md-4').length;
    $('#total_certs').append(": " + total_certs + " and counting.");

    var aws_total_certs = $('.aws').length;
    var aws_total_azure = $('.azure').length;
    var aws_total_google = $('.google').length;
    var aws_total_others = $('.others').length;

    $(".certifications_filter").find('a[data-filter]').on('click', function () {

        var clicked_cert = $(this).attr("data-filter").replace(".", "");

        switch (clicked_cert) {
            case 'aws':
                $('#total_certs').text("TOTAL: " + aws_total_certs + " and counting.");
                break;
            case 'azure':
                $('#total_certs').text("TOTAL: " + aws_total_azure + " and counting.");
                break;
            case 'google':
                $('#total_certs').text("TOTAL: " + aws_total_google + " and counting.");
                break;
            case 'others':
                $('#total_certs').text("TOTAL: " + aws_total_others + " and counting.");
                break;
            default:
                $('#total_certs').text("TOTAL: " + total_certs + " and counting.");
        }

        return false;

    });

    // scroll menu
    var sections = $('.section'),
        nav = $('.navbar-fixed-top,footer,#about'),
        nav_height = nav.outerHeight();

    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop();

        sections.each(function () {
            var top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                sections.removeClass('active');

                $(this).addClass('active');
                nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
    });

    $(window).scroll(function () {

        if ($(this).scrollTop()) {
            $('#toTop').fadeIn();
        } else {
            $('#toTop').fadeOut();
        }

        var scrollTop = $(window).scrollTop(); //Current vertical scroll position from the top
        // Check to see if we've scrolled more than mainMenuBottom
        if (scrollTop > 700) {
            //Scroll is lower than #mainMenu, check if the #topMenu is displayed
            if (($("#top-menu").is(":visible") === false)) {
                //#mainMenu is not visible, so show it
                $('#top-menu').fadeIn('slow');
                $('#bottom_menu').hide();
            }
        } else {
            //Scroll bar is higher than #mainMenuBottom, do not show #topMenu
            if ($("#top-menu").is(":visible")) {
                $('#bottom_menu').fadeIn('slow');
                $('#top-menu').hide();
            }
        }

        if ($(window).scrollTop() + window.innerHeight > $(document).height() - 50) {
            nav.find('a').removeClass("active");
            $('.contact').addClass("active");
        }

        //$('.hamb-div').css('position', 'fixed')

    });
    $("#toTop").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 800);
    });


    nav.find('a').on('click', function () {
        var $el = $(this),
            id = $el.attr('href');

        $('html, body').animate({
            scrollTop: $(id).offset().top - nav_height + 2
        }, 600);

        return false;
    });


    // Menu opacity

    if ($(window).scrollTop() > 80) {
        $(".navbar-fixed-top").addClass("bg-nav");
    } else {
        $(".navbar-fixed-top").removeClass("bg-nav");
    }
    $(window).scroll(function () {
        if ($(window).scrollTop() > 80) {
            $(".navbar-fixed-top").addClass("bg-nav");
        } else {
            $(".navbar-fixed-top").removeClass("bg-nav");
        }
    });


    _ipgeolocation.getGeolocation(handleResponse, "2c99f72b55cf4cbc973a738689d677e0");
    _ipgeolocation.enableSessionStorage(true);
    function handleResponse(response) {
        /*console.log(response.latitude);
        console.log(response.longitude);
        console.log(response.ip);
        console.log(response.continent_name);
        console.log(response.country_code2);
        console.log(response.country_name);
        console.log(response.state_code);
        console.log(response.state_prov);
        console.log(response.time_zone.name);
        console.log(response.time_zone.current_time);
        console.log(response.isp);*/
        var browser;

        // browser
        if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
            browser = 'Opera';
        }
        else if (navigator.userAgent.indexOf("Chrome") != -1) {
            browser = 'Chrome';
        }
        else if (navigator.userAgent.indexOf("Safari") != -1) {
            browser = 'Safari';
        }
        else if (navigator.userAgent.indexOf("Firefox") != -1) {
            browser = 'Firefox';
        }
        else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) {
            browser = 'IE';
        }
        else {
            browser = 'unknown';
        }

        saveDataInDB(response, browser);
    }


    function saveDataInDB(response, browser) {

        $.ajax({
            type: "POST",
            url: "stats",
            data: {
                count_cvd: 0,
                ip: response.ip,
                continent_name: response.continent_name,
                country_code: response.country_code2,
                country_name: response.country_name,
                region_code: response.state_code,
                region_name: response.state_prov,
                time_zone_id: response.time_zone.name,
                time_now: response.time_zone.current_time,
                isp: response.isp,
                lat_log: response.latitude + ',' + response.longitude,
                browser: browser
            },
            //contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                switch (data['return']) {
                    case 6: //exists
                        console.log('Record exists');
                        break;
                    case 7: //db error
                        console.log('db error');
                        break;
                    case 8: //success
                        console.log('success');
                        break;
                }
            }
        });

        return false;
    }


    // Parallax
    var parallax = function () {
        $(window).stellar();
    };

    $(function () {
        parallax();
    });

    // AOS
    AOS.init({
        duration: 1200,
        //once: true,
        disable: 'mobile'
    });

    // Experiences
    $('#experience').find('svg').hover(function () {
        $('span').css('color', 'white');
    },
        function () {
            $('span').css('color', '#1b1b20');
        });

    $('#experience button').click(function () {
        window.open('Murali_Rajendran.pdf', '_blank');

        _ipgeolocation.getGeolocation(handleResponse, "2c99f72b55cf4cbc973a738689d677e0");
        _ipgeolocation.enableSessionStorage(true);
        function handleResponse(response) {
            /*console.log(response.latitude);
            console.log(response.longitude);
            console.log(response.ip);
            console.log(response.continent_name);
            console.log(response.country_code2);
            console.log(response.country_name);
            console.log(response.state_code);
            console.log(response.state_prov);
            console.log(response.time_zone.name);
            console.log(response.time_zone.current_time);
            console.log(response.isp);*/

            var browser;

            // browser
            if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
                browser = 'Opera';
            }
            else if (navigator.userAgent.indexOf("Chrome") != -1) {
                browser = 'Chrome';
            }
            else if (navigator.userAgent.indexOf("Safari") != -1) {
                browser = 'Safari';
            }
            else if (navigator.userAgent.indexOf("Firefox") != -1) {
                browser = 'Firefox';
            }
            else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) {
                browser = 'IE';
            }
            else {
                browser = 'unknown';
            }

            saveCVDInDB(response, browser);
        }

        return false;
    });


    function saveCVDInDB(response, browser) {

        $.ajax({
            type: "POST",
            url: "stats",
            data: {
                count_cvd: 1,
                ip: response.ip,
                continent_name: response.continent_name,
                country_code: response.country_code2,
                country_name: response.country_name,
                region_code: response.state_code,
                region_name: response.state_prov,
                time_zone_id: response.time_zone.name,
                time_now: response.time_zone.current_time,
                isp: response.isp,
                lat_log: response.latitude + ',' + response.longitude,
                browser: browser
            },
            dataType: "json",
            success: function (data) {
                switch (data['return']) {
                    case 6: //exists
                        console.log('Record exists');
                        break;
                    case 7: //db error
                        console.log('db error');
                        break;
                    case 8: //success
                        console.log('success');
                        break;
                }
            }
        });

        return false;
    }

    //skills
    var typed = new Typed(".js-text-animation", {
        strings: ["Technical Expertise", "Expert Knowledge", "Specialized Proficiency"],
        typeSpeed: 60,
        loop: true,
        backSpeed: 25,
        backDelay: 2500
    });

    // certifications isotope
    $('#certifications').waitForImages(function () {
        var $container = $('.certifications_container');
        $container.isotope({
            filter: '*',
        });

        $('.certifications_filter a').click(function () {
            $('.certifications_filter .active').removeClass('active');
            $(this).addClass('active');

            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 500,
                    animationEngine: "jquery"
                }
            });
            return false;
        });

        $('.certifications_container a').click(function () {

            var id = $(this).find('img').attr("id");
            if (id == 'cert1') { // AWS Cloud Practicioner
            } else if (id == 'cert2') {
                window.open('https://www.credly.com/badges/a9bcdf6a-0b4e-42ae-a0b3-3b49ba14c792/public_url', '_blank'); //AWS SA Associate
            } else if (id == 'cert3') {
                window.open('https://www.coursera.org/account/accomplishments/certificate/HEWUNZH49K7U', '_blank'); // GCP 

            } else if (id == 'cert4') {
                window.open('https://www.credly.com/badges/d626ea4e-def9-45f0-aa3a-0072512187d0/public_url', '_blank'); //AWS Solutions Architect Knowledge Badge
            } else if (id == 'cert5') {
                window.open('https://www.credly.com/badges/af688f09-d20d-4a84-a485-2f1b64270b1d/public_url', '_blank'); //AWS EKS Knowledge Badge
            } else if (id == 'cert6') {
                window.open('https://www.credly.com/badges/a89e5409-b200-4dc1-8cb0-aa3a8cae22e7/public_url', '_blank'); //AWS Serverless Technology Knowledge Badge
            } else if (id == 'cert7') {
                window.open('https://www.credly.com/badges/a6c4c19f-986b-4524-8130-0a58a7405de0/public_url', '_blank'); //AWS Compute Technology Knowledge Badge
            } else if (id == 'cert8') {
                window.open('https://www.credly.com/badges/b49af314-81f7-4e04-9135-4469c60e8f24/public_url', '_blank'); //AWS Networking Core Technology Knowledge Badge
            } else if (id == 'cert9') {
                window.open('https://www.credly.com/badges/9dae1464-2221-4757-986a-5600c3e08ee4/public_url', '_blank'); //AWS Migration Foundations Technology Knowledge Badge
            } else if (id == 'cert10') {
                window.open('https://www.credly.com/badges/583328b0-7ba9-422c-8048-b6ac7918b48d/public_url', '_blank'); //AWS Cloud Essentials Technology Knowledge Badge
            } else if (id == 'cert11') {
                window.open('https://www.credly.com/badges/d0e456a6-3fc7-4b6e-bb77-8ea8a69c5bcb/public_url', '_blank'); //AWS Data Migration Specialized Technology Knowledge Badge
            } else if (id == 'cert12') {
                window.open('https://www.credly.com/badges/d8fb599c-e63b-40e4-bd08-3d30737d778a/public_url', '_blank'); //AWS Data Protection and Disaster Recovery Specialized Technology Knowledge Badge
            } else if (id == 'cert13') {
                window.open('https://www.credly.com/badges/8efa4318-376a-4ff5-be06-2820dacfabcc/public_url', '_blank'); //AWS Storage Technologist Badge
            } else if (id == 'cert14') {
                window.open('https://www.credly.com/badges/2e5c0214-2beb-4101-8f9c-be5c37785879/public_url', '_blank'); //AWS Object Storage Specialized Technology Knowledge Badge
            } else if (id == 'cert15') {
                window.open('https://www.credly.com/badges/ed207e5a-1f21-4149-a80f-814d434bc674/public_url', '_blank'); //AWS Block Storage Specialized Technology Knowledge Badge
            } else if (id == 'cert16') {
                window.open('https://www.credly.com/badges/169d1488-8e5d-4724-aeff-d607f6c00abf/public_url', '_blank'); //AWS File Storage Specialized Technology Knowledge Badge
            } else if (id == 'cert17') {
                window.open('https://www.credly.com/badges/50567fe2-dd97-47b2-bd6b-a99f02aa2656/public_url', '_blank'); //AWS Storage Core Badge
            } else if (id == 'cert18') {
                window.open('https://www.credly.com/badges/30bf2484-59a3-4667-8694-7b23eb377462/public_url', '_blank'); //AWS Cloud Quest: Cloud Practitioner

            } else if (id == 'cert19') {
                window.open('https://app.thecloudbootcamp.com/certificates/schd1gc7oz', '_blank'); // Intensive Cloud Computing
            } else if (id == 'cert20') {
                window.open('http://www.zend.com/en/yellow-pages/ZEND019559', '_blank'); // ZEND PHP
            } else if (id == 'cert21') {
                window.open('https://www.udemy.com/certificate/UC-GFZNXDV5/', '_blank'); // Udemy UNIX and Linux
            } else if (id == 'cert22') { // Networking Essentials Microsoft Azure
            } else if (id == 'cert23') {
                window.open('https://www.linkedin.com/learning/certificates/cf9080d7255eb32e42bc9db88ce7fb6679fd260603e5184f5cb350ac9836f1cd?u=2111916', '_blank'); // DevOps With AWS - LinkedIn
            } else if (id == 'cert24') { // CS50's Programming-with-Python HarvardX
            }

            return false;

        });

    });


    $("#testimonial-slider").owlCarousel({
        items: 1,
        itemsDesktop: [1000, 1],
        itemsDesktopSmall: [979, 1],
        itemsTablet: [768, 1],
        pagination: true,
        navigation: true,
        navigationText: ["", ""],
        transitionStyle: "backSlide",
        //autoPlay:true,
        autoHeight: true,
        autoPlay: true,
        autoplayTimeout: 1000,
        autoplayHoverPause: true,
        slideSpeed: 300,
        paginationSpeed: 500
    });


    $('.social a').click(function () {

        var id = $(this).attr("class");
        if (id == 'linkedin') {
            window.open('https://www.linkedin.com/in/muralidharr/', '_blank');
        } else if (id == 'github') {
            window.open('https://github.com/CodeByMurali', '_blank');
        }
        // else if (id == 'gitlab') {
        // }
        // else if (id == 'youtube') {
        //     window.open('https://www.youtube.com/@RogerNem', '_blank');
        // }
        // else if (id == 'medium') {
        //     window.open('https://medium.com/@rogernem', '_blank');
        // }
        // else if (id == 'aws') {
        //     window.open('https://community.aws/@rogertn', '_blank');
        // }
        else if (id == 'pdf') {
            window.open('Murali_Rajendran.pdf', '_blank');
        }

        return false;

    });

});