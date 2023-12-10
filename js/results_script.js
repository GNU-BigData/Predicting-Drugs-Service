let urlParams = new URLSearchParams(location.search);

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const scores = extractScoresFromURL(urlParams);

    displayRadarChart(scores);
    displayAdditionalScores(scores.BIS, scores.IMP);
    setupDrugRiskTestButton(urlParams);
});

function extractScoresFromURL(urlParams) {
    return {
        E: urlParams.get('E'),
        A: urlParams.get('A'),
        C: urlParams.get('C'),
        N: urlParams.get('N'),
        O: urlParams.get('O'),
        BIS: urlParams.get('BIS'),
        IMP: urlParams.get('IMP'),
        Age: urlParams.get('age'),
        Education: urlParams.get('education'),
        Country: urlParams.get('country')
    };
}

function displayRadarChart(scores) {
    const ctx = document.getElementById('radarChart').getContext('2d');
    const radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['E', 'A', 'C', 'N', 'O'],
            datasets: [{
                label: 'Personality Scores',
                data: [scores.E, scores.A, scores.C, scores.N, scores.O],
                // Chart.js styling options...
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

function displayAdditionalScores(bis, imp) {
    document.getElementById('bisScore').innerText += bis;
    document.getElementById('impScore').innerText += imp;
}

function setupDrugRiskTestButton(urlParams) {
    document.getElementById('drugRiskTestButton').addEventListener('click', function() {
        const data = {
            Age: parseFloat(urlParams.get('age')),
            Education: parseFloat(urlParams.get('education')),
            Country: parseFloat(urlParams.get('country')),
            Nscore: parseInt(urlParams.get('N')),
            Escore: parseInt(urlParams.get('E')),
            Oscore: parseInt(urlParams.get('O')),
            Ascore: parseInt(urlParams.get('A')),
            Cscore: parseInt(urlParams.get('C')),
            Impulsive: parseInt(urlParams.get('BIS')),
            SS: parseInt(urlParams.get('IMP')),
        };

        // Make an API request and handle the response
        fetch('http://capsto.n-e.kr:8000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response data
            console.log(data);
        
            // 받은 데이터를 URL로 저장
            const riskScore = encodeURIComponent(data.regression_result[0][0].toFixed(4));
            const topDrugs = data.classify_result[0].slice(0, 3);
        
            // 현재 URL에서 쿼리 문자열을 추출
            const currentUrl = window.location.href;
            const queryParams = currentUrl.split('?')[1];
        
            // 새 페이지로 이동하는 URL 생성
            const newBaseUrl = "final_page.html";
            const newUrl = `${newBaseUrl}?${queryParams}&risk=${riskScore*0.01}&drug1=${encodeURIComponent(topDrugs[0].drug1)}&drug2=${encodeURIComponent(topDrugs[1].drug2)}&drug3=${encodeURIComponent(topDrugs[2].drug3)}`;
        
            // 새 페이지로 이동
            window.location.href = newUrl;
        })
        
        
        
        .catch((error) => {
            console.error('Error:', error);
            document.getElementById('error-message').innerText = "서비스에 문제가 발생했습니다. 나중에 다시 시도해 주세요.\n\n에러 메시지: " + error.message + ". ";
        });
    });
}
