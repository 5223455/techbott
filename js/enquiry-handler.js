/**
 * TechBott India - Product Enquiry Handler
 * Sends enquiry data to the backend API for automated follow-up emails
 * while keeping existing WhatsApp functionality intact.
 */
(function () {
    'use strict';

    // Backend API URL - update this when deploying
    var API_BASE = window.TECHBOTT_API_URL || 'http://localhost:3000';

    /**
     * Override the existing submitProductEnquiry function
     * to also send data to the backend for email follow-up
     */
    window.submitProductEnquiry = function (e) {
        e.preventDefault();

        // Get product name from page header
        var productName = 'Unknown Product';
        var h1 = document.querySelector('.page-header h1');
        if (h1) {
            productName = h1.textContent.trim();
        } else {
            // Fallback: try breadcrumb or display-3 heading
            var displayH1 = document.querySelector('.display-3');
            if (displayH1) {
                productName = displayH1.textContent.trim();
            }
        }

        // Collect form data
        var fname = document.getElementById('eq-fname').value.trim();
        var surname = document.getElementById('eq-surname').value.trim();
        var email = document.getElementById('eq-email').value.trim();
        var company = document.getElementById('eq-company').value.trim();
        var mobile = document.getElementById('eq-mobile').value.trim();
        var city = document.getElementById('eq-city').value.trim();
        var state = document.getElementById('eq-state').value.trim();
        var comments = document.getElementById('eq-comments').value.trim();
        var optInEl = document.getElementById('eq-optin');
        var optIn = optInEl ? optInEl.checked : false;

        // ==========================================
        // 1. Send to Backend API (for email follow-up)
        // ==========================================
        var enquiryData = {
            firstName: fname,
            surname: surname,
            email: email,
            company: company,
            mobile: mobile,
            city: city,
            state: state,
            comments: comments,
            productName: productName,
            optIn: optIn
        };

        fetch(API_BASE + '/api/enquiry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(enquiryData)
        })
        .then(function (response) { return response.json(); })
        .then(function (data) {
            if (data.success) {
                console.log('[TechBott] Enquiry saved. Follow-up email scheduled.');
                // Show a small confirmation to user
                showEnquiryConfirmation(data.message || 'Thank you! We will send you detailed product information via email.');
            } else {
                console.warn('[TechBott] Enquiry API response:', data.message);
            }
        })
        .catch(function (err) {
            // Don't block WhatsApp flow if API fails
            console.error('[TechBott] Could not save enquiry to server:', err.message);
        });

        // ==========================================
        // 2. Original WhatsApp functionality (preserved)
        // ==========================================
        var msg = '*Product Enquiry - ' + productName + '*\n\n';
        msg += '*Name:* ' + fname + ' ' + surname + '\n';
        msg += '*Email:* ' + email + '\n';
        msg += '*Company:* ' + company + '\n';
        msg += '*Mobile:* ' + mobile + '\n';
        msg += '*City:* ' + city + '\n';
        msg += '*State:* ' + state + '\n';
        if (comments) { msg += '*Comments:* ' + comments + '\n'; }
        msg += '\n_Hi, please share the catalog for ' + productName + '_';

        var url = 'https://wa.me/+917337335751?text=' + encodeURIComponent(msg);
        window.open(url, '_blank');

        // After sending enquiry, open catalog so customer can browse products
        setTimeout(function () {
            window.open('https://wa.me/c/917337335751', '_blank');
        }, 2000);

        return false;
    };

    /**
     * Show a subtle confirmation toast after submission
     */
    function showEnquiryConfirmation(message) {
        // Remove existing toast if any
        var existing = document.getElementById('techbott-enquiry-toast');
        if (existing) existing.remove();

        var toast = document.createElement('div');
        toast.id = 'techbott-enquiry-toast';
        toast.innerHTML = '<div style="display:flex;align-items:center;gap:10px;">' +
            '<span style="font-size:20px;">&#9989;</span>' +
            '<span>' + message + '</span>' +
            '</div>';
        toast.style.cssText = 'position:fixed;bottom:100px;right:20px;background:#1a1a2e;color:#fff;' +
            'padding:16px 24px;border-radius:10px;box-shadow:0 8px 30px rgba(0,0,0,0.2);' +
            'z-index:99999;font-family:Inter,sans-serif;font-size:14px;max-width:380px;' +
            'animation:slideInRight 0.4s ease;opacity:1;transition:opacity 0.5s ease;';

        // Add animation keyframes
        if (!document.getElementById('techbott-toast-style')) {
            var style = document.createElement('style');
            style.id = 'techbott-toast-style';
            style.textContent = '@keyframes slideInRight{from{transform:translateX(100%);opacity:0;}to{transform:translateX(0);opacity:1;}}';
            document.head.appendChild(style);
        }

        document.body.appendChild(toast);

        // Auto-remove after 6 seconds
        setTimeout(function () {
            toast.style.opacity = '0';
            setTimeout(function () { toast.remove(); }, 500);
        }, 6000);
    }
})();
