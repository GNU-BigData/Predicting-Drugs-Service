document.addEventListener('DOMContentLoaded', function() {
    var consentCheckbox = document.getElementById('consentCheckbox');
    var personalInfoSection = document.getElementById('personalInfoSection');

    consentCheckbox.addEventListener('change', function() {
        if (this.checked) {
            personalInfoSection.style.display = 'block';
        } else {
            personalInfoSection.style.display = 'none';
            resetDropdowns();
        }
    });

    function resetDropdowns() {
        var dropdowns = personalInfoSection.getElementsByTagName('select');
        for (var i = 0; i < dropdowns.length; i++) {
            dropdowns[i].selectedIndex = 0;
        }
    }
});

document.getElementById('startTest').addEventListener('click', function() {
    const age = document.getElementById('age').value;
    // const gender = document.getElementById('gender').value;
    const education = document.getElementById('education').value;
    const country = document.getElementById('country').value;

    const queryParams = new URLSearchParams({ age, education, country });
    window.location.href = 'test.html?' + queryParams.toString();
});

document.getElementById('startSimpleTest').addEventListener('click', function() {
    const age = document.getElementById('age').value;
    // const gender = document.getElementById('gender').value;
    const education = document.getElementById('education').value;
    const country = document.getElementById('country').value;

    const queryParams = new URLSearchParams({ age, education, country });
    window.location.href = 'simple_test.html?' + queryParams.toString();
});

document.addEventListener("DOMContentLoaded", function() {
    var image = document.querySelector(".introduction img");
    image.classList.add("floating");
});

// script.js
document.addEventListener('DOMContentLoaded', function() {
    var consentCheckbox = document.getElementById('consentCheckbox');
    var personalInfoSection = document.getElementById('personalInfoSection');
    var termsButton = document.getElementById('termsButton');
    var termsModal = document.getElementById('termsModal');
    var closeModalButton = document.getElementsByClassName("close")[0];

    consentCheckbox.addEventListener('change', togglePersonalInfoSection);
    termsButton.addEventListener('click', openModal);
    closeModalButton.addEventListener('click', closeTheModal);

    function togglePersonalInfoSection() {
        personalInfoSection.style.display = this.checked ? 'block' : 'none';
        if (!this.checked) {
            resetDropdowns();
        }
    }

    function resetDropdowns() {
        var dropdowns = personalInfoSection.getElementsByTagName('select');
        for (var i = 0; i < dropdowns.length; i++) {
            dropdowns[i].selectedIndex = 0;
        }
    }

    function openModal() {
        termsModal.style.display = "block";
    }

    function closeTheModal() {
        termsModal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == termsModal) {
            termsModal.style.display = "none";
        }
    }
});
