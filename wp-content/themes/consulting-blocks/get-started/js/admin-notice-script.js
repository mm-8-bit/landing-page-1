jQuery(document).ready(function ($) {
    // Attach click event to the dismiss button
    $(document).on('click', '.notice[data-notice="get-start"] button.notice-dismiss', function () {
        // Dismiss the notice via AJAX
        $.ajax({
            type: 'POST',
            url: ajaxurl,
            data: {
                action: 'consulting_blocks_dismissed_notice',
            },
            success: function () {
                // Remove the notice on success
                $('.notice[data-notice="example"]').remove();
            }
        });
    });
});

// WordClever – AI Content Writer plugin activation
document.addEventListener('DOMContentLoaded', function () {
    const consulting_blocks_button = document.getElementById('install-activate-button');

    if (!consulting_blocks_button) return;

    consulting_blocks_button.addEventListener('click', function (e) {
        e.preventDefault();

        const consulting_blocks_redirectUrl = consulting_blocks_button.getAttribute('data-redirect');

        // Step 1: Check if plugin is already active
        const consulting_blocks_checkData = new FormData();
        consulting_blocks_checkData.append('action', 'check_wordclever_activation');

        fetch(installWordcleverData.ajaxurl, {
            method: 'POST',
            body: consulting_blocks_checkData,
        })
        .then(res => res.json())
        .then(res => {
            if (res.success && res.data.active) {
                // Plugin is already active → just redirect
                window.location.href = consulting_blocks_redirectUrl;
            } else {
                // Not active → proceed with install + activate
                consulting_blocks_button.textContent = 'Installing & Activating...';

                const consulting_blocks_installData = new FormData();
                consulting_blocks_installData.append('action', 'install_and_activate_wordclever_plugin');
                consulting_blocks_installData.append('_ajax_nonce', installWordcleverData.nonce);

                fetch(installWordcleverData.ajaxurl, {
                    method: 'POST',
                    body: consulting_blocks_installData,
                })
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        window.location.href = consulting_blocks_redirectUrl;
                    } else {
                        alert('Activation error: ' + (res.data?.message || 'Unknown error'));
                        consulting_blocks_button.textContent = 'Try Again';
                    }
                })
                .catch(error => {
                    alert('Request failed: ' + error.message);
                    consulting_blocks_button.textContent = 'Try Again';
                });
            }
        })
        .catch(error => {
            alert('Check request failed: ' + error.message);
        });
    });
});
