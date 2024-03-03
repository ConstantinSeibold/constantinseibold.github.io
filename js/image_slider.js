var bannerStatus = 1;
var bannerTimer = 8000;
var manualNavigation = false;

window.onload = function() {
    // Uncomment the following line to start the banner loop
    var startBannerLoop = setInterval(function() {
        bannerLoop();
    }, bannerTimer);

    document.getElementById("main-banner").onmouseenter = function() {
        // Uncomment the following line to pause the banner loop on mouse enter
        clearInterval(startBannerLoop);
        manualNavigation = true;
    }

    document.getElementById("main-banner").onmouseleave = function() {
        // Uncomment the following line to resume the banner loop on mouse leave
        startBannerLoop = setInterval(function() {
            bannerLoop();
        }, bannerTimer);
        manualNavigation = false;
    }
}


window.onload = function() {
    var startBannerLoop = setInterval(function() {
        bannerLoop();
    }, bannerTimer);

    document.getElementById("main-banner").onmouseenter = function() {
        clearInterval(startBannerLoop);
    }

    document.getElementById("main-banner").onmouseleave = function() {
        startBannerLoop = setInterval(function() {
            bannerLoop();
        }, bannerTimer);
    }
}

// Function to change the banner manually based on radio button selection
function changeBanner(index) {
    document.getElementById("radio" + index).checked = true;
    bannerStatus = index;
    bannerLoop();
}

function bannerLoop() {
    var totalBanners = 5; // Total number of banners

    
    if (manualNavigation) {
        return;
    }

    document.getElementById("radio" + bannerStatus).checked = true;
    // Fade out the current banner
    document.getElementById("imgban" + bannerStatus).style.opacity = "0";
    
    requestAnimationFrame(function() {
        // Move banners to their positions
        for (var i = 1; i <= totalBanners; i++) {
            var currentBanner = document.getElementById("imgban" + i);
            if (i === bannerStatus) {
                currentBanner.style.transition = "right 0.5s ease-out, opacity 0.5s ease-out";
                currentBanner.style.right = "0px";
                currentBanner.style.zIndex = "10";
            } else {
                currentBanner.style.transition = "right 0.5s ease-out, opacity 0.5s ease-out";
                currentBanner.style.right = "100%";
                currentBanner.style.zIndex = (i > bannerStatus) ? "5" : "15";
            }
        }

        requestAnimationFrame(function() {
            // Fade in the next banner
            document.getElementById("imgban" + bannerStatus).style.opacity = "1";
        });
        
    });

    // Update bannerStatus for the next iteration
    bannerStatus = (bannerStatus % totalBanners) + 1;

    setTimeout(function() {
        for (var i = 1; i <= totalBanners; i++) {
            var currentBanner = document.getElementById("imgban" + i);
            currentBanner.style.transition = "none";
        }
    }, 1000);

    

}
