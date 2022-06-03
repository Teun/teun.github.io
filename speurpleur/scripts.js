function pageInit(lat, lng, letter, nextLetter) {
    const status = document.querySelector('#status');
    const found = document.querySelector('.result>#found');
    const nextBlock = document.querySelector('.result>#next');
    const notFound = document.querySelector('.result>#notFound');
    geoFindMe(status, found, notFound, nextBlock, lat, lng, letter, nextLetter);
}

function geoFindMe(status, resultFound, resultNotFound, nextBlock, lat, lng, letter, nextLetter) {
    const target = {latitude: lat, longitude: lng};
    var watch = 0;

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const curr = {latitude, longitude};
        
        const dist = window.geolib.getDistance(curr, target, accuracy = 1);

        if(dist <= 15) {
            endSearch();
            return;
        }
        const dir = window.geolib.getCompassDirection(curr, target);
        const icons = getIconsFor(position.coords, curr, target);
        const track = `<p>Punt <span class="red">${letter}</span></p><p>is op ${dist} meter</p><p>in richting <span class="compass">${dir}</span>.</p>`;
        const extra = `        <p>[accuracy: ${position.coords.accuracy}, speed: ${position.coords.speed}, direction: ${position.coords.heading}]</p>`;
        status.innerHTML = icons + track; // + extra;
    }

    function error() {
        status.textContent = 'Unable to retrieve your location';
    }
    function endSearch(){
        navigator.geolocation.clearWatch(watch);
        status.innerHTML = `<p>Punt <span class="red">${letter}</span></p><p>GEVONDEN</p>`;
        resultFound.style.display = 'block';
        resultNotFound.style.display = 'none';

        nextBlock.style.display = 'block';
        if(nextLetter)
            nextBlock.innerHTML = `<p>Ga nu naar punt <span class="red">${nextLetter}</span></p>`;
    }

    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
    } else {
        status.textContent = 'Locating…';
        resultNotFound.style.display = 'block';
        watch = navigator.geolocation.watchPosition(success, error);
    }
    resultNotFound.addEventListener('click', endSearch);

}
function getIconsFor(coords, curr, target) {
    if (coords.accuracy > 20) return "Status: Zwak GPS signaal";
    return "";
}