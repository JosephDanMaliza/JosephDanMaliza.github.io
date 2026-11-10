document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  const formFeedback = document.getElementById('form-feedback');
  const emailInput = document.getElementById('senderEmail');

  // Modal DOM Elements
  const limitModalElement = document.getElementById('limitModal');
  const submissionLimitModal = limitModalElement ? new bootstrap.Modal(limitModalElement) : null;
  const limitModalTitleText = document.getElementById('limitModalTitleText');
  const limitMessageBody = document.getElementById('limitMessageBody');

  // Success Modal Element
  const successModalElement = document.getElementById('successModal');
  const messageSuccessModal = successModalElement ? new bootstrap.Modal(successModalElement) : null;

  // Insert YOUR Web3Forms access key here:
  const WEB3FORMS_ACCESS_KEY = "718b36de-ea06-4efb-af1b-55ad3e0c86e1";
  const MAXIMUM_MONTHLY_SUBMISSIONS_PER_USER = 10;

  function displayLimitModal(title, message) {
    if (!submissionLimitModal) return;
    limitModalTitleText.innerText = title;
    limitMessageBody.innerHTML = message;
    submissionLimitModal.show();
  }

  contactForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    // Strict Email Format Validation
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      const invalidEmailModalEl = document.getElementById('invalidEmailModal');
      if (invalidEmailModalEl) {
        const invalidEmailModal = new bootstrap.Modal(invalidEmailModalEl);
        invalidEmailModal.show();
      }
      return;
    }

    // Native validation check
    if (!contactForm.checkValidity()) {
      event.stopPropagation();
      contactForm.classList.add('was-validated');
      return;
    }

    const senderEmailAddress = emailInput.value.trim().toLowerCase();
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Check LocalStorage rate limit
    let storedSubmissionHistory = JSON.parse(localStorage.getItem('formSubmissionTimestamps')) || {};
    let userTimestamps = storedSubmissionHistory[senderEmailAddress] || [];

    let currentMonthTimestamps = userTimestamps.filter(timestampString => {
      const pastDate = new Date(timestampString);
      return pastDate.getMonth() === currentMonth && pastDate.getFullYear() === currentYear;
    });

    if (currentMonthTimestamps.length >= MAXIMUM_MONTHLY_SUBMISSIONS_PER_USER) {
      displayLimitModal(
        "Monthly Limit Reached",
        `The email <strong>${senderEmailAddress}</strong> has already sent ${MAXIMUM_MONTHLY_SUBMISSIONS_PER_USER} messages this month.<br><br>To prevent spam, please wait until next month to send another message.`
      );
      return;
    }

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;

    // Loading indicator
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';

    const formDataPayload = new FormData(contactForm);
    formDataPayload.append("access_key", WEB3FORMS_ACCESS_KEY);

    try {
      const networkResponse = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataPayload
      });

      const parsedData = await networkResponse.json();

      if (networkResponse.ok && parsedData.success) {
        currentMonthTimestamps.push(currentDate.toISOString());
        storedSubmissionHistory[senderEmailAddress] = currentMonthTimestamps;
        localStorage.setItem('formSubmissionTimestamps', JSON.stringify(storedSubmissionHistory));

        if (formFeedback) formFeedback.innerHTML = '';
        if (messageSuccessModal) messageSuccessModal.show();

        contactForm.reset();
        contactForm.classList.remove('was-validated');
      } else {
        if (parsedData.message && (parsedData.message.toLowerCase().includes("limit") || parsedData.message.toLowerCase().includes("quota"))) {
          displayLimitModal(
            "System Quota Reached",
            "My portfolio's monthly messaging limit has been reached.<br><br>Please try again next month, or reach out to me directly via LinkedIn!"
          );
        } else {
          if (formFeedback) {
            formFeedback.innerHTML = `
              <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <i class="fas fa-exclamation-triangle me-2"></i> Error: ${parsedData.message || 'Submission failed'}
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert"></button>
              </div>`;
          }
        }
      }
    } catch (networkError) {
      if (formFeedback) {
        formFeedback.innerHTML = `
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <i class="fas fa-times-circle me-2"></i> Something went wrong. Please check your network connection and try again.
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert"></button>
          </div>`;
      }
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    }
  });
});