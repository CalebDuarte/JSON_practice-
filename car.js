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