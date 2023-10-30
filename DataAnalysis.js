const url = "https://one00x-data-analysis.onrender.com/assignment?email=sanikasuryawanshi0305@gmail.com";

const getMostUsedJargon = (data) => {
    const jargons = new Map();
    let mostUsedJargon = [];
    let jargonCount = 0;

    data.forEach(word => {
        if (jargons.has(word)) {
            jargons.set(word, jargons.get(word) + 1);
        } else {
            jargons.set(word, 1);
        }
    });

    jargons.forEach((count, word) => {
        if (count > jargonCount) {
            mostUsedJargon = [word];
            jargonCount = count;
        } else if (count === jargonCount) {
            mostUsedJargon.push(word);
        }
    });

    return mostUsedJargon;
}

const fetchData = async () => {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    return response;
}

const verifyAnswer = async(answerData) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(answerData)
    });
    const answerStatus = await response.json();
    console.log(`Response for answer '${answerData.answer}': \n ${JSON.stringify(answerStatus)}`);
}

const dataAnalysis = async () => {
    const maxRetries = 3;
    let retryCount = 0;
    try {
        const res = await fetchData();
        if (res.ok) {
            const assignment_id = res.headers.get("x-assignment-id");
            const data = await res.json();
            const mostUsedJargon = getMostUsedJargon(data);
            for (let i = 0; i < mostUsedJargon.length; i++) {
                const answerData = {
                    assignment_id: assignment_id,
                    answer: mostUsedJargon[i]
                };
                await verifyAnswer(answerData);
            }
        } else {
            console.error(`Error: HTTP ${res.status} response.`);
            if (retryCount < maxRetries) {
                console.log('Retrying...');
                retryCount++;
                await dataAnalysis();
            } else {
                console.error("Max retries reached. Please try again later.");
            }
        }
    } catch (error) {
        console.error("Error: Failed to fetch data", error);
    }
}

dataAnalysis();
