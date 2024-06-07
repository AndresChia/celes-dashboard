export const HandleLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((location) => {
            debugger
        }, (error) => {
            debugger
        });
    } else {
        console.log("Geolocation not supported");
    }
}