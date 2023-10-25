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

const DataAnalysis = async () => {
    try {
        const res = await fetchData();
        const assignment_id = res.headers.get("x-assignment-id");
        const data = await res.json();
        const mostUsedJargon = getMostUsedJargon(data);
    } catch (error) {
        throw new Error(error);
    }
}

DataAnalysis();