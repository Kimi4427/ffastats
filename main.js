let fetchTimeout;
let hasFetchedStats = false; 

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
