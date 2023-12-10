const drugs = [
    { name: "Amphet", text: "중추신경계를 자극하는 약물로, 집중력과 에너지를 증가시킨다. 중독성이 있으며 장기간 사용 시 부작용이 발생할 수 있다." },
    { name: "Amyl", text: "흥분제로 사용되며 순간적인 혈압 상승과 빠른 심장 박동을 유발한다. 일시적인 쾌감을 제공하지만 위험성도 높다." },
    { name: "Benzos", text: "불안, 불면증 치료에 사용되는 진정제. 중독성이 있으며 장기 사용 시 의존성이 생길 수 있다." },
    { name: "Cannabis", text: "마리화나라고도 알려진 대마초. 이완 효과가 있으나, 기억력 저하 등 부작용이 있을 수 있다." },
    { name: "Coke", text: "코카인, 강력한 자극제로 뇌의 도파민 수치를 증가시킨다. 중독성이 매우 높고 심각한 건강 문제를 일으킬 수 있다." },
    { name: "Crack", text: "코카인의 형태 중 하나로, 흡연으로 사용된다. 매우 강력한 중독성과 심각한 건강 위험을 가지고 있다." },
    { name: "Ecstasy", text: "MDMA, 즐거움과 친밀감을 증가시키는 약물. 심혈관계에 부담을 주며 고용량 사용 시 생명 위험." },
    { name: "Heroin", text: "마약 중 하나로 강력한 진통제. 심각한 중독성과 건강 손상을 일으키며, 과다 복용 시 사망에 이를 수 있다." },
    { name: "Ketamine", text: "진정 및 마취 효과가 있는 약물. 높은 용량에서 환각 효과를 나타내며 남용 시 위험하다." },
    { name: "Legalh", text: "합법적인 약물이지만 오남용 시 건강에 해로울 수 있다. 통제되지 않는 사용은 중독을 일으킬 수 있다." },
    { name: "LSD", text: "강력한 환각제로, 현실 인식을 왜곡시킨다. 중독성은 낮지만 위험한 경험을 할 수 있다." },
    { name: "Meth", text: "메탐페타민, 강력한 중추신경계 자극제. 심각한 중독성과 건강 손상을 일으킬 수 있다." },
    { name: "Nicotine", text: "담배에 주로 함유된 약물로, 중독성이 있으며 여러 건강 문제를 유발할 수 있다." },
    { name: "Semer", text: "가공의 약물로 실제 존재하지 않음. 이 목록에서는 예시로 사용되었다." },
    { name: "VSA", text: "휘발성 물질을 흡입하여 일시적인 쾌감이나 환각을 유발하는 행위. 장기적으로 뇌 손상이나 중독, 급사의 위험이 있다." },
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
        E: urlParams.get('E'),
        A: urlParams.get('A'),
        C: urlParams.get('C'),
        N: urlParams.get('N'),
        O: urlParams.get('O')
    };
    personalityTypeContainer.innerText = `성격 유형 점수: E(${scores.E}), A(${scores.A}), C(${scores.C}), N(${scores.N}), O(${scores.O})`;

    const ctx = document.getElementById('personalityTypeChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['E', 'A', 'C', 'N', 'O'],
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
            topDrugsContainer.innerHTML += `<div class="drug-info">
                <h3>${drugInfo.name}</h3>
                <p>${drugInfo.text}</p>
            </div>`;
        }
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
    progressBar.style.borderRightColor = degree > 180 ? '#f9a7a7' : '#fdf9f9';
    progressBar.style.borderBottomColor = '#fdf9f9';
    progressBar.style.borderLeftColor = degree > 90 ? '#FEEEEE' : '#fdf9f9';
    progressBar.style.transform = `rotate(${0}deg)`;

    document.querySelector('.ui-values').innerText = risk.toFixed(2) + '%';
}

function getRiskLevel(risk) {
    if (risk <= 33) {
        return '안심';
    } else if (risk <= 66) {
        return '주의';
    } else {
        return '위험';
    }
}
