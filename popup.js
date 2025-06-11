// Quando o DOM estiver carregado, adiciona os listeners
document.addEventListener('DOMContentLoaded', function() {
  // Carrega as configurações salvas
  chrome.storage.sync.get({
    hideRecommendations: false,
    hideComments: false,
    hideSidebar: false
  }, function(items) {
    document.getElementById('hideRecommendations').checked = items.hideRecommendations;
    document.getElementById('hideComments').checked = items.hideComments;
    document.getElementById('hideSidebar').checked = items.hideSidebar;
  });

  // Adiciona listener ao botão de salvar configurações
  document.getElementById('saveSettings').addEventListener('click', function() {
    let hideRecommendations = document.getElementById('hideRecommendations').checked;
    let hideComments = document.getElementById('hideComments').checked;
    let hideSidebar = document.getElementById('hideSidebar').checked;

    // Salva as configurações
    chrome.storage.sync.set({
      hideRecommendations: hideRecommendations,
      hideComments: hideComments,
      hideSidebar: hideSidebar
    }, function() {
      // Notifica que as configurações foram salvas
      alert('Configurações salvas com sucesso!');
      // Fecha o popup
      window.close();
    });
  });
});
