function loadData() {
    Papa.parse("./data/crabAgePrediction.csv", {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: results => prepareData(results.data)
    });
}

function prepareData(data) {
    const nn = ml5.neuralNetwork({ task: 'regression', debug: true });

    // Split data into test and train
    data.sort(() => Math.random() > 0.5);
    let trainData = data.slice(0, Math.floor(data.length * 0.8));
    let testData = data.slice(Math.floor(data.length * 0.8) + 1);

    function extractCrabFeatures(row) {
        return {
            length: row.length,
            diameter: row.diameter,
            height: row.height,
            weight: row.weight,
            shuckedWeight: row['shucked weight'],
            visceraWeight: row['viscera weight'],
            shellWeight: row['shell weight']
        };
    }

    for (let row of trainData) {
        console.log(row);
        const crabFeatures = extractCrabFeatures(row);
        console.log(crabFeatures);
        nn.addData(crabFeatures, { age: row.age });
    }

    nn.normalizeData();
    nn.train({ epochs: 30 }, () => trainCompleted(nn));
}

function trainCompleted(nn) {
    let saveButton = document.getElementById('save');
    saveButton.addEventListener('click', () => saveModel(nn));
}

function saveModel(nn) {
    nn.save();
}

loadData();
