let hamburger = document.querySelector('.hamburger');
if (hamburger) {
    hamburger.addEventListener('click', function (event) {
        document.querySelector('.mobile-nav').classList.toggle('hidden');
    });
    
}

let slider = document.querySelector('.slider');
if (slider) {
    let dots = slider.querySelectorAll('.slider-dots__dot');
    dots.forEach(item => {
        item.addEventListener('click', clickDotBanner);
    });

    function clickDotBanner() {
        let index = this.id.split('_');

        let banner = slider.querySelector('#banner_' + index[1]);
        if (banner) {
            slider.querySelectorAll('.slider-dots__dot').forEach(item => {
                item.classList.remove('active');
            });
            slider.querySelectorAll('.slider-banners__img').forEach(item => {
                item.classList.remove('active');
            });
            banner.classList.add('active');
            this.classList.add('active');
        }
    }
}

