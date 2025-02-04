// Function to get the number of bathrooms selected
function getBathValue() {
    var uiBathrooms = $("[name='uiBathrooms']");
    for (var i in uiBathrooms) {
        if (uiBathrooms[i].checked) {
            return parseInt(i) + 1; //get no. of bathrooms
        }
    }
    return -1; //Invalid inputs
}

// Function to get the number of BHK selected
function getBHKValue() {
    var uiBHK = $("[name='uiBHK']");
    for (var i in uiBHK) {
        if (uiBHK[i].checked) {
            return parseInt(i) + 1; // get no. of bhk
        }
    }
    return -1; // Invalid inputs
}

// Function to handle the price estimation on button click
function onClickedEstimatePrice() {
    console.log("estimate button clicked");

    var totalSqft = document.getElementById('uiSqft').value;
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById('uiLocations').value;
    const estPrice = document.getElementById('uiEstimatedPrice');

    // Validate form inputs before making the request
    if (!totalSqft || !bhk || !bathrooms || !location) {
        alert("Please fill in all fields.");
        return;
    }

    // The correct URL for local Flask server
    //const url = "http://127.0.0.1:5000/predict_home_price"; // Flask server URL
    var url = "/api/predict_home_price";
    // Sending POST request to the Flask backend
    $.post(url, {
        total_sqft: parseFloat(totalSqft),
        bhk: bhk,
        bath: bathrooms,
        location: location
    }, function(data, status) {
        console.log(data.estimated_price);
        // Display the estimated price
        estPrice.innerHTML = "<h2>Rs. " + data.estimated_price.toString() + " Lakhs</h2>";
        console.log(status);
    }).fail(function(error) {
        alert('Error: ' + error.responseText);
    });
}

// Function to load location data into the dropdown
function onPageLoad() {
    console.log("loaded document");

    // URL for fetching location data from the backend
    //const url = "http://127.0.0.1:5000/get_location_name"; // Flask server URL
    var url ="/api/get_location_name";
    // Making GET request to the Flask backend for locations
    $.get(url, function(data, status) {
        console.log("got locations");

        if (data && data.location) {
            const locations = data.location;
            const uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty(); // Clear the dropdown before adding options

            // Populate dropdown with locations
            for (var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    }).fail(function(error) {
        alert('Error fetching locations: ' + error.responseText);
    });
}

// Load the locations when the page is loaded
window.onload = onPageLoad;
