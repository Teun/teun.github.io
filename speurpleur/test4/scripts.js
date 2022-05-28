function geoFindMe(status, resultFound, resultNotFound, lat, lng, letter, nextLetter) {
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
        const track = `<p>Punt <span class="blue">${letter}</span></p><p>is op ${dist} meter</p><p>in richting <span class="compass">${dir}</span>.</p>`;
        const extra = `        <p>[accuracy: ${position.coords.accuracy}, speed: ${position.coords.speed}, direction: ${position.coords.heading}]</p>`;
        status.innerHTML = icons + track + extra;
    }

    function error() {
        status.textContent = 'Unable to retrieve your location';
    }
    function endSearch(){
        navigator.geolocation.clearWatch(watch);
        status.innerHTML = `<p>Punt <span class="blue">${letter}</span></p><p>GEVONDEN</p>`;
        resultFound.style.display = 'block';
        resultNotFound.style.display = 'none';
    }

    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
    } else {
        status.textContent = 'Locating…';
        resultNotFound.style.display = 'block';
        watch = navigator.geolocation.watchPosition(success, error);
    }

}
function getIconsFor(coords, curr, target) {
    if (coords.accuracy > 20) return "Status: Zwak GPS signaal";
    var walker = String.fromCodePoint(0x1f9cd);
    if (coords.speed > .5) walker = String.fromCodePoint(0x1f6b6);
    if (coords.speed > 1.2) walker = String.fromCodePoint(0x1f3c3);

    return `Status: ${walker}`;
}