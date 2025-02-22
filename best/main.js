document.addEventListener("DOMContentLoaded", function() {
    // CSS-Styles definieren
    const styles = `
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            transition: background-color 0.3s, color 0.3s;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        #leaderboard {
            width: 80%;
            margin: 40px auto;
            border-collapse: collapse;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        #leaderboard th, #leaderboard td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        #leaderboard tr:hover {
            background-color: #f1f1f1;
        }
        .fade-in {
            animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .dark-mode {
            background-color: #333;
            color: #f4f4f4;
        }
        .dark-mode .header {
            background-color: #444;
        }
        .dark-mode #leaderboard tr:hover {
            background-color: #555;
        }
    `;

    // Style-Element erstellen und zum Head hinzufügen
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // Header-Bereich erstellen
    const header = document.createElement("div");
    header.className = "header";
    const title = document.createElement("h1");
    title.textContent = "Bestenliste";
    const darkModeButton = document.createElement("button");
    darkModeButton.id = "darkModeToggle";
    darkModeButton.textContent = "Dark Mode";
    header.appendChild(title);
    header.appendChild(darkModeButton);
    document.body.appendChild(header);

    // Tabelle erstellen
    const table = document.createElement("table");
    table.id = "leaderboard";
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    ["Rang", "Held", "Punkte"].forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    const data = [
        { rank: 1, hero: "Aang", points: 1500 },
        { rank: 2, hero: "Katara", points: 1450 },
        { rank: 3, hero: "Toph", points: 1400 }
    ];
    data.forEach(item => {
        const row = document.createElement("tr");
        ["rank", "hero", "points"].forEach(key => {
            const td = document.createElement("td");
            td.textContent = item[key];
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    document.body.appendChild(table);

    // Dark Mode Funktionalität
    const body = document.body;
    if (localStorage.getItem("dark-mode") === "true") {
        body.classList.add("dark-mode");
    }
    darkModeButton.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        localStorage.setItem("dark-mode", body.classList.contains("dark-mode"));
    });
});
