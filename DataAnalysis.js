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