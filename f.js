!function(){function e(){if(window.performance&&window.performance.memory){const e=window.performance.memory;return`${Math.round(e.usedJSHeapSize/1048576)} MB`}return"Bellek bilgisi alınamadı"}function n(){console.log("Tablo oluşturuluyor");const n=document.getElementById("goalCancellationTable");n&&n.parentNode.removeChild(n);const t=document.createElement("style");t.textContent="\n        #goalCancellationTable {\n          position: fixed;\n          top: 2vh;\n          right: 2vw;\n          z-index: 9999;\n          background: #fff;\n          border: 0.2vw solid red;\n          padding: 1vw;\n          width: 25vw;\n          max-height: 40vh;\n          overflow: auto;\n          box-shadow: 0 0 1vw rgba(0, 0, 0, 0.5);\n          font-size: 1.50vw;\n          border-radius: 0.5vw;\n          resize: both;\n          overflow: auto;\n        }\n        \n        #goalCancellationHeader {\n          padding: 0.5vw;\n          margin-bottom: 1vh;\n          background: #f0f0f0;\n          border-radius: 0.3vw;\n          cursor: move;\n          text-align: center;\n          color: red;\n          font-weight: bold;\n          font-size: 1.3vw;\n          display: flex;\n          justify-content: center;\n          align-items: center;\n          user-select: none;\n        }\n        \n        #goalCancellationTable .resizer {\n          width: 1vw;\n          height: 1vw;\n          background: red;\n          position: absolute;\n          right: 0;\n          bottom: 0;\n          cursor: nwse-resize;\n        }\n        \n        #goalCancellationTable table {\n          width: 100%;\n          border-collapse: collapse;\n        }\n        \n        #goalCancellationTable th, #goalCancellationTable td {\n          border: 1px solid #ccc;\n          padding: 0.35vw;\n          text-align: center;\n        }\n      ",document.head.appendChild(t);const o=document.createElement("div");o.id="goalCancellationTable";const l=document.createElement("div");l.id="goalCancellationHeader";const i=document.createElement("span");i.textContent="Gol Geri Alma";const a=document.createElement("div");a.style.fontSize="0.7vw",a.style.color="#666",a.style.marginTop="0.3vw",a.textContent=`Bellek kullanımı: ${e()}`;const r=document.createElement("div");r.style.display="flex",r.style.flexDirection="column",r.style.alignItems="center",r.appendChild(i),r.appendChild(a),l.appendChild(r),setInterval((()=>function(n){n&&(n.textContent=`Bellek kullanımı: ${e()}`);const t=document.title.split(" | ")[0]||"Live bets on Football online – FON.BET";document.title=`${t} | Bellek kullanımı: ${e()}`}(a)),3e3);const d=document.createElement("div");d.innerHTML='\n        <table>\n          <thead>\n            <tr>\n              <th>Zaman</th> \n              <th>Ev Sahibi</th>\n              <th>Deplasman</th>\n              <th>Önceki</th>\n              <th>Yeni</th>\n            </tr>\n          </thead>\n          <tbody id="goalCancellationTableBody">\n          </tbody>\n        </table>\n      ';const s=document.createElement("div");s.className="resizer",o.appendChild(l),o.appendChild(d),o.appendChild(s),document.body.appendChild(o);let c,m,u=!1;l.addEventListener("mousedown",(function(e){u=!0;const n=o.getBoundingClientRect();c=e.clientX-n.left,m=e.clientY-n.top,o.style.opacity="0.8"})),document.addEventListener("mousemove",(function(e){if(!u)return;e.preventDefault();const n=e.clientX-c,t=e.clientY-m,l=window.innerWidth-o.offsetWidth,i=window.innerHeight-o.offsetHeight,a=Math.max(0,Math.min(n,l)),r=Math.max(0,Math.min(t,i));o.style.left=a+"px",o.style.top=r+"px",o.style.right="auto"})),document.addEventListener("mouseup",(function(){u=!1,o.style.opacity="1"}));return new ResizeObserver((()=>{!function(){const e=o.offsetWidth/window.innerWidth*3;o.style.fontSize=`${Math.max(2,Math.min(2,e))}vw`,l.style.fontSize=`${Math.max(1,Math.min(1.6,1.5*e))}vw`}()})).observe(o),console.log("Tablo oluşturuldu"),document.getElementById("goalCancellationTableBody")}console.log("Script başlatıldı"),window.goalCancellationMonitorActive?console.log("Script zaten çalışıyor"):(window.goalCancellationMonitorActive=!0,function(){console.log("Skor elementleri takip ediliyor");const e=new Map;function t(){console.log("Skor elementleri aranıyor...");const n=document.querySelectorAll("span.event-block-score__score--r0ZU9");console.log(`${n.length} skor elementi bulundu`),n.forEach((n=>{if(!e.has(n)){const t=n.textContent.trim();console.log(`Yeni skor elementi izlemeye alındı: ${t}`),e.set(n,t);new MutationObserver((t=>{t.forEach((t=>{!function(n){if(!document.body.contains(n))return void console.log("Element DOM'da değil, izleme durduruldu");const t=n.textContent.trim(),l=e.get(n);if(l&&t!==l){console.log(`Skor değişti: ${l} -> ${t}`);const i=l.split(":").map(Number),a=t.split(":").map(Number),r=i.reduce(((e,n)=>e+n),0);if(a.reduce(((e,n)=>e+n),0)<r){console.log("GOL GERİ ALINDI! Tabloya ekleniyor");let e="Bilinmeyen",i=n.parentElement;for(let n=0;n<5&&i;n++){const n=i.querySelector('a[data-testid="event"]');if(n){e=n.textContent.trim();break}i=i.parentElement}if(function(e){if(!e)return!1;const n=/\(([^)]+)\)/g;let t;for(;null!==(t=n.exec(e));){const e=t[1].trim();if(console.log("Parantez içi:",e,"Uzunluk:",e.length),e.length>=4)return!0}return!1}(e))return void console.log("Takım isminde uzun parantez içeriği bulundu, gol geri alma bildirimi iptal edildi:",e);!function(e,n,t){const l=o.querySelectorAll("tr");l.length>=5&&o.removeChild(l[0]);const i=new Date,a=`${String(i.getHours()).padStart(2,"0")}:${String(i.getMinutes()).padStart(2,"0")}:${String(i.getSeconds()).padStart(2,"0")}`;let r="Bilinmeyen",d="Bilinmeyen";if(t&&"Bilinmeyen"!==t){if(console.log("Takımlar ayrılıyor: ",t),t.includes("—")){const e=t.split("—");e.length>=2?(r=e[0].trim(),d=e[1].trim()):r=t}else if(t.includes(" - ")){const e=t.split(" - ");e.length>=2?(r=e[0].trim(),d=e[1].trim()):r=t}else if(t.includes(" vs ")){const e=t.split(" vs ");e.length>=2?(r=e[0].trim(),d=e[1].trim()):r=t}else r=t;console.log("Ayrılan takımlar:",r,d)}const s=document.createElement("tr");s.innerHTML=`\n          <td>${a}</td>\n          <td>${r}</td>\n          <td>${d}</td>\n          <td>${e}</td>\n          <td style="color:red; font-weight:bold;">${n}</td>\n        `,o.appendChild(s)}(l,t,e),function(e,n,t){const o=document.createElement("div");o.id="goalCancellationNotification",o.style.position="fixed",o.style.top="0",o.style.left="0",o.style.width="100%",o.style.background="rgba(255, 0, 0, 0.9)",o.style.color="white",o.style.padding="1vw",o.style.zIndex="10000",o.style.fontSize="2vw",o.style.fontWeight="bold",o.style.textAlign="center",o.style.boxShadow="0 0 2vw rgba(0, 0, 0, 0.5)",o.style.animation="fadeInOut 10s forwards",o.innerHTML=`\n        <div>⚠️ GOL SİLİNDİ! ⚠️</div>\n        <div style="font-size:1.5vw; margin-top:0.5vw;">${e}</div>\n        <div style="font-size:1.5vw; margin-top:0.5vw;">${n} → ${t}</div>\n      `;const l=document.createElement("style");l.textContent="\n        @keyframes fadeInOut {\n          0% { opacity: 0; transform: translateY(-100%); }\n          10% { opacity: 1; transform: translateY(0); }\n          90% { opacity: 1; transform: translateY(0); }\n          100% { opacity: 0; transform: translateY(-100%); }\n        }\n      ",document.head.appendChild(l),document.body.appendChild(o),setTimeout((()=>{o&&o.parentNode&&o.parentNode.removeChild(o)}),1e4)}(e,l,t)}e.set(n,t)}}(n)}))})).observe(n,{childList:!0,characterData:!0,subtree:!0})}}))}const o=n();t(),setInterval(t,3e3)}(),console.log("Script yüklendi ve çalışıyor"),setInterval((()=>{const n=e(),t=document.title.split(" | ")[0]||"Live bets on Football online – FON.BET";document.title=`${t} | Bellek kullanımı: ${n}`}),3e3),console.log("Hafta sonu sayfa yenileme kontrol ediliyor"),setInterval((()=>{const e=new Date,n=e.getDay();if(0===n||6===n){console.log("Bugün hafta sonu, yenileme döngüsü aktif");const n=e.getHours();0===e.getMinutes()&&(console.log(`Saat ${n}:00, sayfa yenileniyor`),window.location.reload())}}),6e4))}();
