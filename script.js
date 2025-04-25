document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        var floatingSquare = document.querySelector('.tbar');
        var scrollPosition = window.scrollY;

        var stopScrollPosition = window.innerHeight * 0.72;

        var distanceMoved = Math.min(scrollPosition, stopScrollPosition);

        var stopThreshold = floatingSquare.offsetHeight * 0.72;

        if (distanceMoved < stopThreshold) {
            floatingSquare.style.top = -distanceMoved + 'px';
        } else {
            floatingSquare.style.top = -stopThreshold + 'px';
        }
    });

    var movobj = document.getElementById('srch1');
    
    var strps = window.innerHeight * 0.01;
    
    function UpdateSpos(){
        var stppos = (13 / 100) * window.innerHeight;
        var scrpos = window.scrollY;
        var dtos = stppos - scrpos;
        var newtop = Math.max(dtos, strps) + 'px';
        movobj.style.top = newtop;
    }
    UpdateSpos()
    window.addEventListener('orientationchange', function(){
        setTimeout(UpdateSpos, 100);
    });
    window.addEventListener('scroll', UpdateSpos);
    

    var triggerDiv = document.getElementById('srch1');
    var searchBar = document.querySelector('.fsb');

    searchBar.style.opacity = '0';
    searchBar.style.pointerEvents = 'none';

    var searchBarVisible = false;

    triggerDiv.addEventListener('click', function(event) {
        event.stopPropagation();
        
        if (!searchBarVisible) {
            searchBar.style.opacity = '1';
            searchBar.style.pointerEvents = 'auto';
            searchBar.querySelector('input').focus();
            document.body.classList.add('blur');
            var ovl = document.getElementById('overlayout')
            ovl.style.display = 'block';
        } else {
            searchBar.style.opacity = '0';
            searchBar.style.pointerEvents = 'none';
            searchBarVisible = false;
            searchBar.querySelector('input').value = '';
            searchBar.querySelector('input').blur();
            document.body.classList.remove('blur');
            var ovl = document.getElementById('overlayout')
            ovl.style.display = 'none';
        }
        
        searchBarVisible = !searchBarVisible;
    });

    document.addEventListener('click', function(event) {
        if (!searchBar.contains(event.target) && searchBarVisible) {
            searchBar.style.opacity = '0';
            searchBar.style.pointerEvents = 'none';
            searchBarVisible = false;
            searchBar.querySelector('input').value = '';
            searchBar.querySelector('input').blur();
            document.body.classList.remove('blur');
            var ovl = document.getElementById('overlayout')
            ovl.style.display = 'none';
        }
    });

    function togMenu() {
        var menu = document.getElementById('menu');
        if (menu.style.display === 'none' || menu.style.display === '') {
            menu.style.display = 'block';
            menu.style.position = 'fixed';
            menu.style.top = '0';
            menu.style.left = '0';
        } else {
            menu.style.display = 'none';
        }
    }

    var menuu = document.querySelector(".menuu");
    menuu.addEventListener('click', togMenu);
    
    function menuclose() {
        var menu = document.getElementById('menu');
        menu.classList.add('closing-animation');
        setTimeout(function() {
            menu.style.display = 'none';
            document.getElementById('tb2').value = "";
            menu.classList.remove('closing-animation');
        }, 500);
    }

    var closemenu = document.getElementById("closemenu");
    closemenu.addEventListener('click', menuclose); 
    
    
    let container = document.getElementById('container');
    let currentIndex = 0;
    let xStart = null;
    let numPages = document.querySelectorAll('.page').length;
    
    let firstPageClone = document.getElementById('page1').cloneNode(true);
    container.appendChild(firstPageClone);
    
    container.addEventListener('touchstart', handleTouchStart, false);
    container.addEventListener('touchmove', handleTouchMove, false);
    container.addEventListener('touchend', handleTouchEnd, false);
    
    function handleTouchStart(event) {
        xStart = event.touches[0].clientX;
    }
    
    function handleTouchMove(event) {
        if (!xStart) {
            return;
        }
        
        let xEnd = event.changedTouches[0].clientX;
        let xDiff = xEnd - xStart;
        
        container.style.transition = 'none'; // Disable transition for smooth dragging
        container.style.transform = `translateX(calc(-${currentIndex * 100}% + ${xDiff}px))`;
    }
    
    function handleTouchEnd(event) {
        if (!xStart) {
            return;
        }
        let xEnd = event.changedTouches[0].clientX;
        let xDiff = xEnd - xStart;
        
        var baar = document.getElementById("sbar");
        if (xDiff > 50 && currentIndex > 0) {
            currentIndex--;
        } else if (xDiff < -50 && currentIndex < numPages) {
            currentIndex++;
        }
        if (currentIndex === 0){
            baar.style.width = "33%";
        } else if (currentIndex === 1){
            baar.style.width = "66%";
        } else if (currentIndex === 2){
            baar.style.width = "99%";
        } else if (currentIndex === 3){
            baar.style.width = "100px";
        }
        container.style.transition = 'transform 0.3s ease'; // Restore transition
        container.style.transform = `translateX(-${currentIndex * 100}%)`;

        xStart = null;
        
        if (currentIndex === numPages) {
            setTimeout(() => {
                currentIndex = 0;
                container.style.transition = 'none';
                container.style.transform = `translateX(-${currentIndex * 100}%)`;
                setTimeout(() => {
                    container.style.transition = 'transform 0.3s ease';
                }, 50);
            }, 300); // Wait for transition to complete
        }
    }
    
    const container1 = document.getElementById('container1');
    const progressBar1 = document.getElementById('sbar1');
    
    container1.addEventListener('scroll', () => {
        const scrollLeft = container1.scrollLeft;
        const scrollWidth = container1.scrollWidth;
        const clientWidth = container1.clientWidth;

        const scrollPercent1 = (scrollLeft / (scrollWidth - clientWidth)) * 100;
        progressBar1.style.width = Math.min(33 + scrollPercent1, 100) + '%';
    });
});