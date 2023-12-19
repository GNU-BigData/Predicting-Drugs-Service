const drugs = [
    { name: "Amphet", text: "중추신경계를 자극하는 약물로, 집중력과 에너지를 증가시킨다. 중독성이 있으며 장기간 사용 시 부작용이 발생할 수 있다.", image: "img/card/Amphet.jpg" },
    { name: "Amyl", text: "흥분제로 사용되며 순간적인 혈압 상승과 빠른 심장 박동을 유발한다. 일시적인 쾌감을 제공하지만 위험성도 높다.", image: "img/card/Amyl.jpg" },
    { name: "Benzos", text: "불안, 불면증 치료에 사용되는 진정제. 중독성이 있으며 장기 사용 시 의존성이 생길 수 있다.", image: "img/card/Benzos.jpg" },
    { name: "Cannabis", text: "마리화나라고도 알려진 대마초. 이완 효과가 있으나, 기억력 저하 등 부작용이 있을 수 있다.", image: "img/card/Cannabis.jpg" },
    { name: "Coke", text: "코카인, 강력한 자극제로 뇌의 도파민 수치를 증가시킨다. 중독성이 매우 높고 심각한 건강 문제를 일으킬 수 있다.", image: "img/card/Coke.jpg" },
    { name: "Crack", text: "코카인의 형태 중 하나로, 흡연으로 사용된다. 매우 강력한 중독성과 심각한 건강 위험을 가지고 있다.", image: "img/card/Crack.jpg" },
    { name: "Ecstasy", text: "MDMA, 즐거움과 친밀감을 증가시키는 약물. 심혈관계에 부담을 주며 고용량 사용 시 생명 위험.", image: "img/card/Ecstasy.jpg" },
    { name: "Heroin", text: "마약 중 하나로 강력한 진통제. 심각한 중독성과 건강 손상을 일으키며, 과다 복용 시 사망에 이를 수 있다.", image: "img/card/Heroin.jpg" },
    { name: "Ketamine", text: "진정 및 마취 효과가 있는 약물. 높은 용량에서 환각 효과를 나타내며 남용 시 위험하다.", image: "img/card/Ketamine.jpg" },
    { name: "Legalh", text: "Legal highs. 다양한 화학 성분을 함유한 향정신성 약물. 코카인, 대마초와 유사한 효과를 나타낸다.", image: "img/card/Legalh.jpg" },
    { name: "LSD", text: "강력한 환각제로, 현실 인식을 왜곡시킨다. 중독성은 낮지만 위험한 경험을 할 수 있다.", image: "img/card/LSD.jpg" },
    { name: "Meth", text: "메탐페타민, 강력한 중추신경계 자극제. 심각한 중독성과 건강 손상을 일으킬 수 있다.", image: "img/card/Meth.jpg" },
    { name: "Nicotine", text: "담배에 주로 함유된 약물로, 중독성이 있으며 여러 건강 문제를 유발할 수 있다.", image: "img/card/Nicotine.jpg" },
    { name: "Semer", text: "가공의 약물로 실제 존재하지 않음.", image: "img/card/Semer.jpg" },
    { name: "VSA", text: "휘발성 물질을 흡입하여 일시적인 쾌감이나 환각을 유발하는 행위. 장기적으로 뇌 손상이나 중독, 급사의 위험이 있다.", image: "img/card/VSA.jpg" },
];

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    displayPersonalityType(urlParams);
    displayDrugRisk(urlParams);
    displayTopDrugsInfo(urlParams);
});

function displayPersonalityType(urlParams) {
    const personalityTypeContainer = document.getElementById('personalityType');
    const scores = {
        O: urlParams.get('O'),
        C: urlParams.get('C'),
        E: urlParams.get('E'),
        A: urlParams.get('A'),
        N: urlParams.get('N'),
        
    };

    const topThreeTypes = Object.entries(scores)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(entry => entry[0]);

    const personalityHTML = Object.entries(scores).map(([type, score]) => {
        const isTopThree = topThreeTypes.includes(type);
        return `<span${isTopThree ? ' style="font-weight:bold;"' : ''}>${type}<span class="score">(${score})</span></span>`;
    }).join(' ');
    personalityTypeContainer.innerHTML = `${personalityHTML}`;

    const ctx = document.getElementById('personalityTypeChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['외향성 E', '우호성 A', '성실성 C', '신경성 N', '개방성 O'],
            datasets: [{
                label: '성격 유형 점수',
                data: [scores.E, scores.A, scores.C, scores.N, scores.O],
                fill: true,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                pointBackgroundColor: "rgba(255, 99, 132, 1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(255, 99, 132, 1)"
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0, // 최소값을 0으로 설정
                    suggestedMax: 40, // 최대값을 40으로 설정
                    // 추가적인 스타일링 옵션 (필요시)
                }
            }
        }
    });
}


function displayDrugRisk(urlParams) {
    const risk = parseFloat(urlParams.get('risk')) * 100;
    document.getElementById('riskPercentage').innerText = risk.toFixed(2) + '%';
    animateCircularProgressBar(risk);

    // Risk 단계 표시 추가
    const riskLevel = getRiskLevel(risk);
    document.getElementById('riskLevel').innerText = `Risk 단계: ${riskLevel}`;
}




