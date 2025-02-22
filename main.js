

var input = document.querySelectorAll("input")[0];
input.select(); 
input.value = "";

var texts = ["NoRiskk", "KimiKaccess", "Aim_Shock", "AAirCrafter", "BigBrainRobin29", "ltsonyxx", "BestAuto", "Winniepat", "bybmfr", "bread", "//////////////////////////////////////////"]; 
var currentTextIndex = 1;
var l = texts[currentTextIndex].length;
var current = 0;
var time = 50;
var userTyping = false;

input.addEventListener("input", function() {
  userTyping = true;
});

var write_text = function() {
  if (userTyping) return; 
  
  input.value += texts[currentTextIndex][current];
  if (current < l - 1) {
    current++;
    setTimeout(write_text, time);
  } else {
    setTimeout(delete_text, 2500); 
  }
};

var delete_text = function() {
  if (userTyping) return;
  
  input.value = "";
  currentTextIndex = (currentTextIndex + 1) % texts.length; 
  current = 0;
  l = texts[currentTextIndex].length;
  setTimeout(write_text, time);
};

setTimeout(write_text, time);

let fetchTimeout;
let hasFetchedStats = false; 
document.addEventListener("keypress", function(event) {
  if (event.keyCode == 45) {
	const element = document.getElementById("playerSkin");
element.remove();
    alert('Skins are now hidden');
  }
});
document.addEventListener("keypress", function(event) {
  if (event.keyCode == 35) {
	   var element = document.body;
   element.classList.toggle("dark-mode");
  }
});
document.addEventListener("keypress", function(event) {
  if (event.keyCode == 44) {
window.open("/ffastats/c/r/e/d/i/t/s.html"); 
  }
  });
document.addEventListener("keypress", function(event) {
  if (event.keyCode == 43) {
var myWindow = window.open("", "MsgWindow", "width=1280,height=720");
  if (myWindow) {
    myWindow.document.write(`
      <html>
      <head>
        <title>haha</title>
      <style>
      audio { display:none;}
      iframe { display:block;}
      </style>
      </head>
      <body style="margin:0;overflow:hidden;">
      <iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <audio autoplay="true" src="https://kimi4427.github.io/ffastats/music.mp3">
      </body>
      </html>
    `);
    popup.blur();
window.focus();
    myWindow.document.close();
  } else {
    alert("Erlaube bitte Pop-ups für diese Seite.");
  }
}

  });
document.getElementById("uuidInput").addEventListener("input", function () {
    clearTimeout(fetchTimeout);
    hasFetchedStats = false; 

    fetchTimeout = setTimeout(fetchStats, 500); 
});

async function fetchStats() {
    if (hasFetchedStats) return; 

    let input = document.getElementById("uuidInput").value.trim();
    if (!input) return;

    let uuid = input;
    const uuidPattern = /^[0-9a-fA-F]{32}$|^[0-9a-fA-F-]{36}$/;

    if (!uuidPattern.test(input)) {
        try {
            const response = await fetch(`https://api.ashcon.app/mojang/v2/user/${input}`);
            if (!response.ok) throw new Error("Spieler nicht gefunden.");
            const data = await response.json();
            uuid = data.uuid;
        } catch (error) {
            mtoast("Fehler: " + error.message);
            return;
        }
    }

    document.getElementById('playerSkin').src = `https://www.mc-heads.net/body/${uuid}`;

    const apiUrl = `https://api.hglabor.de/stats/ffa/${uuid}`;
    const loadingElement = document.getElementById('loading');
    const table = document.getElementById('statsTable');
    const statsBody = document.getElementById('statsBody');

    loadingElement.style.display = 'block';
    table.style.display = 'none';
    statsBody.innerHTML = '';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Spieler nicht gefunden!");

        const data = await response.json();
        const stats = [
            { name: 'XP', value: data.xp },
            { name: 'Kills', value: data.kills },
            { name: 'Tode', value: data.deaths },
            { name: 'Aktuelle Killstreak', value: data.currentKillStreak },
            { name: 'Höchste Killstreak', value: data.highestKillStreak },
        ];

        stats.forEach(stat => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${stat.name}</td><td>${stat.value}</td>`;
            statsBody.appendChild(row);
        });

        if (data.heroes) {
            for (const [hero, abilities] of Object.entries(data.heroes)) {
                for (const [ability, attributes] of Object.entries(abilities)) {
                    for (const [attribute, details] of Object.entries(attributes)) {
                        const row = document.createElement('tr');
                        row.innerHTML = `<td>${hero} - ${ability} - ${attribute}</td><td>${details.experiencePoints}</td>`;
                        statsBody.appendChild(row);
                    }
                }
            }
        }

        table.style.display = 'table';
        hasFetchedStats = true; 
    } catch (error) {
        mtoast("Fehler: " + error.message);
    } finally {
        loadingElement.style.display = 'none';
    }
}

        function sortTable(columnIndex) {
            const table = document.getElementById('statsTable');
            const rows = Array.from(table.rows).slice(1);
            const isAscending = table.getAttribute('data-sort-order') === 'asc';
            const direction = isAscending ? 1 : -1;

            rows.sort((a, b) => {
                const aText = a.cells[columnIndex].textContent.trim();
                const bText = b.cells[columnIndex].textContent.trim();
                return aText.localeCompare(bText, undefined, { numeric: true }) * direction;
            });

            rows.forEach(row => table.appendChild(row));
            table.setAttribute('data-sort-order', isAscending ? 'desc' : 'asc');
        }
function sortTable(columnIndex) {
    const table = document.getElementById("statsTable");
    const tbody = document.getElementById("statsBody");
    const rows = Array.from(tbody.rows);
    
    const isNumericColumn = rows.every(row => !isNaN(row.cells[columnIndex].innerText.trim()));
    
    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].innerText.trim();
        const cellB = rowB.cells[columnIndex].innerText.trim();

        if (isNumericColumn) {
            return parseFloat(cellA) - parseFloat(cellB);
        } else {
            return cellA.localeCompare(cellB, 'de', { sensitivity: 'base' });
        }
    });
    
    tbody.innerHTML = "";
    rows.forEach(row => tbody.appendChild(row));
}
