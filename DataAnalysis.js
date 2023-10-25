const url = "https://one00x-data-analysis.onrender.com/assignment?email=sanikasuryawanshi0305@gmail.com";

const getMostUsedJargon = (data) => {
    const jargons = {};
    let [mostUsedJargon, jargonCount] = [[], 0];

    data.forEach(word => {
        if (jargons[word]) {
            jargons[word]++;
        } else {
            jargons[word] = 1;
        }
    });

    for (const word in jargons) {
        if (jargons[word] > jargonCount) {
            [mostUsedJargon, jargonCount] = [[word], jargons[word]];
        } else if (jargons[word] === jargonCount) {
            mostUsedJargon.push(word);
        }
    }

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
    try {
        const res = await fetchData();
        if (res.status === 300) {
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
        } else if (res.status === 500) {
            console.error("Error: HTTP 500 response. Please retry");
        } else {
            console.error("Error: Failed to fetch data")
        }
    } catch (error) {
        throw new Error(error);
    }
}

dataAnalysis();