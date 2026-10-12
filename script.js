var API_KEY = localStorage.getItem('magic_hour_api_key_v2') || '';
var API_BASE = 'https://api.magichour.ai/v1';

document.getElementById('apiDiag').textContent = '✅ Script v3 chargé !';

if (API_KEY) {
  document.getElementById('apiKeyInput').value = API_KEY;
  document.getElementById('apiDiag').textContent = 'Clé enregistrée. Longueur: ' + API_KEY.length + ' caractères. Finit par: ...' + API_KEY.slice(-4);
} else {
  document.getElementById('apiDiag').textContent = '⚠️ Aucune clé API. Entrez votre clé.';
}

document.getElementById('saveKeyBtn').onclick = function() {
  var k = document.getElementById('apiKeyInput').value.trim(); // .trim() enlève les espaces invisibles
  if (!k) { alert('Entrez une clé'); return; }
  localStorage.setItem('magic_hour_api_key_v2', k); // On utilise une nouvelle clé de stockage pour ne pas avoir l'ancienne en mémoire
  API_KEY = k;
  document.getElementById('apiDiag').textContent = '✅ Clé enregistrée. Longueur: ' + k.length + ' caractères.';
  alert('Clé enregistrée !');
};

document.getElementById('testKeyBtn').onclick = function() {
  var k = document.getElementById('apiKeyInput').value.trim();
  if (!k) { alert('Entrez une clé'); return; }
  document.getElementById('apiDiag').textContent = '⏳ Test en cours...';
  
  fetch(API_BASE + '/files/upload-urls', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + k, 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: [{ type: 'image', extension: 'jpg' }] })
  })
  .then(function(r) {
    if (r.status === 401) {
      document.getElementById('apiDiag').textContent = '❌ Erreur 401 : Clé refusée par Magic Hour.';
    } else if (r.ok) {
      document.getElementById('apiDiag').textContent = '✅ Clé API valide et fonctionnelle !';
    } else {
      return r.text().then(function(t) {
        document.getElementById('apiDiag').textContent = '⚠️ Erreur HTTP ' + r.status + ' : ' + t.slice(0, 100);
      });
    }
  })
  .catch(function(e) {
    document.getElementById('apiDiag').textContent = '❌ Erreur réseau';
  });
};

document.getElementById('addSceneBtn').onclick = function() {
  document.getElementById('log').textContent = 'Bouton ajouté';
};
