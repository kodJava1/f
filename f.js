(function() {
    console.log("Script başlatıldı");
    
    if (window.goalCancellationMonitorActive) {
      console.log("Script zaten çalışıyor");
      return;
    }
    
    window.goalCancellationMonitorActive = true;
    
    function getMemoryUsage() {
      if (window.performance && window.performance.memory) {
        const memory = window.performance.memory;
        const usedMB = Math.round(memory.usedJSHeapSize / 1048576); 
        return `${usedMB} MB`;
      }
      return "Bellek bilgisi alınamadı";
    }
    
    function updateMemoryUsage(memoryElement) {
      if (memoryElement) {
        memoryElement.textContent = `Bellek kullanımı: ${getMemoryUsage()}`;
      }
      
      const originalTitle = document.title.split(" | ")[0] || "Live Bets";
      document.title = `${originalTitle} | Bellek kullanımı: ${getMemoryUsage()}`;
    }
    
    function showNotification(teams, prevScore, newScore) {
      const notification = document.createElement('div');
      notification.id = 'goalCancellationNotification';
      notification.style.position = 'fixed';
      notification.style.top = '0';
      notification.style.left = '0';
      notification.style.width = '100%';
      notification.style.background = 'rgba(255, 0, 0, 0.9)';
      notification.style.color = 'white';
      notification.style.padding = '1vw';
      notification.style.zIndex = '10000';
      notification.style.fontSize = '2vw';
      notification.style.fontWeight = 'bold';
      notification.style.textAlign = 'center';
      notification.style.boxShadow = '0 0 2vw rgba(0, 0, 0, 0.5)';
      notification.style.animation = 'fadeInOut 10s forwards'; 
      
      notification.innerHTML = `
        <div>⚠️ GOL SİLİNDİ! ⚠️</div>
        <div style="font-size:1.5vw; margin-top:0.5vw;">${teams}</div>
        <div style="font-size:1.5vw; margin-top:0.5vw;">${prevScore} → ${newScore}</div>
      `;
      
      const style = document.createElement('style');
      style.textContent = `
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(-100%); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-100%); }
        }
      `;
      document.head.appendChild(style);
      
      document.body.appendChild(notification);
      
      setTimeout(() => {
        if (notification && notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 10000);
    }
    
    function createTable() {    
      
      const existingTable = document.getElementById('goalCancellationTable');
      if (existingTable) {
        existingTable.parentNode.removeChild(existingTable);
      }
      
      const style = document.createElement('style');
      style.textContent = `
        #goalCancellationTable {
          position: fixed;
          top: 2vh;
          right: 2vw;
          z-index: 9999;
          background: #fff;
          border: 0.2vw solid red;
          padding: 1vw;
          width: 25vw;
          max-height: 40vh;
          overflow: auto;
          box-shadow: 0 0 1vw rgba(0, 0, 0, 0.5);
          font-size: 1.50vw;
          border-radius: 0.5vw;
          resize: both;
          overflow: auto;
        }
        
        #goalCancellationHeader {
          padding: 0.5vw;
          margin-bottom: 1vh;
          background: #f0f0f0;
          border-radius: 0.3vw;
          cursor: move;
          text-align: center;
          color: red;
          font-weight: bold;
          font-size: 1.3vw;
          display: flex;
          justify-content: center;
          align-items: center;
          user-select: none;
        }
        
        #goalCancellationTable .resizer {
          width: 1vw;
          height: 1vw;
          background: red;
          position: absolute;
          right: 0;
          bottom: 0;
          cursor: nwse-resize;
        }
        
        #goalCancellationTable table {
          width: 100%;
          border-collapse: collapse;
        }
        
        #goalCancellationTable th, #goalCancellationTable td {
          border: 1px solid #ccc;
          padding: 0.35vw;
          text-align: center;
        }
      `;
      document.head.appendChild(style);
      
      const table = document.createElement('div');
      table.id = 'goalCancellationTable';
      
      const header = document.createElement('div');
      header.id = 'goalCancellationHeader';
      
      const titleText = document.createElement('span');
      titleText.textContent = 'Gol Geri Alma';
      
      const memoryInfo = document.createElement('div');
      memoryInfo.style.fontSize = '0.7vw';
      memoryInfo.style.color = '#666';
      memoryInfo.style.marginTop = '0.3vw';
      memoryInfo.textContent = `Bellek kullanımı: ${getMemoryUsage()}`;
      
      const titleContainer = document.createElement('div');
      titleContainer.style.display = 'flex';
      titleContainer.style.flexDirection = 'column';
      titleContainer.style.alignItems = 'center';
      titleContainer.appendChild(titleText);
      titleContainer.appendChild(memoryInfo);
      
      header.appendChild(titleContainer);
      
      setInterval(() => updateMemoryUsage(memoryInfo), 3000);
      
      const content = document.createElement('div');
      content.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>Zaman</th> 
              <th>Ev Sahibi</th>
              <th>Deplasman</th>
              <th>Önceki</th>
              <th>Yeni</th>
            </tr>
          </thead>
          <tbody id="goalCancellationTableBody">
          </tbody>
        </table>
      `;
      
      const resizer = document.createElement('div');
      resizer.className = 'resizer';
      
      table.appendChild(header);
      table.appendChild(content);
      table.appendChild(resizer);
      document.body.appendChild(table);
      
      let isDragging = false;
      let offsetX, offsetY;
      
      header.addEventListener('mousedown', startDrag);
      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseup', stopDrag);
      
      function startDrag(e) {
        isDragging = true;
        const tableRect = table.getBoundingClientRect();
        offsetX = e.clientX - tableRect.left;
        offsetY = e.clientY - tableRect.top;
        
        table.style.opacity = '0.8';
      }
      
      function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;
        
        const maxX = window.innerWidth - table.offsetWidth;
        const maxY = window.innerHeight - table.offsetHeight;
        
        const clampedX = Math.max(0, Math.min(x, maxX));
        const clampedY = Math.max(0, Math.min(y, maxY));
        
        table.style.left = clampedX + 'px';
        table.style.top = clampedY + 'px';
        table.style.right = 'auto';
      }
      
      function stopDrag() {
        isDragging = false;
        table.style.opacity = '1';
      }
      
      function updateFontSize() {
        const tableWidth = table.offsetWidth;
        const windowWidth = window.innerWidth;
        const fontSizeVw = (tableWidth / windowWidth) * 3; 
        table.style.fontSize = `${Math.max(1.5, Math.min(1.5, fontSizeVw))}vw`; 
        header.style.fontSize = `${Math.max(1, Math.min(1.6, fontSizeVw * 1.5))}vw`; 
      }
      
      const resizeObserver = new ResizeObserver(() => {
        updateFontSize();
      });
      
      resizeObserver.observe(table);
      
      
      
      return document.getElementById('goalCancellationTableBody');
    }
    
    function monitorScoreElements() {
     
      const previousScores = new Map();
      
      function hasLongParenthesis(teamName) {
        if (!teamName) return false;
        
        const parenthesisRegex = /\(([^)]+)\)/g;
        let match;
        
        while ((match = parenthesisRegex.exec(teamName)) !== null) {
          const contentInParenthesis = match[1].trim();          
          
          if (contentInParenthesis.length >= 4) {
            return true;
          }
        }
        
        return false;
      }
      
      function findAndTrackScores() {
        
        const scoreElements = document.querySelectorAll('span.event-block-score__score--r0ZU9');
        
        
        scoreElements.forEach(score => {
          if (!previousScores.has(score)) {
            const initialScore = score.textContent.trim();
            
            previousScores.set(score, initialScore);
            
            const observer = new MutationObserver((mutations) => {
              mutations.forEach(mutation => {
                checkScoreChange(score);
              });
            });
            
            observer.observe(score, { 
              childList: true, 
              characterData: true,
              subtree: true 
            });
          }
        });
      }
      
      function checkScoreChange(scoreElement) {
        if (!document.body.contains(scoreElement)) {
          
          return;
        }
        
        const currentScore = scoreElement.textContent.trim();
        const previousScore = previousScores.get(scoreElement);
        
        if (previousScore && currentScore !== previousScore) {         
          
          const prevParts = previousScore.split(':').map(Number);
          const currParts = currentScore.split(':').map(Number);
          const prevTotal = prevParts.reduce((a, b) => a + b, 0);
          const currTotal = currParts.reduce((a, b) => a + b, 0);
          
          if (currTotal < prevTotal) {
                        
            let teamNames = "Bilinmeyen";
            let parent = scoreElement.parentElement;
            for (let i = 0; i < 5 && parent; i++) {
              const teamLink = parent.querySelector('a[data-testid="event"]');
              if (teamLink) {
                teamNames = teamLink.textContent.trim();
                break;
              }
              parent = parent.parentElement;
            }
            
            if (hasLongParenthesis(teamNames)) {              
              return; 
            }
            
            addToTable(previousScore, currentScore, teamNames);
            showNotification(teamNames, previousScore, currentScore);
          }
          
          previousScores.set(scoreElement, currentScore);
        }
      }
      
      const tableBody = createTable();
      function addToTable(previousScore, currentScore, teams) {
        const rows = tableBody.querySelectorAll('tr');
        if (rows.length >= 5) {
          tableBody.removeChild(rows[0]);
        }
        
        const now = new Date();
        const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
        
        let homeTeam = "Bilinmeyen";
        let awayTeam = "Bilinmeyen";
        
        if (teams && teams !== "Bilinmeyen") {          
          
          if (teams.includes("—")) {
            const teamParts = teams.split("—");
            if (teamParts.length >= 2) {
              homeTeam = teamParts[0].trim();
              awayTeam = teamParts[1].trim();
            } else {
              homeTeam = teams;
            }
          } 
          else if (teams.includes(" - ")) {
            const teamParts = teams.split(" - ");
            if (teamParts.length >= 2) {
              homeTeam = teamParts[0].trim();
              awayTeam = teamParts[1].trim();
            } else {
              homeTeam = teams;
            }
          } else if (teams.includes(" vs ")) {
            const teamParts = teams.split(" vs ");
            if (teamParts.length >= 2) {
              homeTeam = teamParts[0].trim();
              awayTeam = teamParts[1].trim();
            } else {
              homeTeam = teams;
            }
          } else {
            homeTeam = teams;
          }          
          
        }
        
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${time}</td>
          <td>${homeTeam}</td>
          <td>${awayTeam}</td>
          <td>${previousScore}</td>
          <td style="color:red; font-weight:bold;">${currentScore}</td>
        `;
        
        tableBody.appendChild(row);
      }
      
      findAndTrackScores();
      
      setInterval(findAndTrackScores, 1000);
    }
    
    monitorScoreElements();    
    
    
    setInterval(() => {
      const memory = getMemoryUsage();
      const originalTitle = document.title.split(" | ")[0] || "Live Bets";
      document.title = `${originalTitle} | Bellek kullanımı: ${memory}`;
    }, 3000);

    function setupWeekendRefresh() {      
      
      setInterval(() => {
        const now = new Date();
        const day = now.getDay(); 
        
        if (day === 0 || day === 6) {          
          
          const currentHour = now.getHours();
          const currentMinute = now.getMinutes();
          
          if (currentMinute === 0) {            
            window.location.reload();
          }
        }
      }, 60000); 
    }
    
    setupWeekendRefresh();
  })();
