// Este arquivo é um service worker para a extensão Unhook YouTube
// Pode ser usado para tarefas em segundo plano, como ouvir eventos ou gerenciar contexto

console.log('Service Worker da extensão Unhook YouTube carregado.');

// Exemplo de listener para eventos de instalação da extensão
chrome.runtime.onInstalled.addListener(function() {
  console.log('Extensão Unhook YouTube instalada.');
});

// Aqui você pode adicionar mais listeners ou lógica para tarefas em segundo plano
// Por exemplo, ouvir mensagens de outras partes da extensão
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'getSettings') {
    // Exemplo de como responder a uma solicitação de configurações
    chrome.storage.sync.get({
      hideRecommendations: false,
      hideComments: false,
      hideSidebar: false
    }, function(items) {
      sendResponse(items);
    });
    return true; // Necessário para sendResponse assíncrono
  }
});
