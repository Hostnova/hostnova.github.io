/**
 * FORM HANDLING & VALIDATION
 * Client-side validation, error handling, and submission
 * Based on WEBSITE_DESIGN_SPEC.md
 */

(function() {
  'use strict';

  // ========================================
  // FORM VALIDATION
  // ========================================
  
  const validateField = (field) => {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    const pattern = field.getAttribute('pattern');
    const minLength = field.getAttribute('minlength');
    const maxLength = field.getAttribute('maxlength');
    
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (required && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }
    
    // Email validation
    else if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }
    
    // Phone validation (Kenya format)
    else if (type === 'tel' && value) {
      // Kenya phone format: +254 or 0 followed by 9 digits
      const phoneRegex = /^(\+254|0)[17]\d{8}$/;
      if (!phoneRegex.test(value.replace(/\s/g, ''))) {
        isValid = false;
        errorMessage = 'Please enter a valid Kenya phone number (e.g., +254712345678)';
      }
    }
    
    // URL validation
    else if (type === 'url' && value) {
      try {
        new URL(value);
      } catch {
        isValid = false;
        errorMessage = 'Please enter a valid URL';
      }
    }
    
    // Pattern validation
    else if (pattern && value) {
      const regex = new RegExp(pattern);
      if (!regex.test(value)) {
        isValid = false;
        errorMessage = field.getAttribute('data-error-message') || 'Please match the requested format';
      }
    }
    
    // Min length validation
    else if (minLength && value.length < parseInt(minLength)) {
      isValid = false;
      errorMessage = `Please enter at least ${minLength} characters`;
    }
    
    // Max length validation
    else if (maxLength && value.length > parseInt(maxLength)) {
      isValid = false;
      errorMessage = `Please enter no more than ${maxLength} characters`;
      }
    
    return { isValid, errorMessage };
  };
  
  const showFieldError = (field, message) => {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;
    
    // Remove any existing error
    const existingError = formGroup.querySelector('.form-error');
    if (existingError) {
      existingError.remove();
    }
    
    // Add error class to field
    field.classList.add('error');
    field.classList.remove('success');
    field.setAttribute('aria-invalid', 'true');
    
    // Create and insert error message
    const errorElement = document.createElement('span');
    errorElement.className = 'form-error';
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');
    
    formGroup.appendChild(errorElement);
    
    // Associate error with field for screen readers
    const errorId = `${field.id || field.name}-error`;
    errorElement.id = errorId;
    field.setAttribute('aria-describedby', errorId);
  };
  
  const showFieldSuccess = (field) => {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;
    
    // Remove any existing error
    const existingError = formGroup.querySelector('.form-error');
    if (existingError) {
      existingError.remove();
    }
    
    // Add success class to field
    field.classList.remove('error');
    field.classList.add('success');
    field.setAttribute('aria-invalid', 'false');
    field.removeAttribute('aria-describedby');
  };
  
  // ========================================
  // REAL-TIME VALIDATION
  // ========================================
  
  const initRealTimeValidation = () => {
    const fields = document.querySelectorAll('.form-input, .form-textarea, .form-select');
    
    fields.forEach(field => {
      // Validate on blur
      field.addEventListener('blur', () => {
        const { isValid, errorMessage } = validateField(field);
        
        if (!isValid) {
          showFieldError(field, errorMessage);
        } else if (field.value.trim()) {
          showFieldSuccess(field);
        }
      });
      
      // Clear error on input
      field.addEventListener('input', () => {
        if (field.classList.contains('error')) {
          const { isValid } = validateField(field);
          if (isValid) {
            showFieldSuccess(field);
          }
        }
      });
    });
  };
  
  // ========================================
  // FORM SUBMISSION
  // ========================================
  
  const initFormSubmission = () => {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all fields
        const fields = form.querySelectorAll('.form-input, .form-textarea, .form-select');
        let isFormValid = true;
        
        fields.forEach(field => {
          const { isValid, errorMessage } = validateField(field);
          
          if (!isValid) {
            showFieldError(field, errorMessage);
            isFormValid = false;
          } else if (field.value.trim()) {
            showFieldSuccess(field);
          }
        });
        
        // Focus first invalid field
        if (!isFormValid) {
          const firstError = form.querySelector('.error');
          if (firstError) {
            firstError.focus();
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          return;
        }
        
        // Get form data
        const formData = new FormData(form);
        const submitButton = form.querySelector('[type="submit"]');
        
        // Disable submit button and show loading state
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.setAttribute('aria-busy', 'true');
          const originalText = submitButton.textContent;
          submitButton.innerHTML = '<span class="spinner spinner-sm"></span> Submitting...';
          submitButton.dataset.originalText = originalText;
        }
        
        try {
          // Send form data
          const response = await fetch(form.action, {
            method: form.method || 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          });
          
          if (response.ok) {
            showFormSuccess(form);
            form.reset();
            
            // Remove all validation classes
            fields.forEach(field => {
              field.classList.remove('error', 'success');
              field.removeAttribute('aria-invalid');
              field.removeAttribute('aria-describedby');
            });
          } else {
            throw new Error('Form submission failed');
          }
        } catch (error) {
          showFormError(form, 'There was an error submitting your form. Please try again.');
          console.error('Form submission error:', error);
        } finally {
          // Re-enable submit button
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.removeAttribute('aria-busy');
            submitButton.textContent = submitButton.dataset.originalText || 'Submit';
          }
        }
      });
    });
  };
  
  const showFormSuccess = (form) => {
    // Remove any existing messages
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // Create success message
    const message = document.createElement('div');
    message.className = 'success-message form-message';
    message.setAttribute('role', 'status');
    message.innerHTML = `
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>
      <span>Thank you! Your submission has been received.</span>
    `;
    
    form.insertBefore(message, form.firstChild);
    
    // Scroll to message
    message.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Remove message after 5 seconds
    setTimeout(() => {
      message.remove();
    }, 5000);
  };
  
  const showFormError = (form, errorMessage) => {
    // Remove any existing messages
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // Create error message
    const message = document.createElement('div');
    message.className = 'error-message form-message';
    message.setAttribute('role', 'alert');
    message.innerHTML = `
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
      </svg>
      <span>${errorMessage}</span>
    `;
    
    form.insertBefore(message, form.firstChild);
    
    // Scroll to message
    message.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  
  // ========================================
  // NEWSLETTER SIGNUP
  // ========================================
  
  const initNewsletterSignup = () => {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const emailInput = form.querySelector('input[type="email"]');
        const submitButton = form.querySelector('[type="submit"]');
        
        if (!emailInput) return;
        
        const { isValid, errorMessage } = validateField(emailInput);
        
        if (!isValid) {
          showFieldError(emailInput, errorMessage);
          return;
        }
        
        // Disable button
        if (submitButton) {
          submitButton.disabled = true;
          const originalText = submitButton.textContent;
          submitButton.textContent = 'Subscribing...';
          submitButton.dataset.originalText = originalText;
        }
        
        try {
          // Newsletter API call would go here
          await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
          
          // Show success
          emailInput.value = '';
          showFieldSuccess(emailInput);
          
          // Show inline success message
          const successMsg = document.createElement('span');
          successMsg.className = 'text-success small';
          successMsg.textContent = 'Successfully subscribed!';
          emailInput.parentElement.appendChild(successMsg);
          
          setTimeout(() => {
            successMsg.remove();
          }, 3000);
          
        } catch (error) {
          showFieldError(emailInput, 'Subscription failed. Please try again.');
        } finally {
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = submitButton.dataset.originalText || 'Subscribe';
          }
        }
      });
    });
  };
  
  // ========================================
  // CHARACTER COUNTER
  // ========================================
  
  const initCharacterCounter = () => {
    const fields = document.querySelectorAll('[data-max-chars]');
    
    fields.forEach(field => {
      const maxChars = parseInt(field.getAttribute('data-max-chars'));
      
      // Create counter element
      const counter = document.createElement('span');
      counter.className = 'char-counter text-sm text-gray';
      counter.setAttribute('aria-live', 'polite');
      
      const formGroup = field.closest('.form-group');
      if (formGroup) {
        formGroup.appendChild(counter);
      }
      
      // Update counter
      const updateCounter = () => {
        const remaining = maxChars - field.value.length;
        counter.textContent = `${remaining} characters remaining`;
        
        if (remaining < 20) {
          counter.style.color = 'var(--color-warning)';
        } else {
          counter.style.color = '';
        }
      };
      
      field.addEventListener('input', updateCounter);
      updateCounter();
    });
  };
  
  // ========================================
  // PASSWORD TOGGLE
  // ========================================
  
  const initPasswordToggle = () => {
    const passwordFields = document.querySelectorAll('input[type="password"][data-toggle-password]');
    
    passwordFields.forEach(field => {
      const toggleBtn = document.createElement('button');
      toggleBtn.type = 'button';
      toggleBtn.className = 'password-toggle';
      toggleBtn.setAttribute('aria-label', 'Toggle password visibility');
      toggleBtn.innerHTML = '👁️';
      
      const wrapper = document.createElement('div');
      wrapper.className = 'password-wrapper';
      wrapper.style.position = 'relative';
      
      field.parentNode.insertBefore(wrapper, field);
      wrapper.appendChild(field);
      wrapper.appendChild(toggleBtn);
      
      toggleBtn.addEventListener('click', () => {
        const type = field.type === 'password' ? 'text' : 'password';
        field.type = type;
        toggleBtn.innerHTML = type === 'password' ? '👁️' : '👁️‍🗨️';
        toggleBtn.setAttribute('aria-label', type === 'password' ? 'Show password' : 'Hide password');
      });
    });
  };
  
  // ========================================
  // INITIALIZE ALL FORM FEATURES
  // ========================================
  
  const init = () => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initRealTimeValidation();
        initFormSubmission();
        initNewsletterSignup();
        initCharacterCounter();
        initPasswordToggle();
      });
    } else {
      initRealTimeValidation();
      initFormSubmission();
      initNewsletterSignup();
      initCharacterCounter();
      initPasswordToggle();
    }
  };
  
  // Initialize
  init();
  
  // Export for external use
  window.HostaraForms = {
    init,
    validateField,
    showFieldError,
    showFieldSuccess
  };
  
})();
