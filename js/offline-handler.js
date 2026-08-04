/* Offline / Loading overlay handler
   Injects a themed overlay when network is unavailable and monitors connectivity.
*/
(function(){
    var overlayId = 'network-overlay';

    function createOverlay(){
        if (document.getElementById(overlayId)) return;
        var overlay = document.createElement('div');
        overlay.id = overlayId;
        overlay.innerHTML = '\n            <div class="network-panel">\n                <div class="network-content">\n                    <div class="network-dots" id="network-dots">\n                        <span class="dot"></span>\n                        <span class="dot"></span>\n                        <span class="dot"></span>\n                    </div>\n                </div>\n            </div>\n';
        var style = document.createElement('style');
        style.textContent = '\n#'+overlayId+'{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;z-index:20000;background:#ffffff;font-family:Inter,Arial,Helvetica,sans-serif}'+
            '#'+overlayId+' .network-panel{display:flex;align-items:center;justify-content:center;width:100%;height:100%}'+
            '#'+overlayId+' .network-content{display:flex;align-items:center;justify-content:center}'+
            '#'+overlayId+' .network-dots{display:flex;gap:14px;align-items:center;justify-content:center}'+
            '#'+overlayId+' .network-dots .dot{width:14px;height:14px;border-radius:50%;background:#d2002a;display:inline-block;animation:dot-bounce 1s infinite ease-in-out}'+
            '#'+overlayId+' .network-dots .dot:nth-child(1){animation-delay:0s}'+
            '#'+overlayId+' .network-dots .dot:nth-child(2){animation-delay:0.15s}'+
            '#'+overlayId+' .network-dots .dot:nth-child(3){animation-delay:0.3s}'+
            '@keyframes dot-bounce{0%,80%,100%{transform:translateY(0);opacity:0.9}40%{transform:translateY(-12px);opacity:1}}'+
            '#'+overlayId+'.hidden{display:none}';
        document.head.appendChild(style);
        document.body.appendChild(overlay);
    }

    function showOverlay(msg){
        createOverlay();
        var o = document.getElementById(overlayId);
        if (!o) return;
        o.classList.remove('hidden');
        var m = document.getElementById('network-message'); if(m) m.textContent = msg || 'Offline — trying to reconnect';
    }
    function hideOverlay(){
        var o = document.getElementById(overlayId);
        if (o) o.classList.add('hidden');
    }

    function checkOnline(timeout){
        timeout = timeout || 5000;
        var controller = new AbortController();
        var signal = controller.signal;
        return new Promise(function(resolve){
            var done = false;
            fetch(window.location.origin + '/favicon.ico', {method:'HEAD', cache:'no-cache', signal: signal}).then(function(r){ if (!done) { done=true; resolve(true); } }).catch(function(){ if(!done){done=true;resolve(false);} });
            setTimeout(function(){ if(!done){controller.abort();done=true;resolve(false);} }, timeout);
        });
    }

    function handleState(){
        if (navigator.onLine === false){ showOverlay('You are offline — trying to reconnect...'); pollReconnect(); return; }
        // quick server check
        showOverlay('Checking connection...');
        checkOnline(4000).then(function(ok){ if(ok){ hideOverlay(); } else { showOverlay('No connection to server — retrying...'); pollReconnect(); } });
    }

    var pollTimer = null;
    function pollReconnect(){
        if (pollTimer) return;
        pollTimer = setInterval(function(){ checkOnline(3000).then(function(ok){ if (ok){ clearInterval(pollTimer); pollTimer = null; showOverlay('Connection restored — loading...'); setTimeout(hideOverlay,800); } }); }, 4000);
    }

    window.addEventListener('online', function(){ handleState(); });
    window.addEventListener('offline', function(){ showOverlay('You are offline — trying to reconnect...'); pollReconnect(); });

    // initial check
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', handleState); else handleState();

})();