function displayTopDrugsInfo(urlParams) {
    const topDrugsContainer = document.getElementById('topDrugsInfo');
    const topDrugs = [urlParams.get('drug1'), urlParams.get('drug2'), urlParams.get('drug3')];

    topDrugs.forEach(drugName => {
        const drugInfo = drugs.find(drug => drug.name === drugName);
        if (drugInfo) {
            const drugCard = document.createElement('div');
            drugCard.className = 'drug-info';
            drugCard.innerHTML = `
                <div class="overlay"></div>
                <img src="${drugInfo.image}" alt="${drugInfo.name}" class="drug-image">
                <div class="drug-content">
                    <h3>${drugInfo.name}</h3>
                    <p>${drugInfo.text}</p>
                </div>
            `;

            drugCard.addEventListener('mousemove', function(e) {
                if (drugCard.classList.contains('expanded')) {
                    rotateExpandedCard(e, drugCard);
                } else {
                    rotateCard(e, drugCard);
                }
            });
    
            drugCard.addEventListener('mouseout', function() {
                if (drugCard.classList.contains('expanded')) {
                    resetExpandedCard(drugCard);
                } else {
                    resetCard(drugCard);
                }
            });
    
            drugCard.addEventListener('click', function(e) {
                if (drugCard.classList.contains('expanded')) {
                    drugCard.classList.remove('expanded');
                    backdrop.style.display = 'none';
                    resetCard(drugCard);
                } else {
                    drugCard.classList.add('expanded');
                    backdrop.style.display = 'block';
                    // 클릭 시 회전 초기화
                    resetExpandedCard(drugCard);
                }
            });

            topDrugsContainer.appendChild(drugCard);
        }

        // 일반 카드의 회전 함수
        function rotateCard(e, card) {
            const rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;

            // 마우스 위치에 따라 회전 각도 조정
            var rotateY = (x / rect.width - 0.5) * -20; // 좌우 회전
            var rotateX = (y / rect.height - 0.5) * 20; // 상하 회전

            card.style.transform = `perspective(350px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;

            // 빛의 위치 변경
            const overlay = card.querySelector('.overlay');
            overlay.style.backgroundPosition = `${x/5 + y/5}%`;
            overlay.style.filter = `opacity(${x/200}) brightness(1.2)`;
        }

        // 확대된 카드의 회전 함수
        function rotateExpandedCard(e, card) {
            const cardRect = card.getBoundingClientRect();
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
        
            // 화면 중앙을 기준으로 한 마우스 위치 계산
            var x = (e.clientX - centerX) / centerX; // -1 왼쪽 가장자리에서 +1 오른쪽 가장자리
            var y = (e.clientY - centerY) / centerY; // -1 상단 가장자리에서 +1 하단 가장자리
        
            // 화면 중앙을 기준으로 한 회전 각도 조정
            var rotateY = x * -20; // 좌우 회전
            var rotateX = y * 20; // 상하 회전
        
            card.style.transform = `perspective(350px) translate(-50%, -50%) scale(2) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        
            // 확대된 상태에서의 빛의 위치 변경
            const overlay = card.querySelector('.overlay');
            overlay.style.backgroundPosition = `${50 + x * 50}% ${50 + y * 50}%`;
            overlay.style.filter = `brightness(1.2) opacity(${Math.abs(x)*4})`;
        }

        function resetCard(card) {
            card.style.transform = 'rotateY(0deg) rotateX(0deg)';
            const overlay = card.querySelector('.overlay');
            overlay.style.backgroundPosition = 'center';
            overlay.style.filter = 'opacity(0) brightness(1)';
        }

        function resetExpandedCard(card) {
            card.style.transform = 'translate(-50%, -50%) scale(2)';
            const overlay = card.querySelector('.overlay');
            overlay.style.backgroundPosition = 'center';
            overlay.style.filter = 'opacity(0) brightness(1)';
        }

        // 뒷 배경 추가
        const backdrop = document.createElement('div');
        backdrop.className = 'backdrop';
        document.body.appendChild(backdrop);

        // 배경 클릭 시 카드 축소
        backdrop.addEventListener('click', function() {
            const expandedCard = document.querySelector('.drug-info.expanded');
            if (expandedCard) {
                expandedCard.classList.remove('expanded');
                backdrop.style.display = 'none';
                expandedCard.style.transform = 'rotateY(0deg) rotateX(0deg)';
            }
        });

    });
}

function shareResults() {
    // Example: Copy current URL to clipboard
    navigator.clipboard.writeText(window.location.href)
        .then(() => alert('클립보드에 URL이 복사되었습니다.'))
        .catch(err => console.error('URL 복사에 오류가 발생했습니다: ', err));
}

function animateCircularProgressBar(risk) {
    const progressBar = document.querySelector('.ui-widgets');
    const degree = risk * 3.6; // Convert percentage to degree

    progressBar.style.borderTopColor = '#f9cfcf';
    progressBar.style.borderRightColor = degree > 126 ? '#f9a7a7' : '#fdf9f9';
    progressBar.style.borderBottomColor = '#fdf9f9';
    progressBar.style.borderLeftColor = degree > 90 ? '#FEEEEE' : '#fdf9f9';
    progressBar.style.transform = `rotate(${0}deg)`;

    document.querySelector('.ui-values').innerText = risk.toFixed(2) + '%';
}

function getRiskLevel(risk) {
    if (risk <= 25) {
        return '안심';
    } else if (risk <= 35) {
        return '주의';
    } else {
        return '위험';
    }
}
