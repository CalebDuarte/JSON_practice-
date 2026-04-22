// ── Our car data as a plain JavaScript array ──
    // This represents the data we would receive from a server as JSON

    let cars = [
      { make: "Dodge",     model: "Challenger", year: 2023, color: "Orange", turbo: false, notes: null },
      { make: "Ford",      model: "Mustang",    year: 2022, color: "Red",    turbo: false, notes: null },
      { make: "Chevrolet", model: "Camaro",     year: 2021, color: "Yellow", turbo: true,  notes: null }
    ];


    // ── Section 1: Show what our data looks like as a JSON string ──
    document.getElementById("rawJSON").textContent = JSON.stringify(cars, null, 2);


    // ── Section 2 & 3: Display the cars and show the JSON string ──
    function displayCars() {

      let carList = document.getElementById("carList");
      carList.innerHTML = "";

      for (let i = 0; i < cars.length; i++) {
        let car = cars[i];

        let card = document.createElement("div");
        card.className = "car-card";
        card.innerHTML =
          "<strong>" + car.make + " " + car.model + "</strong><br>" +
          "Year: "  + car.year  + "<br>" +
          "Color: " + car.color + "<br>" +
          "Turbo: " + car.turbo + "<br>" +
          "Notes: " + car.notes;

        carList.appendChild(card);
      }

      // Update the JSON.stringify output box
      document.getElementById("updatedJSON").textContent = JSON.stringify(cars, null, 2);
    }

    displayCars();


    // ── Section 3: Add a new car ──
    function addCar() {
      let make  = document.getElementById("make").value;
      let model = document.getElementById("model").value;
      let year  = document.getElementById("year").value;
      let color = document.getElementById("color").value;

      if (!make || !model || !year) {
        document.getElementById("message").textContent = "⚠️ Please fill in all fields!";
        return;
      }

      let newCar = {
        make:  make,
        model: model,
        year:  parseInt(year),
        color: color,
        turbo: false,
        notes: null
      };

      cars.push(newCar);
      document.getElementById("message").textContent = "✅ " + make + " " + model + " added!";
      displayCars();
    }


    // ── Section 4: Reviver function demo ──
    let carWithDate = { make: "Ferrari", model: "F40", sold: new Date("1992-05-01") };

    // Stringify the object — the Date becomes a plain string
    let jsonWithDate = JSON.stringify(carWithDate);

    // Parse WITHOUT a reviver — sold stays a string
    let noReviver = JSON.parse(jsonWithDate);

    document.getElementById("withoutReviver").textContent =
      "typeof sold: " + typeof noReviver.sold + "\n" +
      "value:       " + noReviver.sold;

    // Parse WITH a reviver — sold gets converted back to a real Date
    let withReviver = JSON.parse(jsonWithDate, function(key, value) {
      if (key === "sold") return new Date(value);
      return value;
    });

    document.getElementById("withReviver").textContent =
      "typeof sold: " + typeof withReviver.sold + "\n" +
      "value:       " + withReviver.sold;

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>JSON Car Garage</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 900px;
      margin: 30px auto;
      padding: 0 20px;
      background: #f0f0f0;
    }

    h1 { text-align: center; }

    h2 { color: #333; }

    .container {
      display: flex;
      gap: 20px;
    }

    .left-panel {
      flex: 1;
    }

    .right-panel {
      width: 320px;
      background: #222;
      color: #7ec8e3;
      padding: 14px;
      border-radius: 6px;
      font-family: monospace;
      font-size: 12px;
      white-space: pre-wrap;
      height: fit-content;
    }

    .car {
      background: white;
      border: 1px solid #ccc;
      border-radius: 6px;
      padding: 12px 16px;
      margin-bottom: 10px;
    }

    .car h3 { margin: 0 0 6px 0; }

    .buttons { margin-bottom: 16px; }

    button {
      background: #333;
      color: white;
      border: none;
      padding: 8px 16px;
      font-size: 14px;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 8px;
      margin-bottom: 8px;
    }

    button:hover { background: #555; }

    input, select {
      display: block;
      width: 100%;
      padding: 8px;
      margin: 4px 0 12px 0;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }

    label { font-weight: bold; font-size: 14px; }

    .form-section {
      background: white;
      border: 1px solid #ccc;
      border-radius: 6px;
      padding: 16px;
      margin-top: 20px;
    }

    #message { color: green; font-weight: bold; }
  </style>
</head>
<body>

  <h1>🚗 JSON Car Garage</h1>

  <div class="container">

    <!-- Left: Car display and form -->
    <div class="left-panel">

      <div class="buttons">
        <button id="showAll">Show All Cars</button>
        <button id="showAmerican">American</button>
        <button id="showJapanese">Japanese</button>
        <button id="showEuropean">European</button>
      </div>

      <div id="carView"></div>

      <!-- Add a new car form -->
      <div class="form-section">
        <h2>Add a New Car</h2>

        <label>Car Name</label>
        <input type="text" id="carName" placeholder="e.g. Mustang GT" />

        <label>Origin (american, japanese, european)</label>
        <input type="text" id="originType" placeholder="e.g. american" />

        <label>Features (comma separated)</label>
        <input type="text" id="features" placeholder="e.g. V8 Engine, AWD, Sunroof" />

        <label>Description</label>
        <input type="text" id="description" placeholder="e.g. A classic American muscle car." />

        <button id="addCar">Add Car</button>
        <p id="message"></p>
      </div>

    </div>

    <!-- Right: JSON view -->
    <div>
      <h2>JSON Data</h2>
      <div class="right-panel" id="jsonView"></div>
    </div>

  </div>


  <script>

    // ── Step 1: Create our car data as a JavaScript object ──
    let carsData = {
      "american": [
        {
          "name": "Dodge Challenger",
          "features": ["V8 Engine", "RWD", "Muscle Car"],
          "description": "A classic American muscle car with a powerful V8."
        }
      ],
      "japanese": [
        {
          "name": "Toyota Supra",
          "features": ["Inline-6 Engine", "RWD", "Turbo"],
          "description": "A legendary Japanese sports car known for its speed."
        }
      ],
      "european": [
        {
          "name": "Porsche 911",
          "features": ["Flat-6 Engine", "AWD", "Sports Car"],
          "description": "An iconic German sports car built for performance."
        }
      ]
    };

    // ── Step 2: Convert the object to a JSON string ──
    let carsJSON = JSON.stringify(carsData, null, 2);


    // ── updateJSONView: Show the current JSON string on the page ──
    function updateJSONView() {
      document.getElementById("jsonView").textContent = carsJSON;
    }


    // ── createCarElement: Build and return an HTML card for one car ──
    function createCarElement(car) {
      let carEl = document.createElement("div");
      carEl.className = "car";

      let nameEl = document.createElement("h3");
      nameEl.textContent = car.name;
      carEl.appendChild(nameEl);

      let featuresEl = document.createElement("p");
      featuresEl.innerHTML = "<strong>Features:</strong> " + car.features.join(", ");
      carEl.appendChild(featuresEl);

      let descEl = document.createElement("p");
      descEl.innerHTML = "<strong>Description:</strong> " + car.description;
      carEl.appendChild(descEl);

      return carEl;
    }


    // ── displayAllCars: Parse JSON and show every car on the page ──
    function displayAllCars() {
      let carView = document.getElementById("carView");
      carView.innerHTML = "";

      // Parse the JSON string back into a JavaScript object
      const cars = JSON.parse(carsJSON);

      // Loop through each origin type
      for (const origin in cars) {
        let titleEl = document.createElement("h2");
        titleEl.textContent = origin.charAt(0).toUpperCase() + origin.slice(1) + " Cars";
        carView.appendChild(titleEl);

        // Loop through each car in that origin
        cars[origin].forEach(function(car) {
          let carEl = createCarElement(car);
          carView.appendChild(carEl);
        });
      }
    }


    // ── displayByOrigin: Show only cars from one origin type ──
    function displayByOrigin(originType) {
      let carView = document.getElementById("carView");
      carView.innerHTML = "";

      // Parse the JSON string back into a JavaScript object
      const cars = JSON.parse(carsJSON);

      if (cars[originType]) {
        let titleEl = document.createElement("h2");
        titleEl.textContent = originType.charAt(0).toUpperCase() + originType.slice(1) + " Cars";
        carView.appendChild(titleEl);

        cars[originType].forEach(function(car) {
          let carEl = createCarElement(car);
          carView.appendChild(carEl);
        });

      } else {
        carView.textContent = "No cars found for this origin type.";
      }
    }


    // ── addNewCar: Read the form, build a new car object, add it to JSON ──
    function addNewCar() {
      let name        = document.getElementById("carName").value.trim();
      let originType  = document.getElementById("originType").value.trim().toLowerCase();
      let features    = document.getElementById("features").value.split(",").map(function(item) { return item.trim(); });
      let description = document.getElementById("description").value.trim();

      if (!name || !originType || features.length === 0 || !description) {
        alert("Please fill out all fields!");
        return;
      }

      // Build a new car object
      let newCar = {
        "name":        name,
        "features":    features,
        "description": description
      };

      // Parse the current JSON string
      const cars = JSON.parse(carsJSON);

      // If this origin type doesn't exist yet, create it
      if (!cars[originType]) {
        cars[originType] = [];
      }

      // Add the new car
      cars[originType].push(newCar);

      // Update the JSON string
      carsJSON = JSON.stringify(cars, null, 2);

      // Refresh both panels
      updateJSONView();
      displayAllCars();

      // Clear the form
      document.getElementById("carName").value    = "";
      document.getElementById("originType").value = "";
      document.getElementById("features").value   = "";
      document.getElementById("description").value = "";

      document.getElementById("message").textContent = "✅ " + name + " added!";
    }


    // ── Event Listeners ──
    document.getElementById("showAll").addEventListener("click", displayAllCars);

    document.getElementById("showAmerican").addEventListener("click", function() {
      displayByOrigin("american");
    });

    document.getElementById("showJapanese").addEventListener("click", function() {
      displayByOrigin("japanese");
    });

    document.getElementById("showEuropean").addEventListener("click", function() {
      displayByOrigin("european");
    });

    document.getElementById("addCar").addEventListener("click", addNewCar);


    // ── Initialize: Run these when the page first loads ──
    updateJSONView();
    displayAllCars();

  </script>

</body>
</html>
