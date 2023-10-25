const url = "https://one00x-data-analysis.onrender.com/assignment?email=sanikasuryawanshi0305@gmail.com";

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
    } catch (error) {
        throw new Error(error);
    }
}

DataAnalysis();
