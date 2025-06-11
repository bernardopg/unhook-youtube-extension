// Modern Unhook YouTube Extension - Popup Script
document.addEventListener('DOMContentLoaded', function() {
  // Add fade-in animation to container
  const container = document.getElementById('container');
  container.style.opacity = '0';
  container.style.transform = 'translateY(20px)';
  
  setTimeout(() => {
    container.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    container.style.opacity = '1';
    container.style.transform = 'translateY(0)';
  }, 100);

  // Settings configuration
  const settings = [
    'hideRecommendations',
    'hideComments', 
    'hideSidebar',
    'hideVoiceSearch',
    'hideNotifications',
    'hideHeader',
    'hideCreateButton',
    'hideVirtualKeyboard',
    'hideFilterChips',
    'hideNewsSection'
  ];

  // Create default settings object
  const defaultSettings = {};
  settings.forEach(setting => {
    defaultSettings[setting] = false;
  });

  // Load saved settings
  chrome.storage.sync.get(defaultSettings, function(items) {
    settings.forEach(setting => {
      const checkbox = document.getElementById(setting);
      if (checkbox) {
        checkbox.checked = items[setting];
        
        // Add smooth animation when loading
        setTimeout(() => {
          checkbox.parentElement.style.transition = 'all 0.3s ease';
        }, 300);
      }
    });
  });

  // Add change listeners to checkboxes for instant feedback
  settings.forEach(setting => {
    const checkbox = document.getElementById(setting);
    if (checkbox) {
      checkbox.addEventListener('change', function() {
        // Add visual feedback
        const settingItem = this.closest('.setting-item');
        settingItem.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
          settingItem.style.transform = 'scale(1)';
        }, 150);

        // Update storage immediately for better UX
        const updateObj = {};
        updateObj[setting] = this.checked;
        chrome.storage.sync.set(updateObj);
      });
    }
  });

  // Save button functionality with enhanced feedback
  const saveButton = document.getElementById('saveSettings');
  saveButton.addEventListener('click', function() {
    // Disable button and show loading state
    this.disabled = true;
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';
    
    // Collect all settings
    const settingsToSave = {};
    settings.forEach(setting => {
      const checkbox = document.getElementById(setting);
      if (checkbox) {
        settingsToSave[setting] = checkbox.checked;
      }
    });

    // Save settings with animation
    chrome.storage.sync.set(settingsToSave, () => {
      // Success animation
      this.innerHTML = '<i class="fas fa-check"></i> Salvo!';
      this.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
      
      // Show success message
      showToast('Configurações salvas com sucesso!', 'success');
      
      // Close popup after short delay
      setTimeout(() => {
        window.close();
      }, 1500);
    });
  });

  // Toast notification function
  function showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
      existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
      <span>${message}</span>
    `;

    // Add toast styles
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%) translateY(-50px);
      background: ${type === 'success' ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'linear-gradient(135deg, #ef4444, #dc2626)'};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 500;
      z-index: 1000;
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    `;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);

    // Animate out
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(-20px)';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.remove();
        }
      }, 300);
    }, 2000);
  }

  // Add keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      saveButton.click();
    }
    
    // Escape to close
    if (e.key === 'Escape') {
      window.close();
    }
  });

  // Add hover effects to setting items
  const settingItems = document.querySelectorAll('.setting-item');
  settingItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateX(4px)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateX(0)';
    });
  });
});
